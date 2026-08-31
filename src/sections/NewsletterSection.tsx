import { useState, type FormEvent } from 'react'
import Reveal from '../components/Reveal'
import { Diamond } from '../components/SectionHeading'
import { useT } from '../i18n/LanguageContext'
import { getStoredSubscription, subscribeToNewsletter, type SubscribeStatus } from '../lib/newsletter'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type FormStatus = 'idle' | 'submitting' | SubscribeStatus

/** Newsletter : inscription persistante (Mailchimp / FormSubmit), déduplication locale + serveur. */
export default function NewsletterSection() {
  const t = useT()
  /* Un visiteur déjà inscrit sur cet appareil revoit l'état « déjà inscrit »,
     pas le formulaire — aucune inscription redondante possible. */
  const [email, setEmail] = useState(() => getStoredSubscription() ?? '')
  const [status, setStatus] = useState<FormStatus>(() =>
    getStoredSubscription() ? 'already' : 'idle',
  )
  const [error, setError] = useState<string | null>(null)
  const [serverMessage, setServerMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = email.trim()

    if (!EMAIL_PATTERN.test(value)) {
      setError(t.newsletter.invalid)
      return
    }

    setError(null)
    setServerMessage(null)
    setStatus('submitting')

    const result = await subscribeToNewsletter(value)
    setStatus(result.status)
    if (result.status === 'error') {
      setError(result.message ?? t.newsletter.genericError)
    } else if (result.status === 'already' && result.message) {
      setServerMessage(result.message)
    }
  }

  const done = status === 'success' || status === 'already'

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-navy-900 py-20 lg:py-24"
      aria-labelledby="newsletter-title"
    >
      {/* Composition géométrique discrète */}
      <div
        className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(55%_65%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 -top-24 size-[340px] rotate-[20deg] border border-white/[0.06]"
        aria-hidden="true"
      />
      <div className="absolute -left-16 bottom-0 size-28 rotate-45 bg-fosa-500/[0.07]" aria-hidden="true" />
      <div
        className="absolute left-[12%] top-12 h-px w-48 -rotate-[14deg] bg-gradient-to-r from-transparent to-fosa-500/30"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-fosa-400">
            <Diamond />
            {t.newsletter.overline}
          </p>
          <h2
            id="newsletter-title"
            className="mt-5 text-3xl font-bold tracking-[-0.02em] text-white text-balance sm:text-4xl"
          >
            {t.newsletter.titleA} <span className="text-fosa-400">{t.newsletter.titleAccent}</span>
            {t.newsletter.titleB}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/60">
            {t.newsletter.text}
          </p>
        </Reveal>

        <Reveal delay={120}>
          {done ? (
            <div
              role="status"
              className="mt-9 flex items-start gap-3.5 rounded-xl border border-fosa-400/25 bg-fosa-500/10 p-5 text-left"
            >
              <Diamond className="mt-1.5 size-2 shrink-0 text-fosa-400" />
              <div>
                <p className="text-[15.5px] font-semibold text-white">
                  {status === 'success' ? t.newsletter.successTitle : t.newsletter.alreadyTitle}
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-white/60">
                  {status === 'success'
                    ? t.newsletter.successText
                    : serverMessage ?? t.newsletter.alreadyText}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-9">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  {t.newsletter.placeholder}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  placeholder={t.newsletter.placeholder}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={status === 'submitting'}
                  className="h-12 flex-1 rounded-[10px] border border-white/15 bg-white/[0.06] px-4 text-[15px] text-white placeholder:text-white/35 transition-colors duration-200 focus:border-fosa-400 focus:outline-none focus:ring-2 focus:ring-fosa-400/30 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="h-12 rounded-[10px] bg-fosa-500 px-7 text-[15px] font-semibold text-navy-900 transition-colors duration-200 hover:bg-fosa-400 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-400"
                >
                  {status === 'submitting' ? t.newsletter.submitting : t.newsletter.submit}
                </button>
              </div>

              {error ? (
                <p role="alert" className="mt-3 text-left text-[13.5px] font-medium text-fosa-300">
                  {error}
                </p>
              ) : null}

              <p className="mt-3 text-[12.5px] text-white/40">{t.newsletter.privacy}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
