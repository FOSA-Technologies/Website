import Reveal from '../components/Reveal'
import { Diamond } from '../components/SectionHeading'

const TAGLINE = ['Intelligent.', 'Stratégique.', 'Visionnaire.'] as const

/** Section philosophie : le statement de marque FOSA. */
export default function BrandStatement() {
  return (
    <section id="apropos" className="relative overflow-hidden bg-navy-900 py-24 lg:py-32" aria-labelledby="brand-title">
      {/* Composition géométrique renard : discrète, structurante */}
      <div
        className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(45%_50%_at_15%_85%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute -left-40 -top-40 size-[440px] rotate-[22deg] border border-white/[0.05]"
        aria-hidden="true"
      />
      <div
        className="absolute right-[8%] top-16 size-24 rotate-45 bg-fosa-500/[0.07]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-[8%] bottom-20 h-px w-[55%] -rotate-[14deg] bg-gradient-to-r from-transparent to-fosa-500/25"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-fosa-400">
            <Diamond />
            Notre vision
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="brand-title"
            className="mt-7 text-3xl font-bold leading-[1.14] tracking-[-0.025em] text-white text-balance sm:text-4xl lg:text-[3.1rem]"
          >
            Nous ne créons pas seulement des logiciels.
            <br />
            Nous créons des outils qui <span className="text-fosa-400">font avancer</span> les
            entreprises.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-14 bg-white/15" />
            <Diamond className="size-2 text-fosa-500" />
            <span className="h-px w-14 bg-white/15" />
          </div>
        </Reveal>

        <Reveal delay={280}>
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TAGLINE.map((word) => (
              <li key={word} className="flex items-center gap-2.5">
                <Diamond className="size-1.5 text-fosa-500" />
                <span className="text-lg font-medium text-white/70 sm:text-xl">{word}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
