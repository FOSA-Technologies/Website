import type { Solution, Industry, Feature } from '../lib/content'

/**
 * Icônes et illustrations géométriques FOSA.
 * Langage commun : traits nets, jonctions en onglet, angles francs,
 * losanges « œil de renard » — jamais d'icônes génériques arrondies.
 */

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
} as const

function Svg({
  viewBox = '0 0 24 24',
  children,
  className = '',
  strokeWidth = 1.7,
}: {
  viewBox?: string
  children: React.ReactNode
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...strokeProps}
      strokeWidth={strokeWidth}
    >
      {children}
    </svg>
  )
}

/* ————————————————— Icônes Solutions (24 × 24) ————————————————— */

const SOLUTION_PATHS: Record<Solution['icon'], React.ReactNode> = {
  enterprise: (
    <>
      <path d="M4.5 21V10.8L12 4.6l7.5 6.2V21" />
      <path d="M9.2 21v-3.6h5.6V21" />
      <path d="M8.9 13.6h2.3M12.8 13.6h2.3M8.9 17h2.3" />
    </>
  ),
  crm: (
    <>
      <rect x="4.5" y="5.6" width="5" height="5" transform="rotate(45 7 8.1)" />
      <path d="M3.1 20l1-3.7c.5-1.4 1.5-2.1 2.9-2.1s2.4.7 2.9 2.1l1 3.7" />
      <rect x="15.9" y="9.6" width="4.2" height="4.2" transform="rotate(45 18 11.7)" />
      <path d="M14.7 20l.9-3.3c.4-1.2 1.2-1.8 2.3-1.8s1.9.6 2.3 1.8l.9 3.3" />
    </>
  ),
  sales: (
    <>
      <path d="M6 3.5h10l1.5 2-1.5 2 1.5 2-1.5 2 1.5 2-1.5 2 1.5 2-1.5 2H6z" />
      <path d="M9.3 8.2h5M9.3 11.6h5M9.3 15h3" />
    </>
  ),
  stock: (
    <>
      <path d="M12 4.5 20 8v8l-8 3.5L4 16V8z" />
      <path d="M4 8l8 3.5L20 8" />
      <path d="M12 11.5V19.5" />
    </>
  ),
  analytics: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M6 18.8l4-5 3.2 2.5L18 10.5" />
      <rect
        x="16.9"
        y="9.4"
        width="2.2"
        height="2.2"
        transform="rotate(45 18 10.5)"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  automation: (
    <>
      <path d="M12 3.2 19.6 7.6v8.8L12 20.8 4.4 16.4V7.6z" />
      <path d="M13.4 8.6 10.3 13.4h2.6l-1.3 3.6 3.7-4.8h-2.6z" fill="currentColor" stroke="none" />
    </>
  ),
  mobile: (
    <>
      <path d="M7.5 3.5h6.2L16.5 6.3v14.2h-9z" />
      <path d="M10.6 17.6h2.8" />
    </>
  ),
  ai: (
    <>
      <path d="M6.5 6.5l4.3 3.1M17.5 6.5l-4.3 3.1M11.9 11v5.9" />
      <rect x="5.4" y="5.4" width="2.2" height="2.2" transform="rotate(45 6.5 6.5)" fill="#fff" />
      <rect x="16.4" y="5.4" width="2.2" height="2.2" transform="rotate(45 17.5 6.5)" fill="#fff" />
      <rect x="10.8" y="9.9" width="2.2" height="2.2" transform="rotate(45 11.9 11)" fill="#fff" />
      <rect
        x="10.8"
        y="15.9"
        width="2.2"
        height="2.2"
        transform="rotate(45 11.9 17)"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
}

export function SolutionIcon({ name, className = 'size-6' }: { name: Solution['icon']; className?: string }) {
  return (
    <Svg className={className} strokeWidth={1.7}>
      {SOLUTION_PATHS[name]}
    </Svg>
  )
}

/* ————————————————— Icônes Secteurs (24 × 24) ————————————————— */

const INDUSTRY_PATHS: Record<Industry['icon'], React.ReactNode> = {
  health: (
    <>
      <path d="M12 4.5v15M4.5 12h15" />
    </>
  ),
  retail: (
    <>
      <path d="M4.2 10V8.2L12 3.6l7.8 4.6V10" />
      <path d="M4.2 10h15.6v10H4.2z" />
      <path d="M12 14.5V20M8.8 14.5V20" />
    </>
  ),
  hospitality: (
    <>
      <path d="M5 14 7.5 8.2 12 6.4l4.5 1.8L19 14z" />
      <path d="M5 14h14M9 18.5h6M11.2 14v4.5M12.8 14v4.5" />
    </>
  ),
  education: (
    <>
      <path d="M3.5 9.5 12 4.8l8.5 4.7-8.5 4.7z" />
      <path d="M7 11.9v4.4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.4" />
    </>
  ),
  services: (
    <>
      <path d="M4 9.5h16v11H4z" />
      <path d="M9.5 9.5V6.8c0-1.2 1-2.2 2.5-2.2s2.5 1 2.5 2.2v2.7" />
      <rect
        x="10.9"
        y="12.9"
        width="2.2"
        height="2.2"
        transform="rotate(45 12 14)"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  ngo: (
    <>
      <path d="M12 20 5.5 14.6a4.4 4.4 0 0 1-1-6.1A4.4 4.4 0 0 1 11.2 8l.8.6.8-.6a4.4 4.4 0 0 1 6.7.5 4.4 4.4 0 0 1-1 6.1z" />
    </>
  ),
}

export function IndustryIcon({ name, className = 'size-6' }: { name: Industry['icon']; className?: string }) {
  return (
    <Svg className={className} strokeWidth={1.7}>
      {INDUSTRY_PATHS[name]}
    </Svg>
  )
}

/* ———————— Illustrations Fonctionnalités (48 × 48) ———————— */

const FEATURE_ART: Record<Feature['illustration'], React.ReactNode> = {
  interface: (
    <>
      <rect x="5" y="9" width="38" height="31" />
      <path d="M5 17.5h38" />
      <path d="M11 31l9-8 7 6 9-9" />
      <rect
        x="30.4"
        y="12.4"
        width="3.4"
        height="3.4"
        transform="rotate(45 32.1 14.1)"
        fill="#FF5A00"
        stroke="none"
      />
    </>
  ),
  realtime: (
    <>
      <path d="M5 41h38" />
      <path d="M9.5 41 13 27h6.5l-3.5 14z" />
      <path d="M21.5 41l3.5-19h6.5l-3.5 19z" />
      <path d="M33.5 41l3.5-26h6l-3.5 26z" fill="#FF5A00" fillOpacity="0.14" stroke="#FF5A00" />
    </>
  ),
  security: (
    <>
      <path d="M24 5.5 39 12v11c0 9.3-6.3 15.5-15 19.5-8.7-4-15-10.2-15-19.5V12z" />
      <rect
        x="20.8"
        y="20.8"
        width="6.4"
        height="6.4"
        transform="rotate(45 24 24)"
        fill="#FF5A00"
        stroke="none"
      />
    </>
  ),
  anywhere: (
    <>
      <rect x="4.5" y="11" width="26" height="18" />
      <path d="M14.5 29h6M17.5 29v4.5M12 38h11" />
      <path d="M32.5 21h9L45 24.5V39H32.5z" />
      <path d="M25.5 7.5l2-2M21.5 10.5l2-2" stroke="#FF5A00" />
    </>
  ),
  scalable: (
    <>
      <path d="M7 41V25l9-9 9 7 9.5-11.5" />
      <path d="M7 41h30" />
      <rect
        x="32.8"
        y="9.8"
        width="3.4"
        height="3.4"
        transform="rotate(45 34.5 11.5)"
        fill="#FF5A00"
        stroke="none"
      />
    </>
  ),
}

export function FeatureIllustration({
  name,
  className = 'size-12',
}: {
  name: Feature['illustration']
  className?: string
}) {
  return (
    <Svg viewBox="0 0 48 48" className={className} strokeWidth={1.6}>
      {FEATURE_ART[name]}
    </Svg>
  )
}
