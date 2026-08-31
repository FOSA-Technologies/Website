import Reveal from '../components/Reveal'
import { useT } from '../i18n/LanguageContext'

/** Section Problème / Promesse : contraste fort sur fond navy. */
export default function Problem() {
  const t = useT()

  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 lg:py-28" aria-labelledby="problem-title">
      {/* Composition géométrique discrète */}
      <div
        className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(55%_60%_at_85%_10%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 -top-28 size-[380px] rotate-[24deg] border border-white/[0.06]"
        aria-hidden="true"
      />
      <div className="absolute -right-6 top-24 size-36 rotate-45 bg-fosa-500/[0.06]" aria-hidden="true" />
      <div
        className="absolute -left-20 bottom-0 h-px w-[60%] -rotate-[14deg] bg-gradient-to-r from-transparent to-white/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <Reveal>
            <h2
              id="problem-title"
              className="max-w-xl text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-white text-balance sm:text-4xl lg:text-[2.7rem]"
            >
              {t.problem.titleA} <span className="text-fosa-400">{t.problem.titleAccent}</span>{' '}
              {t.problem.titleB}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-lg text-[17px] leading-relaxed text-white/65 lg:justify-self-end">
              <span className="font-medium text-white">{t.problem.textBold}</span> {t.problem.text}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {t.problem.blocks.map((block, i) => (
            <Reveal key={block.number} delay={i * 90}>
              <article className="cut-corner-sm h-full border border-white/[0.07] bg-white/[0.03] p-7 sm:p-8">
                <p className="text-[15px] font-bold tracking-[0.14em] text-fosa-400">
                  {block.number}
                </p>
                <h3 className="mt-5 text-xl font-semibold text-white">{block.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/55">{block.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
