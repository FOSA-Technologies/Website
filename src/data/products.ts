/**
 * Produits FOSA — configuration centralisée.
 *
 * Ajoutez ici une entrée par produit réellement lancé ou officiellement
 * annoncé par FOSA. Les URLs doivent pointer vers des pages qui existent
 * (pas de lien mort) : le bouton n'est rendu que si l'URL est renseignée.
 *
 * Exemple :
 * {
 *   name: 'FOSA Gestion',
 *   category: 'Gestion d’entreprise',
 *   description: 'Pilotez vos opérations quotidiennes depuis une interface unique.',
 *   features: ['Suivi des stocks', 'Devis & facturation', 'Tableaux de bord'],
 *   status: 'En développement',
 *   demoUrl: 'https://demo.fosa.tech/gestion',
 *   productUrl: 'https://fosa.tech/produits/gestion',
 *   image: '/assets/products/gestion.webp',
 * }
 */

export type ProductStatus = 'Disponible' | 'En développement' | 'Bientôt disponible'

export interface Product {
  name: string
  category: string
  description: string
  features: string[]
  status: ProductStatus
  /** Variante anglaise des champs textuels (le nom de marque reste identique). */
  en?: {
    category?: string
    description?: string
    features?: string[]
  }
  /** Illustration géométrique FOSA de l'aperçu (utilisée quand `image` est absente). */
  illustration?: 'gestion' | 'crm' | 'automation'
  /** URL de la page produit (interne ou externe). Optionnelle : le bouton n'apparaît que si elle existe. */
  productUrl?: string
  /** URL de la démo (vidéo, environnement de test…). Optionnelle. */
  demoUrl?: string
  /** Vraie capture d'écran du produit (remplace l'illustration, lazy-loadée). Optionnelle. */
  image?: string
}

/** Construit l'URL de la page de démonstration locale (/demo/). */
function demoUrlFor(name: string, category: string, features: string[]): string {
  const params = new URLSearchParams({
    product: name,
    category,
    features: features.join('|'),
  })
  return `/demo/index.html?${params.toString()}`
}

/**
 * ⚠️ DONNÉES DE DÉMONSTRATION (mocks) — uniquement pour valider le design
 * de la section Produits. À remplacer par les vrais produits avant la mise
 * en production : les démos pointent vers la page locale /demo/ (interface
 * fictive assumée) et `productUrl` reste vide tant qu'aucune page produit
 * réelle n'existe (le bouton « Voir le produit » apparaîtra automatiquement).
 */
export const PRODUCTS: Product[] = [
  {
    name: 'FOSA Gestion',
    category: 'Gestion d’entreprise',
    description:
      'Pilotez vos opérations quotidiennes depuis une interface unique : ventes, stocks et facturation.',
    features: ['Suivi des stocks', 'Devis & facturation', 'Tableaux de bord', 'Multi-utilisateurs'],
    en: {
      category: 'Business management',
      description:
        'Run your day-to-day operations from a single interface: sales, inventory and invoicing.',
      features: ['Inventory tracking', 'Quotes & invoicing', 'Dashboards', 'Multi-user'],
    },
    status: 'Disponible',
    illustration: 'gestion',
    demoUrl: demoUrlFor('FOSA Gestion', 'Gestion d’entreprise', [
      'Suivi des stocks',
      'Devis & facturation',
      'Tableaux de bord',
    ]),
  },
  {
    name: 'FOSA CRM',
    category: 'Relation client',
    description:
      'Suivez vos contacts, vos échanges et vos opportunités sans jamais perdre une information.',
    features: ['Fiches contacts', 'Pipeline des ventes', 'Relances automatiques', 'Rapports de vente'],
    en: {
      category: 'Customer relationship',
      description:
        'Track your contacts, conversations and opportunities without ever losing information.',
      features: ['Contact records', 'Sales pipeline', 'Automated follow-ups', 'Sales reports'],
    },
    status: 'En développement',
    illustration: 'crm',
    demoUrl: demoUrlFor('FOSA CRM', 'Relation client', [
      'Fiches contacts',
      'Pipeline des ventes',
      'Relances automatiques',
    ]),
  },
  {
    name: 'FOSA Automate',
    category: 'Automatisation',
    description:
      'Éliminez les tâches répétitives grâce à des flux de travail configurables, connectés à vos outils.',
    features: ['Connecteurs', 'Flux configurables', 'Planifications', 'Alertes par e-mail'],
    en: {
      category: 'Automation',
      description:
        'Eliminate repetitive tasks with configurable workflows connected to your tools.',
      features: ['Connectors', 'Configurable workflows', 'Schedules', 'Email alerts'],
    },
    status: 'Bientôt disponible',
    illustration: 'automation',
    demoUrl: demoUrlFor('FOSA Automate', 'Automatisation', [
      'Connecteurs',
      'Flux configurables',
      'Alertes par e-mail',
    ]),
  },
]
