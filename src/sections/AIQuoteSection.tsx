import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import SectionHeading, { Diamond } from '../components/SectionHeading'
import {
  BUDGET_OPTIONS,
  DEADLINE_OPTIONS,
  QUOTE_LEGAL_NOTE,
  SIZE_OPTIONS,
  SOLUTION_OPTIONS,
  generateQuote,
  type Budget,
  type CompanySize,
  type Deadline,
  type QuoteOption,
  type QuoteResult,
  type SolutionType,
} from '../lib/quote'

/* ————————————————————— État local du formulaire ————————————————————— */

type Status = 'form' | 'loading' | 'error' | 'result'

interface Draft {
  type: SolutionType | null
  description: string
  size: CompanySize | null
  deadline: Deadline | null
  budget: Budget
}

const INITIAL_DRAFT: Draft = {
  type: null,
  description: '',
  size: null,
  deadline: null,
  budget: 'non-precise',
}

const STEPS = [
  { name: 'Solution', question: 'Quel type de solution recherchez-vous ?' },
  { name: 'Projet', question: 'Parlez-nous de votre projet' },
  { name: 'Entreprise', question: 'Quelle est la taille de votre entreprise ?' },
  { name: 'Délai', question: 'Quel est votre délai ?' },
  { name: 'Budget', question: 'Quel est votre budget approximatif ?' },
] as const

const ANALYSIS_STEPS = [
  'Analyse de votre besoin…',
  'Identification des fonctionnalités…',
  'Évaluation de la complexité…',
  'Préparation de votre estimation…',
] as const

const DESCRIPTION_MIN_LENGTH = 20

