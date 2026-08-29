import Button from '../components/Button'
import Reveal from '../components/Reveal'
import DashboardMockup from '../components/DashboardMockup'
import { Diamond } from '../components/SectionHeading'
import { CONTACT_MAILTO } from '../lib/content'

const ArrowIcon = () => (
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
    <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" />
  </svg>
)

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface" aria-labelledby="hero-title">
      {/* Composition graphique : grille technique, halo, diagonales */}
      <div
        className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(62%_62%_at_72%_28%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-44 top-16 size-[540px] rounded-full bg-fosa-500/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-[12%] top-28 h-px w-[130%] rotate-[16deg] bg-gradient-to-r from-transparent via-fosa-500/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute -right-[8%] top-40 h-px w-[115%] rotate-[16deg] bg-gradient-to-r from-transparent via-navy-900/15 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1200px] gap-16 px-5 pb-20 pt-36 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8 lg:pb-28 lg:pt-44">
        {/* Message marketing */}
        <div className="lg:col-span-6">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-fosa-700">
              <Diamond />
              Solutions digitales pour PME
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="mt-6 text-[clamp(2.55rem,6vw,4.1rem)] font-bold leading-[1.05] tracking-[-0.03em] text-navy-900"
            >
              <span className="block">Digitalisez.</span>
              <span className="block">Simplifiez.</span>
              <span className="block">
                <span className="text-fosa-600">Propulsez</span> votre entreprise.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink">
              FOSA accompagne les PME dans leur transformation digitale avec des solutions simples,
              puissantes et évolutives.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#solutions" variant="primary" size="lg">
                Découvrir nos solutions
                <ArrowIcon />
              </Button>
              <Button href={CONTACT_MAILTO} variant="secondary" size="lg">
                Nous contacter
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-7 flex items-center gap-2.5 text-[14.5px] text-[#5b6577]">
              <Diamond className="size-2 shrink-0 text-fosa-500" />
              Des outils conçus pour simplifier votre quotidien et accélérer votre croissance.
            </p>
          </Reveal>
        </div>

        {/* Mockup produit */}
        <div className="relative lg:col-span-6">
          <Reveal delay={200} className="relative">
            {/* Panneau navy biseauté derrière le mockup */}
            <div
              className="cut-corner-br absolute -right-5 bottom-0 left-8 top-8 bg-navy-900 sm:-right-8"
              aria-hidden="true"
            />
            {/* Accents géométriques */}
            <div
              className="cut-corner-sm absolute -left-3 -top-5 z-0 size-28 border-2 border-fosa-500/35 sm:-left-6 sm:size-36"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-4 left-8 size-2.5 rotate-45 bg-fosa-500"
              aria-hidden="true"
            />
            <div
              className="absolute -top-7 right-10 size-2 rotate-45 bg-fosa-500 sm:right-16"
              aria-hidden="true"
            />

            <DashboardMockup className="relative z-10" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
