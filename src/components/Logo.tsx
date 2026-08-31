import { useEffect, useRef, useState } from 'react'

interface LogoProps {
  /** `true` pour les fonds sombres (navy). */
  dark?: boolean
  size?: 'sm' | 'lg'
  className?: string
}

/** Fenêtre aléatoire entre deux « recalibrages » machine. */
const GLITCH_MIN_MS = 5000
const GLITCH_MAX_MS = 9000
/** Durée d'une salve de glitch (ambiant ou au survol). */
const GLITCH_DURATION_MS = 380

/**
 * Logo FOSA : icône renard géométrique (asset fourni, jamais déformé)
 * + wordmark robotique : Orbitron, curseur terminal clignotant et
 * glitch ambiant — la machine se recalibre.
 * Tout est désactivé sous prefers-reduced-motion.
 */
export default function Logo({ dark = false, size = 'sm', className = '' }: LogoProps) {
  const iconHeight = size === 'lg' ? 'h-10' : 'h-8'
  const textSize = size === 'lg' ? 'text-[24px]' : 'text-[20px]'
  const [glitching, setGlitching] = useState(false)
  const burstTimer = useRef<number | undefined>(undefined)

  /* Glitch ambiant : la machine « bégaye » à intervalles irréguliers. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let alive = true
    let delayId: number | undefined

    const schedule = () => {
      const delay = GLITCH_MIN_MS + Math.random() * (GLITCH_MAX_MS - GLITCH_MIN_MS)
      delayId = window.setTimeout(() => {
        if (!alive) return
        setGlitching(true)
        window.setTimeout(() => {
          if (!alive) return
          setGlitching(false)
          schedule()
        }, GLITCH_DURATION_MS)
      }, delay)
    }
    schedule()
    return () => {
      alive = false
      clearTimeout(delayId)
    }
  }, [])

  /* Au survol : une seule salve, pas de boucle continue. */
  const startBurst = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    clearTimeout(burstTimer.current)
    setGlitching(true)
    burstTimer.current = window.setTimeout(() => setGlitching(false), GLITCH_DURATION_MS)
  }
  const stopBurst = () => {
    clearTimeout(burstTimer.current)
    setGlitching(false)
  }
  useEffect(() => () => clearTimeout(burstTimer.current), [])

  const text = dark ? 'text-white' : 'text-navy-900'
  const accentBg = dark ? 'bg-fosa-400' : 'bg-fosa-600'
  /* Couches fantômes du glitch : split orange / cyan sur navy, orange / navy sur clair. */
  const ghostA = dark ? 'text-fosa-400' : 'text-fosa-700'
  const ghostB = dark ? 'text-[#7dd3fc]' : 'text-navy-700'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/assets/fosa-logo.webp"
        alt=""
        width={957}
        height={1018}
        className={`${iconHeight} w-auto select-none`}
        draggable={false}
      />
      <span
        className="relative inline-flex items-center font-robot"
        onPointerEnter={startBurst}
        onPointerLeave={stopBurst}
      >
        <span className={`${textSize} font-bold uppercase leading-none tracking-[0.14em] ${text}`}>
          FOSA
        </span>

        {/* Double fantôme (split RVB) visible pendant le glitch */}
        {glitching ? (
          <>
            <span
              aria-hidden="true"
              className={`robofosa-ghost robofosa-ghost-a absolute inset-0 ${textSize} font-bold uppercase leading-none tracking-[0.14em] ${ghostA}`}
            >
              FOSA
            </span>
            <span
              aria-hidden="true"
              className={`robofosa-ghost robofosa-ghost-b absolute inset-0 ${textSize} font-bold uppercase leading-none tracking-[0.14em] ${ghostB}`}
            >
              FOSA
            </span>
          </>
        ) : null}

        {/* Curseur terminal */}
        <span
          aria-hidden="true"
          className={`robofosa-cursor ml-[7px] inline-block h-[0.72em] w-[0.14em] ${accentBg}`}
        />
      </span>
    </span>
  )
}
