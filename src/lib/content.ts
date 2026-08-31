/**
 * Configuration FOSA hors langue : coordonnées, liens, types d'icônes.
 * Toute la copie marketing vit dans i18n/translations.ts (FR/EN).
 */

export const CONTACT_EMAIL = 'contact@fosa.tech'

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Demande%20de%20contact%20%E2%80%94%20FOSA`

/** ⚠️ À personnaliser : remplacer par le numéro WhatsApp réel de FOSA (format international, sans +). */
export const WHATSAPP_URL =
  'https://wa.me/261340000000?text=Bonjour%20FOSA%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20solutions.'

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://web.facebook.com/profile.php?id=61594040396729' },
  // ⚠️ À personnaliser : URL exacte de la page LinkedIn FOSA Technologies.
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  // ⚠️ À personnaliser : profil Instagram FOSA.
  { label: 'Instagram', href: 'https://www.instagram.com/' },
] as const

/* ————— Unions d'icônes (GeometricIcons) ————— */

export interface Solution {
  icon: 'enterprise' | 'crm' | 'sales' | 'stock' | 'analytics' | 'automation' | 'mobile' | 'ai'
  title: string
  description: string
}

export interface Industry {
  icon: 'health' | 'retail' | 'hospitality' | 'education' | 'services' | 'ngo'
  title: string
  description: string
}

export interface Feature {
  illustration: 'interface' | 'realtime' | 'security' | 'anywhere' | 'scalable'
  title: string
  description: string
}
