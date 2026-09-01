import { useEffect, useRef, useState } from 'react'
import { Diamond } from '../components/SectionHeading'
import { useT } from '../i18n/LanguageContext'
import { TRUSTED_LOGOS } from '../data/trust'

/**
 * Entreprises qui nous font confiance — uniquement de vrais clients
 * (data/trust.ts), jamais de logo fictif. Défilement en boucle infinie,
 * vitesse adaptée au nombre de logos.
 */

function LogoGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20"
    >
      {TRUSTED_LOGOS.map((logo) => (
        <li key={logo.name} className="flex shrink-0 items-center">
          <img
            src={logo.src}
            alt={hidden ? '' : `Logo ${logo.name}`}
            loading="lazy"
            width={logo.width}
            height={logo.height}
            className="h-14 w-auto select-none opacity-90 transition-opacity duration-200 hover:opacity-100 sm:h-16"
            draggable={false}
          />
        </li>
      ))}
    </ul>
  )
}

export default function TrustMarquee() {
  const t = useT()
  const maskRef = useRef<HTMLDivElement>(null)
  /* Nombre de groupes rendus. La boucle anime -50% du track : il faut que le
     track fasse ≥ 2× la fenêtre visible, sinon (peu de logos) les deux copies
     tiennent à l'écran en même temps et la boucle laisse des trous. */
  const [copies, setCopies] = useState(2)

  useEffect(() => {
    const mask = maskRef.current
    if (!mask) return
    const update = () => {
      const group = mask.querySelector('ul')
      const groupWidth = group?.offsetWidth ?? 0
      if (groupWidth === 0) return
      const needed = Math.max(2, 2 * Math.ceil(mask.clientWidth / groupWidth))
      setCopies((prev) => (prev === needed ? prev : needed))
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(mask)
    return () => observer.disconnect()
  }, [])

  /* Durée d'un tour complet, adaptée au nombre de logos (très lent, jamais précipité).
     La boucle parcourt copies/2 groupes : durée étirée d'autant pour garder la même vitesse. */
  const loopSeconds = (10 + TRUSTED_LOGOS.length * 14) * (copies / 2)

  return (
    <section className="border-y border-line bg-white py-10 sm:py-12" aria-labelledby="trust-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <p
          id="trust-title"
          className="flex items-center justify-center gap-2.5 text-center text-[12px] font-bold uppercase tracking-[0.16em] text-navy-900/55 sm:text-[12.5px]"
        >
          <Diamond className="size-1.5 shrink-0 text-fosa-500/70" />
          {t.trust.title}
          <Diamond className="size-1.5 shrink-0 text-fosa-500/70" />
        </p>

        <div
          ref={maskRef}
          className="marquee marquee-mask mt-7 overflow-hidden"
          role="group"
          aria-label={`Logos de nos clients : ${TRUSTED_LOGOS.map((logo) => logo.name).join(', ')}`}
        >
          <div
            className="marquee-track flex w-max items-center"
            style={{ animationDuration: `${loopSeconds}s` }}
          >
            {/* Groupes dupliqués pour la boucle parfaite — seul le premier est
                exposé aux lecteurs d'écran. */}
            {Array.from({ length: copies }, (_, i) => (
              <LogoGroup key={i} hidden={i > 0} />
            ))}
          </div>
        </div>

        <p className="mt-7 text-center text-[13px] text-ink">{t.trust.sub}</p>
      </div>
    </section>
  )
}
