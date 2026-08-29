/**
 * Contenu centralisé du site FOSA.
 * Toute la copie marketing vit ici pour rester facile à éditer.
 */

export const CONTACT_EMAIL = 'contact@fosa.tech'

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Demande%20de%20contact%20%E2%80%94%20FOSA`

/** ⚠️ À personnaliser : remplacer par le numéro WhatsApp réel de FOSA (format international, sans +). */
export const WHATSAPP_URL =
  'https://wa.me/261340000000?text=Bonjour%20FOSA%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20solutions.'

export const NAV_LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Secteurs', href: '#secteurs' },
  { label: 'Fonctionnalités', href: '#fonctionnalites' },
  { label: 'À propos', href: '#apropos' },
] as const

export interface Solution {
  icon: 'enterprise' | 'crm' | 'sales' | 'stock' | 'analytics' | 'automation' | 'mobile' | 'ai'
  title: string
  description: string
}

export const SOLUTIONS: Solution[] = [
  {
    icon: 'enterprise',
    title: "Gestion d'entreprise",
    description:
      'Pilotez vos opérations au quotidien depuis une interface unique, structurée et pensée pour votre métier.',
  },
  {
    icon: 'crm',
    title: 'CRM',
    description:
      'Suivez vos contacts, vos échanges et vos opportunités sans jamais perdre une information.',
  },
  {
    icon: 'sales',
    title: 'Ventes & facturation',
    description:
      'Gérez vos offres, vos commandes et vos factures en quelques clics, du devis à l’encaissement.',
  },
  {
    icon: 'stock',
    title: 'Stocks',
    description:
      'Gardez un contrôle précis de vos inventaires, de vos approvisionnements et de vos mouvements.',
  },
  {
    icon: 'analytics',
    title: 'Analyse & reporting',
    description:
      'Transformez vos données en tableaux de bord clairs pour prendre de meilleures décisions.',
  },
  {
    icon: 'automation',
    title: 'Automatisation',
    description:
      'Éliminez les tâches répétitives grâce à des flux de travail intelligents et configurables.',
  },
  {
    icon: 'mobile',
    title: 'Solutions mobiles',
    description:
      'Accédez à vos outils depuis n’importe quel appareil, où que vous soyez, à tout moment.',
  },
  {
    icon: 'ai',
    title: 'Intelligence artificielle',
    description:
      'Exploitez l’IA pour anticiper les tendances, automatiser les décisions et gagner du temps.',
  },
] as const

export interface Industry {
  icon: 'health' | 'retail' | 'hospitality' | 'education' | 'services' | 'ngo'
  title: string
  description: string
}

export const INDUSTRIES: Industry[] = [
  {
    icon: 'health',
    title: 'Santé',
    description:
      'Gestion des patients, des rendez-vous et des données sensibles en toute conformité.',
  },
  {
    icon: 'retail',
    title: 'Commerce & Distribution',
    description:
      'Points de vente, achats, stocks et performance commerciale, tout au même endroit.',
  },
  {
    icon: 'hospitality',
    title: 'Hôtellerie & Restauration',
    description:
      'Réservations, services et suivi d’activité au quotidien pour une expérience client fluide.',
  },
  {
    icon: 'education',
    title: 'Éducation & Formation',
    description:
      'Gestion des apprenants, des programmes, des cours et des inscriptions, simplement.',
  },
  {
    icon: 'services',
    title: 'Services & Prestations',
    description:
      'Devis, interventions, suivi des missions et facturation de vos prestations.',
  },
  {
    icon: 'ngo',
    title: 'Associations & ONG',
    description:
      'Projets, adhérents, dons et reporting d’impact, centralisés et simplifiés.',
  },
] as const

export interface Feature {
  illustration: 'interface' | 'realtime' | 'security' | 'anywhere' | 'scalable'
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    illustration: 'interface',
    title: 'Gestion complète',
    description: 'Gérez vos opérations depuis une interface unique.',
  },
  {
    illustration: 'realtime',
    title: 'Données en temps réel',
    description: 'Suivez les indicateurs essentiels de votre activité.',
  },
  {
    illustration: 'security',
    title: 'Sécurité avancée',
    description: 'Protégez vos données et celles de vos clients.',
  },
  {
    illustration: 'anywhere',
    title: 'Accessible partout',
    description: 'Travaillez depuis votre ordinateur ou votre mobile.',
  },
  {
    illustration: 'scalable',
    title: 'Évolutif',
    description: 'Une architecture pensée pour accompagner votre croissance.',
  },
] as const

export const FOOTER_SOLUTIONS = [
  { label: 'Gestion', href: '#solutions' },
  { label: 'CRM', href: '#solutions' },
  { label: 'Ventes', href: '#solutions' },
  { label: 'Automatisation', href: '#solutions' },
  { label: 'IA', href: '#solutions' },
] as const

export const FOOTER_COMPANY = [
  { label: 'À propos', href: '#apropos' },
  { label: 'Notre vision', href: '#apropos' },
  { label: 'Contact', href: CONTACT_MAILTO },
] as const

/** Ressources à venir : affichées comme texte pour rester honnête (pas de lien mort). */
export const FOOTER_RESOURCES = [
  { label: 'Documentation', soon: true },
  { label: 'Blog', soon: true },
  { label: 'Support', href: CONTACT_MAILTO },
] as const

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://web.facebook.com/profile.php?id=61594040396729' },
  // ⚠️ À personnaliser : URL exacte de la page LinkedIn FOSA Technologies.
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  // ⚠️ À personnaliser : profil Instagram FOSA.
  { label: 'Instagram', href: 'https://www.instagram.com/' },
] as const
