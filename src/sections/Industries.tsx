import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { IndustryIcon } from '../components/GeometricIcons'
import { CONTACT_MAILTO, INDUSTRIES } from '../lib/content'

export default function Industries() {
  return (
    <section id="secteurs" className="bg-surface py-20 lg:py-28" aria-labelledby="industries-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Secteurs"
          title="Une solution pour chaque secteur."
          subtitle="Quel que soit votre domaine d’activité, FOSA s’adapte aux réalités de votre métier."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.title} delay={(i % 4) * 70}>
              <article className="group h-full rounded-xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-fosa-300 hover:shadow-card">
                <div className="flex size-11 items-center justify-center rounded-[10px] bg-surface text-navy-900 transition-colors duration-300 group-hover:bg-fosa-500 group-hover:text-white">
                  <IndustryIcon name={industry.icon} />
                </div>
                <h3 className="mt-5 text-[16.5px] font-semibold text-navy-900">{industry.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink">{industry.description}</p>
              </article>
            </Reveal>
          ))}

          {/* Carte « Et plus encore » : ouverture vers le contact */}
          <Reveal delay={140}>
            <article className="relative flex h-full flex-col overflow-hidden rounded-xl bg-navy-900 p-6 text-white">
              <div
                className="absolute -right-7 -top-7 size-24 rotate-45 border border-white/10"
                aria-hidden="true"
              />
              <div className="flex size-11 items-center justify-center rounded-[10px] bg-white/[0.06] text-fosa-400">
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <h3 className="mt-5 text-[16.5px] font-semibold">Et plus encore</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/55">
                Chaque métier a ses particularités. Parlons de vos besoins.
              </p>
              <a
                href={CONTACT_MAILTO}
                className="mt-auto inline-flex items-center gap-2 pt-5 text-[14.5px] font-semibold text-fosa-400 transition-colors hover:text-fosa-300"
              >
                Discutons-en
                <span aria-hidden="true">→</span>
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
