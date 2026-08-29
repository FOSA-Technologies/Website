import type { ReactNode } from 'react'
import Reveal from './Reveal'

export function Diamond({ className = 'size-2' }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden="true" focusable="false">
      <rect width="7.07" height="7.07" x="1.46" y="1.46" transform="rotate(45 5 5)" fill="currentColor" />
    </svg>
  )
}

interface SectionHeadingProps {
  overline: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
}

/**
 * En-tête de section : sur-titre (overline) avec diamant signature,
 * titre fort et sous-titre discret.
 */
export default function SectionHeading({
  overline,
  title,
  subtitle,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  const titleColor = dark ? 'text-white' : 'text-navy-900'
  const overlineColor = dark ? 'text-fosa-400' : 'text-fosa-700'

  return (
    <Reveal className={`flex flex-col gap-4 ${alignment} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
      <p
        className={`inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] ${overlineColor}`}
      >
        <Diamond />
        {overline}
      </p>
      <h2
        className={`text-3xl font-bold tracking-[-0.02em] text-balance sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12] ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`max-w-2xl text-[15px] leading-relaxed sm:text-[17px] ${dark ? 'text-white/60' : 'text-ink'}`}>
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  )
}