function validateStep(step: number, draft: Draft): string | null {
  switch (step) {
    case 0:
      return draft.type ? null : 'Sélectionnez une solution pour continuer.'
    case 1:
      return draft.description.trim().length >= DESCRIPTION_MIN_LENGTH
        ? null
        : `Décrivez votre besoin en quelques phrases (${DESCRIPTION_MIN_LENGTH} caractères minimum).`
    case 2:
      return draft.size ? null : 'Sélectionnez la taille de votre entreprise.'
    case 3:
      return draft.deadline ? null : 'Sélectionnez votre délai.'
    default:
      return null
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/* ————————————————————— Éléments d'interface ————————————————————— */

function OptionCard({
  name,
  option,
  checked,
  onChange,
}: {
  name: string
  option: QuoteOption<string>
  checked: boolean
  onChange: () => void
}) {
  return (
    <label
      className={`flex cursor-pointer flex-col gap-1 rounded-xl border bg-white p-4 transition-all duration-200 has-[:checked]:border-fosa-500 has-[:checked]:bg-fosa-50/60 hover:border-fosa-300 hover:shadow-card has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-fosa-500 ${
        checked ? 'border-fosa-500 bg-fosa-50/60' : 'border-line'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={option.value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="flex items-center justify-between gap-3">
        <span className="text-[15px] font-semibold text-navy-900">{option.label}</span>
        <span
          className={`flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-200 ${
            checked ? 'border-fosa-500 bg-fosa-500' : 'border-[#c6cdd8] bg-white'
          }`}
          aria-hidden="true"
        >
          {checked ? (
            <svg
              viewBox="0 0 10 10"
              className="size-2.5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M2 5.4 4.2 7.4 8 3.2" />
            </svg>
          ) : null}
        </span>
      </span>
      {option.hint ? <span className="text-[13px] leading-snug text-ink">{option.hint}</span> : null}
    </label>
  )
}

const BackIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="square"
    strokeLinejoin="miter"
    aria-hidden="true"
  >
    <path d="M10 3.5 5.5 8l4.5 4.5" />
  </svg>
)

/* ————————————————————— Vues : chargement, erreur, résultat ————————————————————— */

function LoadingView({ step }: { step: number }) {
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center gap-5 text-center">
      <span
        className="flex size-14 items-center justify-center rounded-full border-2 border-fosa-500/25 border-t-fosa-500 animate-spin motion-reduce:animate-none"
        role="status"
        aria-label="Analyse en cours"
      >
        <Diamond className="size-3 text-fosa-500" />
      </span>
      <p className="text-[15.5px] font-semibold text-navy-900" aria-live="polite">
        {ANALYSIS_STEPS[Math.min(step, ANALYSIS_STEPS.length - 1)]}
      </p>
      <p className="text-[13.5px] text-ink">Quelques secondes suffisent.</p>
    </div>
  )
}

function ErrorView({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center gap-4 text-center">
      <Diamond className="size-2.5 text-fosa-500" />
      <p className="text-[15.5px] font-semibold text-navy-900">
        Une erreur est survenue pendant l’analyse.
      </p>
      <p className="max-w-sm text-[14px] leading-relaxed text-ink">
        Vos réponses ont été conservées. Réessayez dans un instant.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-[10px] bg-fosa-500 px-6 py-3 text-[15px] font-semibold text-navy-900 transition-colors duration-200 hover:bg-fosa-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-500"
      >
        Réessayer
      </button>
    </div>
  )
}

const COMPLEXITY_LEVELS: Record<QuoteResult['complexity'], number> = {
  Simple: 1,
  Modérée: 2,
  Élevée: 3,
}

function ResultView({ result, onRestart }: { result: QuoteResult; onRestart: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  /* Le focus est déplacé sur le résultat pour les lecteurs d'écran. */
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const level = COMPLEXITY_LEVELS[result.complexity]

  return (
    <div>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-bold tracking-[-0.02em] text-navy-900 focus:outline-none"
      >
        Analyse de votre projet
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink">{result.summary}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fosa-700">
            Complexité
          </p>
          <p className="mt-2 text-[15px] font-semibold text-navy-900">{result.complexity}</p>
          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {[1, 2, 3].map((segment) => (
              <span
                key={segment}
                className={`h-1.5 w-8 rounded-[2px] ${segment <= level ? 'bg-fosa-500' : 'bg-line'}`}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-fosa-200 bg-fosa-50/60 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fosa-700">
            Estimation indicative
          </p>
          <p className="mt-2 text-[17px] font-bold text-navy-900">{result.estimated_range}</p>
          <p className="mt-3 text-[12.5px] leading-snug text-ink">Avant analyse détaillée.</p>
        </div>

        <div className="rounded-xl border border-line bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fosa-700">
            Délai estimatif
          </p>
          <p className="mt-2 text-[15px] font-semibold text-navy-900">
            {result.estimated_timeline}
          </p>
          <p className="mt-3 text-[12.5px] leading-snug text-ink">Selon le périmètre retenu.</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-white p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fosa-700">
          Fonctionnalités recommandées
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {result.recommended_features.map((feature) => (
            <li
              key={feature}
              className="rounded-[6px] border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-navy-800"
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-white p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fosa-700">
          Prochaines étapes
        </p>
        <ol className="mt-3 flex flex-col gap-2.5">
          {result.next_steps.map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-[14.5px] text-navy-800">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[5px] bg-navy-900 text-[11px] font-bold text-white">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-4 flex items-start gap-2.5 rounded-lg border border-line bg-surface p-4 text-[13.5px] leading-relaxed text-ink">
        <Diamond className="mt-1 size-2 shrink-0 text-fosa-500" />
        {QUOTE_LEGAL_NOTE}
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button href="#rendez-vous" variant="primary" size="lg">
          Discuter de mon projet
        </Button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#d4dae3] bg-white px-7 py-3.5 text-base font-semibold text-navy-900 transition-colors duration-200 hover:border-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-500"
        >
          Recommencer
        </button>
      </div>
    </div>
  )
}

/* ————————————————————— Section ————————————————————— */

/**
 * Assistant d'estimation : formulaire SaaS en 5 étapes, résultat structuré.
 * L'estimation est indicative — jamais présentée comme un devis définitif.
 */
export default function AIQuoteSection() {
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<Draft>(INITIAL_DRAFT)
  const [status, setStatus] = useState<Status>('form')
  const [error, setError] = useState<string | null>(null)
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState<QuoteResult | null>(null)

  /* Progression des messages d'analyse pendant le chargement. */
  useEffect(() => {
    if (status !== 'loading') return
    const id = window.setInterval(
      () => setLoadingStep((current) => Math.min(current + 1, ANALYSIS_STEPS.length - 1)),
      850,
    )
    return () => window.clearInterval(id)
  }, [status])

  const runAnalysis = async () => {
    setStatus('loading')
    setLoadingStep(0)
    try {
      /* Rythme de lecture des étapes d'analyse, puis génération du résultat. */
      await delay(3400)
      const input = {
        type: draft.type!,
        description: draft.description,
        size: draft.size!,
        deadline: draft.deadline!,
        budget: draft.budget,
      }
      const quote = await generateQuote(input)
      setResult(quote)
      setStatus('result')
    } catch {
      setStatus('error')
    }
  }

  const handleNext = () => {
    const message = validateStep(step, draft)
    if (message) {
      setError(message)
      return
    }
    setError(null)
    if (step < STEPS.length - 1) {
      setStep((current) => current + 1)
    } else {
      void runAnalysis()
    }
  }

  const handleBack = () => {
    setError(null)
    setStep((current) => Math.max(0, current - 1))
  }

  const handleRestart = () => {
    setDraft(INITIAL_DRAFT)
    setStep(0)
    setError(null)
    setResult(null)
    setStatus('form')
  }

  const progress = status === 'form' ? ((step + 1) / STEPS.length) * 100 : 100
  const stepLabel = status === 'form' ? `Étape ${step + 1} sur ${STEPS.length}` : 'Analyse'

  return (
    <section id="devis" className="bg-surface py-20 lg:py-28" aria-labelledby="quote-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Devis intelligent"
          title="Estimez votre projet avec notre assistant."
          subtitle="Décrivez votre besoin en quelques étapes et obtenez une première estimation indicative en moins d’une minute."
        />

        <Reveal delay={120} className="mx-auto mt-14 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            {/* En-tête du panneau : identité + progression */}
            <div className="border-b border-line bg-surface/60 px-6 py-4 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-fosa-700">
                  <Diamond />
                  Assistant estimation
                </p>
                <p className="text-[13px] font-medium text-ink">{stepLabel}</p>
              </div>
              <div
                className="mt-3 h-1 overflow-hidden rounded-full bg-line"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={STEPS.length}
                aria-valuenow={status === 'form' ? step + 1 : STEPS.length}
                aria-label="Progression du formulaire"
              >
                <div
                  className="h-full rounded-full bg-fosa-500 transition-all duration-300 motion-reduce:transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Corps du panneau */}
            <div className="px-6 py-8 sm:px-8 sm:py-10">
              {status === 'loading' ? (
                <LoadingView step={loadingStep} />
              ) : status === 'error' ? (
                <ErrorView onRetry={() => void runAnalysis()} />
              ) : status === 'result' && result ? (
                <ResultView result={result} onRestart={handleRestart} />
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    handleNext()
                  }}
                >
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-navy-900 sm:text-[22px]">
                    {STEPS[step].question}
                  </h3>

                  {step === 0 ? (
                    <p className="mt-1.5 text-[13.5px] text-ink">
                      Choisissez l’option la plus proche de votre besoin.
                    </p>
                  ) : null}
                  {step === 1 ? (
                    <p className="mt-1.5 text-[13.5px] text-ink">
                      Quelques phrases suffisent : contexte, objectif, fonctionnalités attendues.
                    </p>
                  ) : null}
                  {step === 4 ? (
                    <p className="mt-1.5 text-[13.5px] text-ink">
                      Facultatif — cette réponse affine l’estimation, sans être obligatoire.
                    </p>
                  ) : null}

                  <div className="mt-6">
                    {step === 0 ? (
                      <fieldset>
                        <legend className="sr-only">{STEPS[0].question}</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {SOLUTION_OPTIONS.map((option) => (
                            <OptionCard
                              key={option.value}
                              name="quote-type"
                              option={option}
                              checked={draft.type === option.value}
                              onChange={() =>
                                setDraft((current) => ({ ...current, type: option.value as SolutionType }))
                              }
                            />
                          ))}
                        </div>
                      </fieldset>
                    ) : null}

                    {step === 1 ? (
                      <div>
                        <label htmlFor="quote-description" className="sr-only">
                          {STEPS[1].question}
                        </label>
                        <textarea
                          id="quote-description"
                          value={draft.description}
                          onChange={(event) =>
                            setDraft((current) => ({ ...current, description: event.target.value }))
                          }
                          rows={6}
                          maxLength={600}
                          placeholder="Ex. : nous sommes une PME de distribution et nous cherchons un outil pour suivre nos stocks, nos ventes et nos factures…"
                          className="w-full resize-y rounded-xl border border-line bg-white px-4 py-3.5 text-[15px] leading-relaxed text-navy-900 placeholder:text-[#9aa3b2] transition-colors duration-200 focus:border-fosa-500 focus:outline-none focus:ring-2 focus:ring-fosa-500/25"
                        />
                        <p className="mt-1.5 text-right text-[12.5px] text-ink">
                          {draft.description.length} / 600
                        </p>
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <fieldset>
                        <legend className="sr-only">{STEPS[2].question}</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {SIZE_OPTIONS.map((option) => (
                            <OptionCard
                              key={option.value}
                              name="quote-size"
                              option={option}
                              checked={draft.size === option.value}
                              onChange={() =>
                                setDraft((current) => ({ ...current, size: option.value as CompanySize }))
                              }
                            />
                          ))}
                        </div>
                      </fieldset>
                    ) : null}

                    {step === 3 ? (
                      <fieldset>
                        <legend className="sr-only">{STEPS[3].question}</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {DEADLINE_OPTIONS.map((option) => (
                            <OptionCard
                              key={option.value}
                              name="quote-deadline"
                              option={option}
                              checked={draft.deadline === option.value}
                              onChange={() =>
                                setDraft((current) => ({
                                  ...current,
                                  deadline: option.value as Deadline,
                                }))
                              }
                            />
                          ))}
                        </div>
                      </fieldset>
                    ) : null}

                    {step === 4 ? (
                      <fieldset>
                        <legend className="sr-only">{STEPS[4].question}</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {BUDGET_OPTIONS.map((option) => (
                            <OptionCard
                              key={option.value}
                              name="quote-budget"
                              option={option}
                              checked={draft.budget === option.value}
                              onChange={() =>
                                setDraft((current) => ({
                                  ...current,
                                  budget: option.value as Budget,
                                }))
                              }
                            />
                          ))}
                        </div>
                      </fieldset>
                    ) : null}
                  </div>

                  {error ? (
                    <p role="alert" className="mt-5 text-[13.5px] font-medium text-[#b42318]">
                      {error}
                    </p>
                  ) : null}

                  <div className="mt-8 flex items-center justify-between gap-3 border-t border-line/70 pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className={`inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#d4dae3] bg-white px-5 py-3 text-[15px] font-semibold text-navy-900 transition-colors duration-200 hover:border-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-500 ${
                        step === 0 ? 'invisible' : ''
                      }`}
                    >
                      <BackIcon />
                      Précédent
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-fosa-500 px-6 py-3 text-[15px] font-semibold text-navy-900 transition-colors duration-200 hover:bg-fosa-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-500"
                    >
                      {step === STEPS.length - 1 ? 'Obtenir mon estimation' : 'Continuer'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-xl text-center text-[13px] leading-relaxed text-ink">
            Assistant d’estimation préliminaire — il ne remplace pas un devis commercial détaillé,
            établi avec notre équipe.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
