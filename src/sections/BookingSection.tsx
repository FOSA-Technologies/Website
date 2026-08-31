import Reveal from '../components/Reveal'
import Button from '../components/Button'
import SectionHeading, { Diamond } from '../components/SectionHeading'
import CalendlyEmbed from '../components/booking/CalendlyEmbed'
import { BOOKING_MAILTO, CALENDLY_URL } from '../lib/calendly'

const BENEFITS = [
  'Analyse de vos besoins',
  'Identification des meilleures solutions',
  'Conseils personnalisés',
  'Sans engagement',
] as const

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.5 8.5 6.2 12 13.5 4" />
    </svg>
  )
}

/** Panneau d'attente : affiché tant que CALENDLY_URL n'est pas configurée. */
function BookingFallback() {
  return (
    <div className="cut-corner relative overflow-hidden bg-navy-900 p-8 sm:p-10">
      <div
        className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(70%_70%_at_85%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-12 -top-12 size-44 rotate-45 border border-white/[0.07]"
        aria-hidden="true"
      />
      <div className="absolute -bottom-10 -left-10 size-28 rotate-45 bg-fosa-500/[0.07]" aria-hidden="true" />

      <div className="relative">
        <Diamond className="size-2.5 text-fosa-400" />
        <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-white">
          Notre agenda en ligne arrive bientôt.
        </h3>
        <p className="mt-2.5 max-w-sm text-[15px] leading-relaxed text-white/60">
          En attendant, écrivez-nous pour convenir d’un créneau qui vous arrange.
        </p>
        <Button href={BOOKING_MAILTO} variant="primaryOnDark" size="lg" className="mt-7">
          Proposer un créneau
        </Button>
      </div>
    </div>
  )
}

/** Prise de rendez-vous : bénéfices à gauche, calendrier Calendly à droite. */
export default function BookingSection() {
  return (
    <section id="rendez-vous" className="py-20 lg:py-28" aria-labelledby="booking-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          overline="Rendez-vous"
          title="Parlons de votre projet."
          subtitle="Réservez un créneau avec notre équipe et discutons de vos besoins."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14">
          {/* Argumentaire */}
          <Reveal>
            <div className="flex flex-col gap-8 lg:sticky lg:top-28">
              <p className="max-w-lg text-[15.5px] leading-relaxed text-ink">
                Un échange de 30 minutes, à distance, pour comprendre votre contexte et identifier
                les solutions digitales les plus pertinentes pour votre activité. Aucun jargon, aucun
                engagement.
              </p>

              <ul className="grid gap-3.5 sm:grid-cols-2">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-fosa-50 text-fosa-700">
                      <CheckIcon />
                    </span>
                    <span className="text-[14.5px] font-medium text-navy-900">{benefit}</span>
                  </li>
                ))}
              </ul>

              <p className="max-w-lg border-t border-line/70 pt-6 text-[13.5px] leading-relaxed text-ink">
                Vous préférez écrire ?{' '}
                <a
                  href={BOOKING_MAILTO}
                  className="font-semibold text-fosa-700 underline underline-offset-4 transition-colors hover:text-fosa-600"
                >
                  Contactez-nous par e-mail
                </a>{' '}
                — nous revenons vers vous sous 24 h ouvrées.
              </p>
            </div>
          </Reveal>

          {/* Calendrier */}
          <Reveal delay={120}>{CALENDLY_URL ? <CalendlyEmbed /> : <BookingFallback />}</Reveal>
        </div>
      </div>
    </section>
  )
}
