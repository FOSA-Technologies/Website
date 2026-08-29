import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { FeatureIllustration } from '../components/GeometricIcons'
import { FEATURES } from '../lib/content'

/** Fonctionnalités : grille asymétrique (3 + 2) avec illustrations géométriques. */
export default function Features() {
  return (
    <section id="fonctionnalites" className="py-20 lg:py-28" aria-labelledby="features-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Fonctionnalités"
          title="Conçu pour travailler plus intelligemment."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          {FEATURES.map((feature, i) => (
            <Reveal
              key={feature.title}
              delay={(i % 3) * 70}
              className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}
            >
              <article className="group h-full rounded-xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-fosa-300 hover:shadow-card sm:p-8">
                <div className="flex size-14 items-center justify-center rounded-[10px] bg-surface text-navy-900 transition-colors duration-300 group-hover:bg-fosa-50">
                  <FeatureIllustration name={feature.illustration} />
                </div>
                <h3 className="mt-6 text-[17px] font-semibold text-navy-900">{feature.title}</h3>
                <p className="mt-1.5 max-w-sm text-[15px] leading-relaxed text-ink">
                  {feature.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
