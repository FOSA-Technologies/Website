import { useEffect, useRef, useState } from 'react'
import Button from '../Button'
import { Diamond } from '../SectionHeading'
import { BOOKING_MAILTO, CALENDLY_URL, CALENDLY_WIDGET_SCRIPT } from '../../lib/calendly'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement
        prefill?: Record<string, unknown>
        utm?: Record<string, unknown>
      }) => void
    }
  }
}

type Status = 'idle' | 'loading' | 'ready' | 'error'

/**
 * URL de l'iframe : on masque l'en-tête d'événement Calendly (avatar,
 * nom, description) pour que le calendrier commence plus haut dans la
 * carte. Ces paramètres n'affectent que l'embed — le lien externe
 * « Ouvrir le calendrier » conserve CALENDLY_URL tel quel.
 */
function embedUrl(): string {
  const separator = CALENDLY_URL.includes('?') ? '&' : '?'
  return `${CALENDLY_URL}${separator}hide_event_type_details=1&hide_gdpr_banner=1`
}

/** Promise partagée : le script Calendly n'est injecté qu'une seule fois. */
let scriptPromise: Promise<void> | null = null

function loadCalendlyScript(): Promise<void> {
  if (typeof window !== 'undefined' && window.Calendly) return Promise.resolve()
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = CALENDLY_WIDGET_SCRIPT
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Calendly script failed to load'))
    document.head.appendChild(script)
  })
  return scriptPromise
}

/**
 * Calendrier Calendly chargé à la demande : le script n'est injecté que
 * lorsque la section approche du viewport (aucun impact sur le chargement
 * initial de la page). En cas d'échec, repli élégant vers un lien externe.
 *
 * ⚠️ Le conteneur de l'iframe ne contient JAMAIS d'éléments React :
 * Calendly remplace lui-même le contenu de son parentElement, ce qui
 * ferait planter React lors du commit suivant. Le fallback de chargement
 * est donc superposé en couche séparée, au-dessus du conteneur.
 */
export default function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let timeoutId: number | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || cancelled) return
        observer.disconnect()

        setStatus('loading')
        /* Garde-fou : si le réseau est lent ou bloqué, on propose le repli. */
        timeoutId = window.setTimeout(() => {
          if (!cancelled) setStatus((current) => (current === 'ready' ? current : 'error'))
        }, 12000)

        loadCalendlyScript()
          .then(() => {
            if (cancelled || !window.Calendly) return
            window.Calendly.initInlineWidget({
              url: embedUrl(),
              parentElement: container,
            })
            setStatus('ready')
          })
          .catch(() => {
            if (!cancelled) setStatus('error')
          })
      },
      { rootMargin: '320px 0px' },
    )

    observer.observe(container)
    return () => {
      cancelled = true
      observer.disconnect()
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
      /* L'iframe Calendly est injectée hors de React : on nettoie à la main. */
      container.innerHTML = ''
    }
  }, [])

  return (
    <div>
      <div className="relative min-h-[640px]">
        {/* Conteneur dédié à Calendly — jamais touché par React. */}
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-hidden rounded-xl border border-line bg-white"
        />

        {/* Fallback superposé tant que le calendrier n'est pas prêt. */}
        {status !== 'ready' ? (
          <div
            aria-busy={status === 'loading'}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl border border-line bg-white p-8 text-center"
          >
            {status === 'error' ? (
              <>
                <Diamond className="size-2.5 text-fosa-500" />
                <p className="text-[15.5px] font-semibold text-navy-900">
                  Le calendrier n’a pas pu être chargé.
                </p>
                <p className="max-w-xs text-[14px] leading-relaxed text-ink">
                  Ouvrez-le directement dans un nouvel onglet, ou écrivez-nous pour convenir d’un
                  créneau.
                </p>
                <div className="mt-2 flex flex-col items-center gap-2.5 sm:flex-row">
                  <Button
                    href={CALENDLY_URL}
                    variant="primary"
                    size="md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ouvrir le calendrier
                  </Button>
                  <Button href={BOOKING_MAILTO} variant="secondary" size="md">
                    Nous écrire
                  </Button>
                </div>
              </>
            ) : (
              <>
                <span
                  className="size-3 animate-pulse rotate-45 bg-fosa-500/70 motion-reduce:animate-none"
                  aria-hidden="true"
                />
                <p className="text-[14.5px] font-medium text-navy-900">Chargement du calendrier…</p>
                <p className="text-[13px] text-ink">Quelques secondes suffisent.</p>
              </>
            )}
          </div>
        ) : null}
      </div>

      {status === 'ready' ? (
        <p className="mt-4 text-center text-[13.5px] text-ink">
          L’affichage est incomplet ?{' '}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-fosa-700 underline underline-offset-4 transition-colors hover:text-fosa-600"
          >
            Ouvrir le calendrier dans un nouvel onglet
          </a>
        </p>
      ) : null}
    </div>
  )
}
