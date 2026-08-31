/**
 * Newsletter FOSA — inscription persistante, sans doublons.
 *
 * Architecture (par priorité) :
 *   1. MAILCHIMP_ENDPOINT renseigné → endpoint JSONP Mailchimp (formulaire
 *      intégré public, aucune clé API) : Mailchimp persiste l'abonné et
 *      refuse les doublons côté serveur.
 *   2. Sinon → repli FormSubmit : chaque inscription est livrée par e-mail
 *      dans la boîte de contact (fonctionne immédiatement, sans compte).
 *
 * Déduplication :
 *   - Local : l'adresse souscrite est mémorisée dans localStorage — une
 *     deuxième inscription du même navigateur est refusée sans appel réseau.
 *   - Serveur : Mailchimp renvoie « already subscribed » pour une adresse
 *     déjà en liste (autre navigateur, autre appareil) — mappé sur l'état
 *     « déjà inscrit ».
 */

import { CONTACT_EMAIL } from './content'

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
 * Tant que la valeur est vide, l'inscription passe par le repli FormSubmit
 * (voir ci-dessous) : elle arrive par e-mail dans la boîte de contact.
 */
export const MAILCHIMP_ENDPOINT = ''

/**
 * Repli immédiat : FormSubmit livre chaque inscription dans la boîte
 * de contact. À la toute première soumission, FormSubmit envoie un e-mail
 * d'activation à cliquer une fois (protection anti-spam) — ensuite,
 * chaque inscription arrive automatiquement.
 */
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

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

/** Repli FormSubmit : POST AJAX (CORS ouvert), réponse JSON. */
async function formsubmitSubscribe(email: string): Promise<SubscribeResult> {
  try {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 12000)
    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email,
        _subject: 'Nouvelle inscription à la newsletter FOSA',
        _template: 'table',
        _captcha: 'false',
      }),
      signal: controller.signal,
    })
    window.clearTimeout(timeoutId)
    const data = (await res.json()) as { success?: string; message?: string }
    if (res.ok && data.success === 'true') {
      storeSubscription(email)
      return { status: 'success' }
    }
    /* Message du fournisseur volontairement masqué : l'UI affiche un texte générique en français. */
    return { status: 'error' }
  } catch {
    return { status: 'error' }
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

  /* Mailchimp pas encore configuré : repli FormSubmit (livraison par e-mail). */
  if (!MAILCHIMP_ENDPOINT) {
    return formsubmitSubscribe(normalized)
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
