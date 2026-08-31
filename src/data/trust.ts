/**
 * Entreprises qui font confiance à FOSA — logos affichés dans le marquee.
 *
 * ⚠️ N'ajoutez ici que de VRAIS clients, avec leur accord.
 * Les logos vont dans public/assets/ (WebP conseillé, hauteur ~128px).
 * Le marquee défile en boucle quel que soit le nombre de logos.
 */

export interface TrustedLogo {
  /** Nom de l'entreprise (alt du logo). */
  name: string
  /** Chemin du fichier logo. */
  src: string
  /** Dimensions intrinsèques du fichier (anti-layout-shift). */
  width: number
  height: number
}

export const TRUSTED_LOGOS: TrustedLogo[] = [
  { name: 'Green Impact', src: '/assets/green-impact.webp', width: 135, height: 128 },
]
