interface LogoProps {
  /** `true` pour les fonds sombres (navy). */
  dark?: boolean
  size?: 'sm' | 'lg'
  className?: string
}

/**
 * Logo FOSA : icône renard géométrique (asset fourni, jamais déformé)
 * + wordmark typographié pour un rendu net à toutes les tailles.
 */
export default function Logo({ dark = false, size = 'sm', className = '' }: LogoProps) {
  const iconHeight = size === 'lg' ? 'h-10' : 'h-8'
  const textSize = size === 'lg' ? 'text-[26px]' : 'text-[22px]'

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
        className={`${textSize} font-extrabold tracking-tight ${dark ? 'text-white' : 'text-navy-900'}`}
      >
        FOSA
      </span>
    </span>
  )
}
