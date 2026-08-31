/**
 * Estimation préliminaire de projet — contrats de données et moteur.
 *
 * Architecture cible :
 *   Frontend (AIQuoteSection)
 *     → generateQuote()
 *       → Backend API (POST /api/quote)
 *         → Service IA
 *           → réponse structurée (QuoteResult)
 *
 * Aujourd'hui, generateQuote() est un moteur de règles déterministe,
 * 100 % local : aucune donnée n'est envoyée sur le réseau et aucune clé
 * API n'est exposée côté frontend. Pour brancher le backend, remplacer le
 * corps de generateQuote() par un appel `fetch('/api/quote', …)` — le reste
 * du site n'a pas besoin de changer.
 */

/* ————————————————————— Contrats de données ————————————————————— */

export type SolutionType =
  | 'site'
  | 'webapp'
  | 'mobile'
  | 'crm'
  | 'erp'
  | 'ecommerce'
  | 'automation'
  | 'ai'
  | 'custom'

export type CompanySize = 'independant' | 'petite' | 'pme' | 'entreprise'

export type Deadline = 'asap' | 'un-a-trois-mois' | 'trois-a-six-mois' | 'flexible'

export type Budget =
  | 'moins-de-2000'
  | '2000-a-5000'
  | '5000-a-10000'
  | '10000-a-25000'
  | 'plus-de-25000'
  | 'non-precise'

export type Complexity = 'Simple' | 'Modérée' | 'Élevée'

export interface QuoteInput {
  type: SolutionType
  description: string
  size: CompanySize
  deadline: Deadline
  budget: Budget
}

/** Réponse structurée renvoyée par l'assistant (et, demain, par l'API IA). */
export interface QuoteResult {
  summary: string
  recommended_features: string[]
  complexity: Complexity
  estimated_range: string
  estimated_timeline: string
  next_steps: string[]
}

/** Mention légale affichée sous chaque résultat. */
export const QUOTE_LEGAL_NOTE =
  'Cette estimation est indicative et peut évoluer après analyse détaillée de votre projet.'

/* ————————————————————— Options du formulaire ————————————————————— */

export interface QuoteOption<T extends string> {
  value: T
  label: string
  hint?: string
}

export const SOLUTION_OPTIONS: QuoteOption<SolutionType>[] = [
  { value: 'site', label: 'Site web', hint: 'Présentation, visibilité, contact' },
  { value: 'webapp', label: 'Application web', hint: 'Outil métier accessible en ligne' },
  { value: 'mobile', label: 'Application mobile', hint: 'iOS, Android ou cross-platform' },
  { value: 'crm', label: 'CRM', hint: 'Suivi clients et opportunités' },
  { value: 'erp', label: 'ERP / gestion', hint: 'Pilotage complet de l’activité' },
  { value: 'ecommerce', label: 'E-commerce', hint: 'Boutique en ligne et paiements' },
  { value: 'automation', label: 'Automatisation', hint: 'Moins de tâches répétitives' },
  { value: 'ai', label: 'Intelligence artificielle', hint: 'Assistant, analyse, prédiction' },
  { value: 'custom', label: 'Solution personnalisée', hint: 'Un besoin propre à votre métier' },
]

export const SIZE_OPTIONS: QuoteOption<CompanySize>[] = [
  { value: 'independant', label: 'Indépendant', hint: '1 personne' },
  { value: 'petite', label: 'Petite entreprise', hint: '2 à 10 personnes' },
  { value: 'pme', label: 'PME', hint: '11 à 250 personnes' },
  { value: 'entreprise', label: 'Entreprise', hint: 'Plus de 250 personnes' },
]

export const DEADLINE_OPTIONS: QuoteOption<Deadline>[] = [
  { value: 'asap', label: 'Dès que possible' },
  { value: 'un-a-trois-mois', label: '1 à 3 mois' },
  { value: 'trois-a-six-mois', label: '3 à 6 mois' },
  { value: 'flexible', label: 'Flexible' },
]

export const BUDGET_OPTIONS: QuoteOption<Budget>[] = [
  { value: 'moins-de-2000', label: 'Moins de 2 000 €' },
  { value: '2000-a-5000', label: '2 000 € – 5 000 €' },
  { value: '5000-a-10000', label: '5 000 € – 10 000 €' },
  { value: '10000-a-25000', label: '10 000 € – 25 000 €' },
  { value: 'plus-de-25000', label: 'Plus de 25 000 €' },
  { value: 'non-precise', label: 'Je préfère ne pas préciser' },
]

/* ————————————————————— Moteur de règles local ————————————————————— */

interface TypeProfile {
  /** Fourchette indicative en euros, avant coefficient de taille. `null` = sur mesure. */
  range: [number, number] | null
  complexityBase: number
  features: string[]
  /** « un site web », « une application mobile »… */
  label: string
}

