/**
 * Newsletter FOSA — inscription persistante, sans doublons.
 *
 * Architecture :
 *   Frontend (NewsletterSection) → subscribeToNewsletter()
 *     → endpoint JSONP Mailchimp (formulaire intégré public, aucune clé API)
 *     → Mailchimp persiste l'abonné et refuse les doublons côté serveur
 *
 * Déduplication à deux niveaux :
 *   1. Local : l'adresse souscrite est mémorisée dans localStorage —
 *      une deuxième inscription du même navigateur est refusée sans appel réseau.
 *   2. Serveur : Mailchimp renvoie « already subscribed » pour une adresse
 *      déjà en liste (autre navigateur, autre appareil) — mappé sur l'état
 *      « déjà inscrit ».
 */

/** Clé localStorage : dernière adresse souscrite sur cet appareil. */
const SUBSCRIBED_KEY = 'fosa-newsletter-email'

/**
 * ⚠️ À personnaliser : URL du formulaire Mailchimp en version JSONP.
 *
 * Où la trouver :
 *   Mailchimp → Audience → Signup forms → Embedded forms →
 *   le code généré contient une URL de la forme
 *   `https://{dc}.list-manage.com/subscribe/post-json?u={u}&id={id}`
 *   (remplacer `post` par `post-json` si nécessaire). Copier cette URL ici.
 *
 * Tant que la valeur est vide, l'inscription fonctionne en mode démo :
 * l'adresse est mémorisée localement (même UX, même dédup locale),
 * mais aucune donnée ne quitte le navigateur.
 */
export const MAILCHIMP_ENDPOINT = ''

export type SubscribeStatus = 'success' | 'already' | 'error'

export interface SubscribeResult {
  status: SubscribeStatus
  /** Message du service (déjà inscrit, erreur…), affiché tel quel. */
  message?: string
}

export function getStoredSubscription(): string | null {
  try {
    return localStorage.getItem(SUBSCRIBED_KEY)
  } catch {
    return null
  }
}

function storeSubscription(email: string): void {
  try {
    localStorage.setItem(SUBSCRIBED_KEY, email)
  } catch {
    /* Stockage indisponible : la dédup locale est simplement ignorée. */
  }
}

/** Callback JSONP Mailchimp : charge un script et résout sa réponse. */
function mailchimpSubscribe(email: string): Promise<{ result: 'success' | 'error'; msg: string }> {
  return new Promise((resolve, reject) => {
    const callbackName = `__fosaMc${Math.random().toString(36).slice(2, 8)}`
    const script = document.createElement('script')
    let settled = false

    const finish = (action: () => void) => {
      if (settled) return
      settled = true
      action()
    }
    const cleanup = () => {
      delete (window as unknown as Record<string, unknown>)[callbackName]
      script.remove()
    }

    const timeoutId = window.setTimeout(() => {
      finish(() => {
        cleanup()
        reject(new Error('Mailchimp timeout'))
      })
    }, 12000)

    ;(window as unknown as Record<string, unknown>)[callbackName] = (data: {
      result: string
      msg: string
    }) => {
      finish(() => {
        window.clearTimeout(timeoutId)
        cleanup()
        resolve({
          result: data.result === 'success' ? 'success' : 'error',
          msg: data.msg || '',
        })
      })
    }

    const separator = MAILCHIMP_ENDPOINT.includes('?') ? '&' : '?'
    script.src = `${MAILCHIMP_ENDPOINT}${separator}EMAIL=${encodeURIComponent(email)}&c=${callbackName}`
    script.onerror = () => {
      finish(() => {
        window.clearTimeout(timeoutId)
        cleanup()
        reject(new Error('Mailchimp script failed to load'))
      })
    }
    document.head.appendChild(script)
  })
}

/**
 * Inscrit une adresse à la newsletter.
 * Aucune clé API n'est exposée : seul l'endpoint public du formulaire est utilisé.
 */
export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  const normalized = email.trim().toLowerCase()

  /* Dédup locale : cette adresse a déjà souscrit depuis ce navigateur. */
  if (getStoredSubscription() === normalized) {
    return { status: 'already' }
  }

  /* Mode démo : endpoint Mailchimp pas encore configuré. */
  if (!MAILCHIMP_ENDPOINT) {
    storeSubscription(normalized)
    return { status: 'success' }
  }

  try {
    const data = await mailchimpSubscribe(normalized)
    if (data.result === 'success') {
      storeSubscription(normalized)
      return { status: 'success' }
    }
    /* « already subscribed » : pas de doublon côté serveur non plus. */
    if (/already subscribed|already in list|déjà|exists/i.test(data.msg)) {
      storeSubscription(normalized)
      return { status: 'already', message: data.msg }
    }
    return { status: 'error', message: data.msg }
  } catch {
    return { status: 'error' }
  }
}
