import Button from '../Button'
import { Diamond } from '../SectionHeading'
import ProductIllustration from './ProductIllustration'
import { useLang, useT } from '../../i18n/LanguageContext'
import type { Product } from '../../data/products'

function PlayGlyph() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-4 translate-x-[1.5px] text-white"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6.5 4.2 16 10l-9.5 5.8z" />
    </svg>
  )
}

/**
 * Aperçu produit façon vignette vidéo : illustration légèrement floutée
 * (placeholder de capture), bouton play en bas. Cliquable vers la démo.
 * Une vraie capture d'écran prend le dessus dès que `product.image` existe.
 */
function ProductMedia({ product }: { product: Product }) {
  const t = useT()
  const href = product.demoUrl ?? product.productUrl
  const targetBlank = !!product.demoUrl
  const external = targetBlank && /^https?:/.test(product.demoUrl ?? '')

  const media = (
    <>
      <span className="absolute inset-0 bg-navy-900" aria-hidden="true" />
      <span className="bg-grid-dark absolute inset-0 opacity-60" aria-hidden="true" />
      <span
        className="absolute inset-0 transition-[filter] duration-300 blur-[2.5px] group-hover/media:blur-[1.25px]"
        aria-hidden="true"
      >
        {product.image ? (
          <img src={product.image} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <ProductIllustration name={product.illustration} className="h-full w-full" />
        )}
      </span>
      <span
        className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/10 to-navy-900/5"
        aria-hidden="true"
      />

      {/* Statut, superposé à l'aperçu */}
      <StatusBadge product={product} />

      {/* Contrôle vidéo placeholder, en bas de l'aperçu */}
      <span className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-3.5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 shadow-[0_8px_20px_-8px_rgb(0_0_0/0.6)] backdrop-blur-[2px] transition-all duration-200 group-hover/media:scale-105 group-hover/media:bg-white/25">
          <PlayGlyph />
        </span>
        <span className="text-[13px] font-semibold text-white/90">{t.products.viewDemo}</span>
      </span>
    </>
  )

  if (!href) {
    return <div className="relative aspect-video overflow-hidden">{media}</div>
  }

  return (
    <a
      href={href}
      target={targetBlank ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={`${t.products.viewDemoAria} ${product.name}`}
      className="group/media relative block aspect-video overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-fosa-500"
    >
      {media}
    </a>
  )
}

function StatusBadge({ product }: { product: Product }) {
  const t = useT()

  const styles: Record<Product['status'], string> = {
    Disponible: 'border-fosa-400/40 bg-navy-900/60 text-fosa-300',
    'En développement': 'border-white/20 bg-navy-900/60 text-white/85',
    'Bientôt disponible': 'border-white/20 bg-navy-900/60 text-white/70',
  }

  const labels: Record<Product['status'], string> = {
    Disponible: t.products.statuses.available,
    'En développement': t.products.statuses.inDevelopment,
    'Bientôt disponible': t.products.statuses.comingSoon,
  }

  return (
    <span
      className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] backdrop-blur-[2px] ${styles[product.status]}`}
    >
      {product.status === 'Disponible' ? (
        <span
          className="size-1.5 animate-pulse rounded-full bg-fosa-400 motion-reduce:animate-none"
          aria-hidden="true"
        />
      ) : null}
      {labels[product.status]}
    </span>
  )
}

/**
 * Carte produit : aperçu vidéo en haut, identité et accès en dessous.
 * Les boutons ne s'affichent que si une URL réelle est configurée.
 */
export default function ProductCard({ product }: { product: Product }) {
  const t = useT()
  const { lang } = useLang()

  const category = lang === 'en' ? (product.en?.category ?? product.category) : product.category
  const description =
    lang === 'en' ? (product.en?.description ?? product.description) : product.description
  const features = lang === 'en' ? (product.en?.features ?? product.features) : product.features

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-fosa-300 hover:shadow-card">
      <ProductMedia product={product} />

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fosa-700">
          {category}
        </p>
        <h3 className="mt-1.5 text-lg font-semibold text-navy-900">{product.name}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-ink">{description}</p>

        {features.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-[14px] text-navy-800">
                <Diamond className="mt-[7px] size-1.5 shrink-0 text-fosa-500" />
                {feature}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
          {product.productUrl ? (
            <Button href={product.productUrl} variant="primary" size="md">
              {t.products.viewProduct}
            </Button>
          ) : null}
          {product.demoUrl ? (
            <Button
              href={product.demoUrl}
              variant="secondary"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.products.viewDemo}
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  )
}
