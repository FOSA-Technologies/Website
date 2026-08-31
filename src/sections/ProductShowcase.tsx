import Reveal from '../components/Reveal'
import DashboardMockup from '../components/DashboardMockup'
import SectionHeading, { Diamond } from '../components/SectionHeading'
import { useT } from '../i18n/LanguageContext'

function Chip({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-navy-800/95 px-4 py-3 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)] backdrop-blur-sm">
      <Diamond className="size-2 shrink-0 text-fosa-400" />
      <span className="text-sm font-medium text-white">{label}</span>
    </div>
  )
}

/** Showcase immersif : le mockup FOSA mis en scène avec des annotations sobres. */
export default function ProductShowcase() {
  const t = useT()
  const annotations = t.showcase.annotations

  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 lg:py-28" aria-labelledby="showcase-title">
      <div
        className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(60%_55%_at_50%_45%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute -left-28 top-1/3 size-[380px] rotate-[20deg] border border-white/[0.05]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-16 size-48 rotate-45 bg-fosa-500/[0.05]"
        aria-hidden="true"
      />
      <div
        className="absolute left-[12%] top-16 h-px w-56 -rotate-[16deg] bg-gradient-to-r from-transparent to-white/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          overline={t.showcase.overline}
          title={t.showcase.title}
          subtitle={t.showcase.subtitle}
        />

        <Reveal delay={120} className="relative mx-auto mt-16 max-w-5xl">
          {/* Mockup FOSA construit en HTML/CSS : il reste l'élément principal */}
          <DashboardMockup />

          {/* Annotations épinglées sur les bords du cadre (desktop large uniquement) */}
          <div className="absolute -top-5 left-6 hidden xl:flex">
            <Chip label={annotations[0]} />
          </div>
          <div className="absolute -bottom-5 left-6 hidden xl:flex">
            <Chip label={annotations[1]} />
          </div>
          <div className="absolute -top-5 right-6 hidden xl:flex">
            <Chip label={annotations[2]} />
          </div>
          <div className="absolute -bottom-5 right-44 hidden xl:flex">
            <Chip label={annotations[3]} />
          </div>
        </Reveal>

        {/* Version compacte des annotations (mobile / tablette) */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 xl:hidden">
          {annotations.map((label, i) => (
            <Reveal key={label} delay={i * 60}>
              <Chip label={label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
