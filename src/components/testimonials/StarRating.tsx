import { useState } from 'react'

/** Étoile pleine 24×24, partagée entre le sélecteur et les cartes témoignage. */
export function StarIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" />
    </svg>
  )
}

interface StarRatingProps {
  /** Nom partagé par les 5 radios (navigation fléchée native). */
  name: string
  /** Note sélectionnée, 0 = aucune. */
  value: number
  onChange: (value: number) => void
  disabled?: boolean
  /** Libellé visible du groupe (legend). */
  label: string
  /** Libellé accessible de chaque étoile, ex. « 4 étoiles sur 5 ». */
  getStarLabel: (value: number) => string
}

/**
 * Sélecteur de note 1–5 étoiles.
 * Des radios natifs masqués portent la sémantique et le clavier ;
 * les étoiles sont de simples décorations `aria-hidden` portées par les labels.
 */
export default function StarRating({
  name,
  value,
  onChange,
  disabled = false,
  label,
  getStarLabel,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0)
  const shown = disabled ? value : hoverValue || value

  return (
    <fieldset disabled={disabled}>
      <legend className="text-[13.5px] font-medium text-navy-900">{label}</legend>
      <div
        className="mt-2 flex items-center gap-1"
        onMouseLeave={() => setHoverValue(0)}
        onBlur={() => setHoverValue(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <label
            key={star}
            className="cursor-pointer rounded-[6px] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-fosa-500 disabled:cursor-default"
            onMouseEnter={() => setHoverValue(star)}
          >
            <input
              type="radio"
              name={name}
              value={star}
              checked={value === star}
              onChange={() => onChange(star)}
              aria-label={getStarLabel(star)}
              className="sr-only"
            />
            <StarIcon
              className={`size-7 transition-colors duration-150 ${
                star <= shown ? 'text-fosa-500' : 'text-[#c6cdd8]'
              }`}
            />
          </label>
        ))}
      </div>
    </fieldset>
  )
}
