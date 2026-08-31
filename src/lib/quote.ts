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
 *
 * Tout le texte lisible (libellés, fonctionnalités, messages) vit dans
 * i18n/translations.ts et est injecté via `labels` : le moteur reste
 * indépendant de la langue.
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

/** Textes localisés injectés par l'appelant (translations.quote). */
export interface QuoteLabels {
  typeLabels: Record<SolutionType, string>
  sizeLabels: Record<CompanySize, string>
  deadlineLabels: Record<Deadline, string>
  featuresByType: Record<SolutionType, string[]>
  rangeCustom: string
  timelineFlexible: string
  timelineAsap: string
  timelineAsapComplex: string
  timeline1to3: string
  timeline3to6: string
  budgetPhasedNote: string
  budgetAdjustedNote: string
  summaryTemplate: (typeLabel: string, sizeLabel: string, deadlineLabel: string) => string
  nextStepsStandard: string[]
  nextStepsComplex: string[]
}

/* ————————————————————— Moteur de règles local ————————————————————— */

interface TypeProfile {
  /** Fourchette indicative en euros, avant coefficient de taille. `null` = sur mesure. */
  range: [number, number] | null
  complexityBase: number
}

const TYPE_PROFILES: Record<SolutionType, TypeProfile> = {
  site: { range: [1500, 4500], complexityBase: 0 },
  webapp: { range: [4000, 12000], complexityBase: 1 },
  mobile: { range: [6000, 18000], complexityBase: 1 },
  crm: { range: [3000, 10000], complexityBase: 1 },
  erp: { range: [8000, 30000], complexityBase: 2 },
  ecommerce: { range: [2500, 8000], complexityBase: 1 },
  automation: { range: [1500, 6000], complexityBase: 1 },
  ai: { range: [5000, 20000], complexityBase: 2 },
  custom: { range: null, complexityBase: 1 },
}

const SIZE_FACTORS: Record<CompanySize, number> = {
  independant: 0.75,
  petite: 0.9,
  pme: 1,
  entreprise: 1.35,
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
export async function generateQuote(input: QuoteInput, labels: QuoteLabels): Promise<QuoteResult> {
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
    estimated_range = labels.rangeCustom
  } else {
    const min = Math.round((profile.range[0] * factor) / 100) * 100
    const max = Math.round((profile.range[1] * factor) / 100) * 100
    if (cap !== null && cap < min) {
      budgetNote = labels.budgetPhasedNote
      estimated_range = `${formatEuros(min)} – ${formatEuros(max)}`
    } else if (cap !== null && cap < max) {
      budgetNote = labels.budgetAdjustedNote
      estimated_range = `${formatEuros(min)} – ${formatEuros(cap)}`
    } else {
      estimated_range = `${formatEuros(min)} – ${formatEuros(max)}`
    }
  }

  /* Délai estimatif, dérivé du choix du visiteur et de la complexité. */
  const estimated_timeline =
    input.deadline === 'flexible'
      ? labels.timelineFlexible
      : input.deadline === 'asap' && complexity === 'Élevée'
        ? labels.timelineAsapComplex
        : input.deadline === 'asap'
          ? labels.timelineAsap
          : input.deadline === 'un-a-trois-mois'
            ? labels.timeline1to3
            : labels.timeline3to6

  const next_steps = complexity === 'Élevée' ? labels.nextStepsComplex : labels.nextStepsStandard

  return {
    summary: labels.summaryTemplate(
      labels.typeLabels[input.type],
      labels.sizeLabels[input.size],
      labels.deadlineLabels[input.deadline],
    ) + budgetNote,
    recommended_features: labels.featuresByType[input.type],
    complexity,
    estimated_range,
    estimated_timeline,
    next_steps,
  }
}
