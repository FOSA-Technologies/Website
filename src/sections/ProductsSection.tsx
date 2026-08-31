import Reveal from '../components/Reveal'
import Button from '../components/Button'
import SectionHeading, { Diamond } from '../components/SectionHeading'
import ProductCard from '../components/products/ProductCard'
import { useT } from '../i18n/LanguageContext'
import { PRODUCTS } from '../data/products'
import { CONTACT_EMAIL } from '../lib/content'

/** CTA « Être informé » : demande d'alerte produit par e-mail. */
const NOTIFY_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Je%20souhaite%20%C3%AAtre%20inform%C3%A9%20du%20lancement%20des%20produits%20FOSA`

/**
 * Portfolio SaaS FOSA. Tant qu'aucun produit n'est configuré dans
 * data/products.ts, la section affiche son état « bientôt disponible » —
 * jamais de produit fictif.
 */
export default function ProductsSection() {
  const t = useT()

  return (
    <section id="produits" className="py-20 lg:py-28" aria-labelledby="products-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <SectionHeading
          overline={t.products.overline}
          title={t.products.title}
          subtitle={t.products.subtitle}
        />

        {PRODUCTS.length > 0 ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.name} delay={(i % 3) * 70}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={120} className="mt-14">
            <div className="cut-corner relative overflow-hidden bg-navy-900 px-8 py-14 sm:px-12 sm:py-16">
              <div
                className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(65%_75%_at_75%_15%,black,transparent)]"
                aria-hidden="true"
              />
              <div
                className="absolute -right-16 -top-16 size-52 rotate-45 border border-white/[0.06]"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-12 -left-12 size-32 rotate-45 bg-fosa-500/[0.07]"
                aria-hidden="true"
              />
              <div
                className="absolute left-[10%] top-10 h-px w-40 -rotate-[14deg] bg-gradient-to-r from-transparent to-fosa-500/30"
                aria-hidden="true"
              />

              <div className="relative mx-auto max-w-2xl text-center">
                <Diamond className="mx-auto size-2.5 text-fosa-400" />
                <h3 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-white text-balance sm:text-3xl">
                  {t.products.comingTitle}
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/60 sm:text-base">
                  {t.products.comingText}
                </p>

                <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                  {t.solutions.items.map((solution) => (
                    <li
                      key={solution.title}
                      className="rounded-[6px] border border-white/10 px-3 py-1.5 text-[12.5px] font-medium text-white/65"
                    >
                      {solution.title}
                    </li>
                  ))}
                </ul>

                <Button href={NOTIFY_MAILTO} variant="primaryOnDark" size="lg" className="mt-9">
                  {t.products.notify}
                </Button>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
