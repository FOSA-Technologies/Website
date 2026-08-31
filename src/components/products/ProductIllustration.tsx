import type { ReactNode } from 'react'
import type { Product } from '../../data/products'

/**
 * Illustrations d'aperçu produit, dessinées dans le langage géométrique
 * FOSA (traits nets, jonctions en onglet, losanges, navy/orange) : des
 * compositions abstraites d'interface, jamais d'images génériques.
 * Remplacées automatiquement par une vraie capture via `product.image`.
 */

const base = {
  fill: 'none',
  stroke: 'rgba(255, 255, 255, 0.75)',
  strokeWidth: 1.5,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
} as const

const SCENES: Record<NonNullable<Product['illustration']>, ReactNode> = {
  /* ——— FOSA Gestion : fenêtre d'application, KPI, barres et courbe ——— */
  gestion: (
    <>
      <rect x="10" y="10" width="300" height="160" rx="3" {...base} strokeOpacity="0.35" />
      <path d="M10 32h300" {...base} strokeOpacity="0.3" />
      <rect x="18" y="17" width="46" height="8" fill="#FF5A00" />
      <rect x="262" y="17" width="18" height="8" {...base} strokeOpacity="0.5" />
      <rect x="284" y="17" width="18" height="8" {...base} strokeOpacity="0.5" />
      <rect x="18" y="44" width="86" height="40" {...base} strokeOpacity="0.5" />
      <rect x="112" y="44" width="86" height="40" {...base} strokeOpacity="0.5" />
      <rect x="206" y="44" width="86" height="40" {...base} strokeOpacity="0.5" />
      <path d="M28 70h14M28 75h20" {...base} strokeOpacity="0.35" />
      <path d="M122 70h14M122 75h20" {...base} strokeOpacity="0.35" />
      <path d="M216 70h14M216 75h20" {...base} strokeOpacity="0.35" />
      <rect x="266" y="51" width="7" height="7" transform="rotate(45 269.5 54.5)" fill="#FF5A00" />
      <rect x="18" y="96" width="180" height="62" {...base} strokeOpacity="0.5" />
      <rect x="32" y="132" width="13" height="18" fill="rgba(255, 255, 255, 0.3)" />
      <rect x="53" y="124" width="13" height="26" fill="rgba(255, 255, 255, 0.3)" />
      <rect x="74" y="128" width="13" height="22" fill="#FF5A00" />
      <rect x="95" y="118" width="13" height="32" fill="rgba(255, 255, 255, 0.3)" />
      <rect x="116" y="130" width="13" height="20" fill="rgba(255, 255, 255, 0.3)" />
      <rect x="137" y="122" width="13" height="28" fill="rgba(255, 255, 255, 0.3)" />
      <rect x="158" y="114" width="13" height="36" fill="rgba(255, 255, 255, 0.3)" />
      <rect x="210" y="96" width="82" height="62" {...base} strokeOpacity="0.5" />
      <path d="M222 142l14-12 12-6 14-16 12 2" {...base} stroke="#FF5A00" strokeWidth="2" />
      <rect x="268" y="104" width="7" height="7" transform="rotate(45 271.5 107.5)" fill="#FF5A00" />
    </>
  ),

  /* ——— FOSA CRM : fiches contacts, pipeline 3 étapes, entonnoir ——— */
  crm: (
    <>
      <rect x="10" y="10" width="300" height="160" rx="3" {...base} strokeOpacity="0.35" />
      <path d="M10 32h300" {...base} strokeOpacity="0.3" />
      <rect x="18" y="17" width="46" height="8" fill="#FF5A00" />
      <rect x="18" y="44" width="84" height="36" {...base} strokeOpacity="0.5" />
      <rect x="18" y="86" width="84" height="36" {...base} strokeOpacity="0.5" />
      <rect x="18" y="128" width="84" height="22" {...base} strokeOpacity="0.35" />
      <rect x="26" y="51" width="8" height="8" transform="rotate(45 30 55)" fill="rgba(255, 255, 255, 0.7)" />
      <rect x="26" y="93" width="8" height="8" transform="rotate(45 30 97)" fill="#FF5A00" />
      <path d="M42 55h44M42 60h30" {...base} strokeOpacity="0.35" />
      <path d="M42 97h44M42 102h30" {...base} strokeOpacity="0.35" />
      <path d="M26 137h34" {...base} strokeOpacity="0.3" />
      <rect x="122" y="44" width="54" height="32" {...base} strokeOpacity="0.5" />
      <rect x="184" y="44" width="54" height="32" {...base} strokeOpacity="0.5" />
      <rect x="246" y="44" width="46" height="32" {...base} stroke="#FF5A00" strokeOpacity="0.9" />
      <path d="M132 60h26M194 60h26" {...base} strokeOpacity="0.45" />
      <path d="M158 54l-6 6M158 66l-6-6M220 54l-6 6M220 66l-6-6" {...base} strokeOpacity="0.45" />
      <path d="M122 96h170l-40 54H162z" {...base} strokeOpacity="0.5" />
      <path d="M164 96l-20 54M246 96l-10 54M214 96l-6 54" {...base} strokeOpacity="0.25" />
      <rect x="188" y="140" width="8" height="8" transform="rotate(45 192 144)" fill="#FF5A00" />
    </>
  ),

  /* ——— FOSA Automate : nœuds connectés autour d'un cœur en losange ——— */
  automation: (
    <>
      <rect x="10" y="10" width="300" height="160" rx="3" {...base} strokeOpacity="0.35" />
      <rect x="24" y="44" width="34" height="34" {...base} strokeOpacity="0.6" />
      <rect x="24" y="112" width="34" height="34" {...base} strokeOpacity="0.6" />
      <rect x="262" y="44" width="34" height="34" {...base} strokeOpacity="0.6" />
      <rect x="262" y="112" width="34" height="34" {...base} strokeOpacity="0.6" />
      <rect x="35" y="55" width="12" height="12" fill="rgba(255, 255, 255, 0.25)" />
      <rect x="35" y="123" width="12" height="12" fill="rgba(255, 255, 255, 0.25)" />
      <rect x="273" y="55" width="12" height="12" fill="rgba(255, 255, 255, 0.25)" />
      <rect x="273" y="123" width="12" height="12" fill="rgba(255, 255, 255, 0.25)" />
      <path d="M75 61l48 14M245 61l-48 14M75 127l48-14M245 127l-48-14" {...base} strokeOpacity="0.5" />
      <rect x="146" y="76" width="28" height="28" transform="rotate(45 160 90)" fill="#FF5A00" />
      <path d="M156 80l-5 10h6l-2 8 7-11h-6l3-7z" fill="#0B1424" />
      <rect x="112" y="24" width="6" height="6" transform="rotate(45 115 27)" fill="rgba(255, 255, 255, 0.5)" />
      <rect x="204" y="152" width="6" height="6" transform="rotate(45 207 155)" fill="rgba(255, 255, 255, 0.5)" />
    </>
  ),
}

export default function ProductIllustration({
  name = 'gestion',
  className = '',
}: {
  name?: NonNullable<Product['illustration']>
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {SCENES[name]}
    </svg>
  )
}
