import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { SolutionIcon } from '../components/GeometricIcons'
import { useT } from '../i18n/LanguageContext'
import type { Solution } from '../lib/content'

/** Solutions : FOSA est une plateforme qui construit des outils métiers variés. */
export default function Solutions() {
  const t = useT()

  return (
    <section id="solutions" className="py-20 lg:py-28" aria-labelledby="solutions-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <SectionHeading
          overline={t.solutions.overline}
          title={t.solutions.title}
          subtitle={t.solutions.subtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {t.solutions.items.map((solution, i) => (
            <Reveal key={solution.title} delay={(i % 4) * 70}>
              <article className="group h-full rounded-xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-fosa-300 hover:shadow-card">
                <div className="flex size-11 items-center justify-center rounded-[10px] bg-fosa-50 text-fosa-700 transition-colors duration-300 group-hover:bg-fosa-500 group-hover:text-white">
                  <SolutionIcon name={solution.icon as Solution['icon']} />
                </div>
                <h3 className="mt-5 text-[16.5px] font-semibold text-navy-900">{solution.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink">{solution.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