const TYPE_PROFILES: Record<SolutionType, TypeProfile> = {
  site: {
    range: [1500, 4500],
    complexityBase: 0,
    label: 'un site web',
    features: [
      'Pages de présentation et services',
      'Design responsive sur mesure',
      'Optimisation SEO',
      'Formulaire de contact',
    ],
  },
  webapp: {
    range: [4000, 12000],
    complexityBase: 1,
    label: 'une application web',
    features: [
      'Espace utilisateur sécurisé',
      'Gestion des données métier',
      'Tableaux de bord et reporting',
      'Rôles et permissions',
    ],
  },
  mobile: {
    range: [6000, 18000],
    complexityBase: 1,
    label: 'une application mobile',
    features: [
      'Application iOS et Android',
      'Comptes utilisateurs',
      'Notifications push',
      'Publication sur les stores',
    ],
  },
  crm: {
    range: [3000, 10000],
    complexityBase: 1,
    label: 'un CRM',
    features: [
      'Fiches contacts et entreprises',
      'Suivi des opportunités',
      'Historique des échanges',
      'Rapports de vente',
    ],
  },
  erp: {
    range: [8000, 30000],
    complexityBase: 2,
    label: 'un ERP de gestion',
    features: [
      'Gestion des stocks',
      'Devis, commandes et facturation',
      'Suivi de production',
      'Tableaux de bord de pilotage',
    ],
  },
  ecommerce: {
    range: [2500, 8000],
    complexityBase: 1,
    label: 'une solution e-commerce',
    features: [
      'Catalogue produits',
      'Panier et paiement en ligne',
      'Gestion des commandes',
      'Suivi des stocks',
    ],
  },
  automation: {
    range: [1500, 6000],
    complexityBase: 1,
    label: 'une automatisation',
    features: [
      'Connecteurs entre vos outils',
      'Flux de travail configurables',
      'Déclencheurs et planifications',
      'Alertes par e-mail',
    ],
  },
  ai: {
    range: [5000, 20000],
    complexityBase: 2,
    label: 'une solution d’intelligence artificielle',
    features: [
      'Assistant conversationnel',
      'Analyse prédictive',
      'Extraction de données',
      'Automatisation des réponses',
    ],
  },
  custom: {
    range: null,
    complexityBase: 1,
    label: 'une solution personnalisée',
    features: [
      'Analyse de votre besoin spécifique',
      'Spécifications sur mesure',
      'Prototype rapide',
      'Intégration à vos outils existants',
    ],
  },
}

const SIZE_FACTORS: Record<CompanySize, number> = {
  independant: 0.75,
  petite: 0.9,
  pme: 1,
  entreprise: 1.35,
}

const SIZE_LABELS: Record<CompanySize, string> = {
  independant: 'un indépendant',
  petite: 'une petite entreprise',
  pme: 'une PME',
  entreprise: 'une entreprise',
}

const DEADLINE_LABELS: Record<Deadline, string> = {
  asap: 'dès que possible',
  'un-a-trois-mois': 'de 1 à 3 mois',
  'trois-a-six-mois': 'de 3 à 6 mois',
  flexible: 'flexible',
}

/** Plafond budgétaire exprimé en euros, `null` = aucune contrainte. */
const BUDGET_CAPS: Record<Budget, number | null> = {
  'moins-de-2000': 2000,
  '2000-a-5000': 5000,
  '5000-a-10000': 10000,
  '10000-a-25000': 25000,
  'plus-de-25000': null,
  'non-precise': null,
}

function formatEuros(value: number): string {
  const rounded = Math.round(value / 100) * 100
  return `${rounded.toLocaleString('fr-FR')} €`
}

/**
 * Estimation préliminaire d'un projet, construite à partir des réponses
 * du visiteur. Déterministe : deux fois le même formulaire donnent le
 * même résultat. La description est conservée pour le futur appel IA.
 */
export async function generateQuote(input: QuoteInput): Promise<QuoteResult> {
  const profile = TYPE_PROFILES[input.type]
  const factor = SIZE_FACTORS[input.size]
  const cap = BUDGET_CAPS[input.budget]

  /* Complexité : base du type + taille de l'entreprise + urgence. */
  const complexityScore =
    profile.complexityBase + (input.size === 'entreprise' ? 1 : 0) + (input.deadline === 'asap' ? 1 : 0)
  const complexity: Complexity =
    complexityScore <= 1 ? 'Simple' : complexityScore <= 3 ? 'Modérée' : 'Élevée'

  /* Fourchette indicative, ajustée à l'enveloppe si elle est renseignée. */
  let budgetNote = ''
  let estimated_range: string
  if (profile.range === null) {
    estimated_range = 'Sur mesure — à définir ensemble'
  } else {
    const min = Math.round((profile.range[0] * factor) / 100) * 100
    const max = Math.round((profile.range[1] * factor) / 100) * 100
    if (cap !== null && cap < min) {
      budgetNote =
        ' Votre enveloppe nécessitera probablement un découpage en phases — nous en discuterons ensemble.'
      estimated_range = `${formatEuros(min)} – ${formatEuros(max)}`
    } else if (cap !== null && cap < max) {
      budgetNote = ' L’estimation a été ajustée à votre enveloppe budgétaire.'
      estimated_range = `${formatEuros(min)} – ${formatEuros(cap)}`
    } else {
      estimated_range = `${formatEuros(min)} – ${formatEuros(max)}`
    }
  }

  /* Délai estimatif, dérivé du choix du visiteur et de la complexité. */
  const estimated_timeline =
    input.deadline === 'flexible'
      ? 'À définir ensemble'
      : input.deadline === 'asap' && complexity === 'Élevée'
        ? '6 à 10 semaines'
        : input.deadline === 'asap'
          ? '4 à 8 semaines'
          : input.deadline === 'un-a-trois-mois'
            ? '2 à 4 mois'
            : '4 à 7 mois'

  const next_steps =
    complexity === 'Élevée'
      ? [
          'Réserver un créneau pour préciser le périmètre avec notre équipe',
          'Recevoir un devis détaillé et un planning indicatif',
          'Découper le projet en phases concrètes et mesurables',
        ]
      : [
          'Réserver un créneau pour préciser le périmètre avec notre équipe',
          'Recevoir un devis détaillé et un planning indicatif',
          'Valider ensemble les priorités de la première version',
        ]

  return {
    summary: `Votre besoin porte sur ${profile.label}, pensé pour ${SIZE_LABELS[input.size]}, avec un délai ${DEADLINE_LABELS[input.deadline]}.${budgetNote}`,
    recommended_features: profile.features,
    complexity,
    estimated_range,
    estimated_timeline,
    next_steps,
  }
}
