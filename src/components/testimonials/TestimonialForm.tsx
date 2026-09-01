import { useState, type FormEvent } from 'react'
import { Diamond } from '../SectionHeading'
import { useT } from '../../i18n/LanguageContext'
import { getStoredTestimonialEmail, submitTestimonial } from '../../lib/testimonials'
import StarRating from './StarRating'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type FormStatus = 'idle' | 'submitting' | 'success' | 'already' | 'invalid_email' | 'error'

type FieldErrors = Partial<Record<'name' | 'email' | 'rating' | 'quote', string>>

/** Classes canoniques des champs de formulaire (cf. AIQuoteSection). */
const FIELD_CLASS =
  'w-full rounded-xl border border-line bg-white px-4 py-3.5 text-[15px] text-navy-900 placeholder:text-[#9aa3b2] transition-colors duration-200 focus:border-fosa-500 focus:outline-none focus:ring-2 focus:ring-fosa-500/25 disabled:opacity-60'

const FIELD_ERROR_CLASS =
  'border-[#b42318] focus:border-[#b42318] focus:ring-[#b42318]/25'

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-[13px] font-medium text-[#b42318]">
      {children}
    </p>
  )
}

/**
 * Formulaire « Laisser un témoignage ».
 * Aucune connexion : l'e-mail sert uniquement d'anti-doublon (jamais publié).
 * Le filtrage des avis médiocres et la modération se font côté Google Sheets.
 */
