import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant =
  | 'primary'
  | 'secondary'
  | 'primaryOnDark'
  | 'outlineOnDark'
  | 'navyOnOrange'
  | 'outlineOnOrange'
  | 'whiteOnOrange'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: 'md' | 'lg'
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-500'

const variants: Record<Variant, string> = {
  /* Fond orange vif, texte navy : signature FOSA, contraste AA (5,9:1). */
  primary: 'bg-fosa-500 text-navy-900 hover:bg-fosa-600',
  secondary: 'border border-[#d4dae3] bg-white text-navy-900 hover:border-navy-900',
  primaryOnDark: 'bg-fosa-500 text-navy-900 hover:bg-fosa-400',
  outlineOnDark: 'border border-white/25 text-white hover:bg-white/10 hover:border-white/50',
  navyOnOrange: 'bg-navy-900 text-white hover:bg-navy-800',
  outlineOnOrange: 'border border-navy-900/30 text-navy-900 hover:border-navy-900/60 hover:bg-navy-900/[0.06]',
  whiteOnOrange: 'bg-white text-navy-900 hover:bg-[#ffe9dc]',
}

const sizes = {
  md: 'px-5 py-2.5 text-[15px]',
  lg: 'px-7 py-3.5 text-base',
}

/** Bouton-lien : chaque CTA du site pointe vers une vraie destination. */
export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </a>
  )
}
