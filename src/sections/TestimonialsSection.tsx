import { useCallback, useEffect, useState } from 'react'
import Reveal from '../components/Reveal'
import SectionHeading, { Diamond } from '../components/SectionHeading'
import TestimonialCard from '../components/testimonials/TestimonialCard'
import TestimonialForm from '../components/testimonials/TestimonialForm'
import { useT } from '../i18n/LanguageContext'
import { TESTIMONIALS, type Testimonial } from '../data/testimonials'
import { TESTIMONIALS_ENDPOINT, fetchTestimonials } from '../lib/testimonials'

/** Nombre de témoignages visibles selon le breakpoint. */
function usePerView(): number {
  const [perView, setPerView] = useState(3)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const tablet = window.matchMedia('(min-width: 640px)')
    const update = () => setPerView(desktop.matches ? 3 : tablet.matches ? 2 : 1)
    update()
    desktop.addEventListener('change', update)
    tablet.addEventListener('change', update)
    return () => {
      desktop.removeEventListener('change', update)
      tablet.removeEventListener('change', update)
    }
  }, [])

  return perView
}

const PrevIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="square"
    strokeLinejoin="miter"
    aria-hidden="true"
  >
    <path d="M10 3.5 5.5 8l4.5 4.5" />
  </svg>
)

const NextIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="square"
    strokeLinejoin="miter"
    aria-hidden="true"
  >
    <path d="M5.5 3.5 10 8l-4.5 4.5" />
  </svg>
)

function Carousel({ items }: { items: Testimonial[] }) {
  const t = useT()
  const perView = usePerView()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const maxIndex = Math.max(0, items.length - perView)
  const safeIndex = Math.min(index, maxIndex)

  const goNext = useCallback(() => {
    setIndex((current) => (current >= maxIndex ? 0 : current + 1))
  }, [maxIndex])

  const goPrev = useCallback(() => {
    setIndex((current) => (current <= 0 ? maxIndex : current - 1))
  }, [maxIndex])

  /* Défilement automatique doux, coupé au survol et pour prefers-reduced-motion. */
  useEffect(() => {
    if (paused || maxIndex === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(goNext, 6000)
    return () => window.clearInterval(id)
  }, [paused, maxIndex, goNext])

  if (items.length <= perView) {
    return (
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((testimonial, i) => (
          <Reveal key={i} delay={(i % 3) * 70}>
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
    )
  }

  const controlClass =
    'flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-navy-900 transition-colors duration-200 hover:border-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line'

  return (
    <div>
      <div
        className="mt-14 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-300 motion-reduce:transition-none"
          style={{ transform: `translateX(-${safeIndex * (100 / perView)}%)` }}
        >
          {items.map((testimonial, i) => (
            <div
              key={i}
              className="w-full shrink-0 px-2.5 sm:w-1/2 lg:w-1/3"
              aria-label={
                maxIndex > 0
                  ? `${t.testimonials.goTo} — ${testimonial.name} — ${testimonial.company}`
                  : undefined
              }
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={goPrev}
          disabled={maxIndex === 0}
          aria-label={t.testimonials.prev}
          className={controlClass}
        >
          <PrevIcon />
        </button>

        <div className="flex items-center gap-1.5" aria-label={t.testimonials.pagination}>
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${t.testimonials.goTo} ${i + 1}`}
              aria-current={i === safeIndex ? 'true' : undefined}
              className="flex size-8 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-500"
            >
              <span
                className={`size-2 rotate-45 transition-colors duration-200 ${
                  i === safeIndex ? 'bg-fosa-500' : 'bg-[#c6cdd8]'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={maxIndex === 0}
          aria-label={t.testimonials.next}
          className={controlClass}
        >
          <NextIcon />
        </button>
      </div>
    </div>
  )
}

/** Squelette de chargement : mêmes proportions que les cartes, pas de saut de mise en page. */
function Skeleton() {
  const t = useT()

  return (
    <div role="status" className="mt-14">
      <p className="sr-only">{t.testimonials.loading}</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-line bg-white p-7">
            <div className="size-7 animate-pulse rounded-[6px] bg-[#e6e9ef] motion-reduce:animate-none" />
            <div className="mt-4 h-3.5 w-11/12 animate-pulse rounded bg-[#e6e9ef] motion-reduce:animate-none" />
            <div className="mt-2 h-3.5 w-4/5 animate-pulse rounded bg-[#e6e9ef] motion-reduce:animate-none" />
            <div className="mt-6 flex items-center gap-3.5 border-t border-line/70 pt-5">
              <div className="size-11 animate-pulse rounded-[10px] bg-[#e6e9ef] motion-reduce:animate-none" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/3 animate-pulse rounded bg-[#e6e9ef] motion-reduce:animate-none" />
                <div className="h-2.5 w-1/2 animate-pulse rounded bg-[#e6e9ef] motion-reduce:animate-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Témoignages clients.
 *
 * Source des témoignages :
 *   - `TESTIMONIALS_ENDPOINT` renseigné (lib/testimonials.ts) → liste distante
 *     Google Sheets, déjà filtrée côté serveur (note >= 4, modération).
 *   - Sinon → liste statique data/testimonials.ts ; le formulaire de
 *     témoignage n'est affiché que lorsque l'endpoint est configuré.
 * Une erreur de chargement distant retombe en silence sur la liste statique.
 */
export default function TestimonialsSection() {
  const t = useT()
  /* null = pas encore chargé (affiche le squelette). */
  const [remote, setRemote] = useState<Testimonial[] | null>(null)

  useEffect(() => {
    if (!TESTIMONIALS_ENDPOINT) {
      setRemote([])
      return
    }
    let cancelled = false
    fetchTestimonials().then((items) => {
      if (!cancelled) setRemote(items)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const configured = TESTIMONIALS_ENDPOINT !== ''
  const loading = configured && remote === null
  const testimonials = remote && remote.length > 0 ? remote : TESTIMONIALS

  return (
    <section id="temoignages" className="py-20 lg:py-28" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <SectionHeading
          overline={t.testimonials.overline}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
        />

        {loading ? (
          <Reveal delay={120}>
            <Skeleton />
          </Reveal>
        ) : testimonials.length > 0 ? (
          <Reveal delay={120}>
            <Carousel items={testimonials} />
          </Reveal>
        ) : (
          <Reveal delay={120} className="mt-14">
            <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-line bg-white p-10 text-center sm:p-14">
              <div
                className="absolute -right-10 -top-10 size-28 rotate-45 border border-fosa-500/15"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-8 -left-8 size-20 rotate-45 bg-fosa-500/[0.05]"
                aria-hidden="true"
              />
              <Diamond className="mx-auto size-2.5 text-fosa-500" />
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-navy-900">
                {t.testimonials.emptyTitle}
              </h3>
              <p className="mx-auto mt-2.5 max-w-md text-[15px] leading-relaxed text-ink">
                {t.testimonials.emptyText}
              </p>
            </div>
          </Reveal>
        )}

        {configured ? (
          <Reveal delay={120} className="mt-16">
            <div className="mx-auto max-w-3xl">
              <TestimonialForm />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