export default function TestimonialForm() {
  const t = useT()
  const [fields, setFields] = useState({
    name: '',
    role: '',
    company: '',
    email: '',
    quote: '',
    rating: 0,
    website: '',
  })
  /* Un visiteur ayant déjà témoigné sur cet appareil revoit l'état « déjà reçu ». */
  const [status, setStatus] = useState<FormStatus>(() =>
    getStoredTestimonialEmail() ? 'already' : 'idle',
  )
  const [errors, setErrors] = useState<FieldErrors>({})

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const next: FieldErrors = {}
    if (fields.name.trim().length < 2) next.name = t.testimonials.invalidName
    if (!EMAIL_PATTERN.test(fields.email.trim())) next.email = t.testimonials.invalidEmail
    if (fields.rating === 0) next.rating = t.testimonials.invalidRating
    if (fields.quote.trim().length < 10) next.quote = t.testimonials.invalidQuote
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('submitting')
    const result = await submitTestimonial(fields)
    setStatus(result.status)
  }

  if (status === 'success' || status === 'already') {
    return (
      <div
        role="status"
        className="flex items-start gap-3.5 rounded-xl border border-fosa-500/25 bg-fosa-50 p-6 text-left"
      >
        <Diamond className="mt-1.5 size-2 shrink-0 text-fosa-500" />
        <div>
          <p className="text-[15.5px] font-semibold text-navy-900">
            {status === 'success' ? t.testimonials.successTitle : t.testimonials.alreadyTitle}
          </p>
          <p className="mt-1 text-[14px] leading-relaxed text-ink">
            {status === 'success' ? t.testimonials.successText : t.testimonials.alreadyText}
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative overflow-hidden cut-corner rounded-2xl border border-line bg-white p-7 sm:p-10"
    >
      {/* Accents géométriques « œil de renard » */}
      <div
        className="absolute -right-6 -top-6 size-20 rotate-45 border border-fosa-500/15"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-5 -left-5 size-14 rotate-45 bg-fosa-500/[0.06]"
        aria-hidden="true"
      />

      <div className="relative">
        <p className="flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-fosa-700">
          <Diamond />
          {t.testimonials.formTitle}
        </p>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink">
          {t.testimonials.formText}
        </p>

        <fieldset disabled={status === 'submitting'} className="mt-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="testimonial-name" className="text-[13.5px] font-medium text-navy-900">
                {t.testimonials.nameLabel}
              </label>
              <input
                id="testimonial-name"
                type="text"
                autoComplete="name"
                placeholder={t.testimonials.namePlaceholder}
                value={fields.name}
                onChange={(event) => setFields((current) => ({ ...current, name: event.target.value }))}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? 'testimonial-name-error' : undefined}
                className={`mt-1.5 ${FIELD_CLASS} ${errors.name ? FIELD_ERROR_CLASS : ''}`}
              />
              {errors.name ? <FieldError id="testimonial-name-error">{errors.name}</FieldError> : null}
            </div>

            <div>
              <label htmlFor="testimonial-role" className="text-[13.5px] font-medium text-navy-900">
                {t.testimonials.roleLabel}{' '}
                <span className="font-normal text-ink">· {t.testimonials.optional}</span>
              </label>
              <input
                id="testimonial-role"
                type="text"
                autoComplete="organization-title"
                placeholder={t.testimonials.rolePlaceholder}
                value={fields.role}
                onChange={(event) => setFields((current) => ({ ...current, role: event.target.value }))}
                className={`mt-1.5 ${FIELD_CLASS}`}
              />
            </div>

            <div>
              <label
                htmlFor="testimonial-company"
                className="text-[13.5px] font-medium text-navy-900"
              >
                {t.testimonials.companyLabel}{' '}
                <span className="font-normal text-ink">· {t.testimonials.optional}</span>
              </label>
              <input
                id="testimonial-company"
                type="text"
                autoComplete="organization"
                placeholder={t.testimonials.companyPlaceholder}
                value={fields.company}
                onChange={(event) => setFields((current) => ({ ...current, company: event.target.value }))}
                className={`mt-1.5 ${FIELD_CLASS}`}
              />
            </div>

            <div>
              <label htmlFor="testimonial-email" className="text-[13.5px] font-medium text-navy-900">
                {t.testimonials.emailLabel}
              </label>
              <input
                id="testimonial-email"
                type="email"
                autoComplete="email"
                placeholder={t.testimonials.emailPlaceholder}
                value={fields.email}
                onChange={(event) => setFields((current) => ({ ...current, email: event.target.value }))}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? 'testimonial-email-error' : undefined}
                className={`mt-1.5 ${FIELD_CLASS} ${errors.email ? FIELD_ERROR_CLASS : ''}`}
              />
              {errors.email ? <FieldError id="testimonial-email-error">{errors.email}</FieldError> : null}
            </div>
          </div>

          <div className="mt-5">
            <StarRating
              name="testimonial-rating"
              value={fields.rating}
              onChange={(rating) => setFields((current) => ({ ...current, rating }))}
              label={t.testimonials.ratingLabel}
              getStarLabel={t.testimonials.ratingValue}
            />
            {errors.rating ? <FieldError id="testimonial-rating-error">{errors.rating}</FieldError> : null}
          </div>

          <div className="mt-5">
            <label htmlFor="testimonial-quote" className="text-[13.5px] font-medium text-navy-900">
              {t.testimonials.quoteLabel}
            </label>
            <textarea
              id="testimonial-quote"
              rows={4}
              maxLength={1000}
              placeholder={t.testimonials.quotePlaceholder}
              value={fields.quote}
              onChange={(event) => setFields((current) => ({ ...current, quote: event.target.value }))}
              aria-invalid={errors.quote ? true : undefined}
              aria-describedby={
                errors.quote ? 'testimonial-quote-error' : 'testimonial-quote-counter'
              }
              className={`mt-1.5 resize-y leading-relaxed ${FIELD_CLASS} ${
                errors.quote ? FIELD_ERROR_CLASS : ''
              }`}
            />
            <div className="mt-1.5 flex items-start justify-between gap-4">
              {errors.quote ? (
                <FieldError id="testimonial-quote-error">{errors.quote}</FieldError>
              ) : (
                <span />
              )}
              <p id="testimonial-quote-counter" className="text-right text-[12.5px] text-ink">
                {t.testimonials.quoteCounter.replace('{count}', String(fields.quote.length))}
              </p>
            </div>
          </div>

          {/* Honeypot : invisible pour les humains, appât pour les bots. */}
          <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              Ne pas remplir
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={fields.website}
                onChange={(event) => setFields((current) => ({ ...current, website: event.target.value }))}
              />
            </label>
          </div>

          {status === 'error' || status === 'invalid_email' ? (
            <p role="alert" className="mt-5 text-[13.5px] font-medium text-[#b42318]">
              {status === 'invalid_email'
                ? t.testimonials.invalidEmailDomain
                : t.testimonials.genericError}
            </p>
          ) : null}

          <div className="mt-7 flex flex-col gap-3 border-t border-line/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-fosa-500 px-8 py-3.5 text-[15px] font-semibold text-navy-900 transition-colors duration-200 hover:bg-fosa-600 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-500"
            >
              {status === 'submitting' ? t.testimonials.submitting : t.testimonials.submit}
            </button>
            <p className="max-w-xs text-[12.5px] leading-relaxed text-ink sm:text-right">
              {t.testimonials.privacy}
            </p>
          </div>
        </fieldset>
      </div>
    </form>
  )
}
