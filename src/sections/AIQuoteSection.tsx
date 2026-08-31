import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import SectionHeading, { Diamond } from '../components/SectionHeading'
import { useT } from '../i18n/LanguageContext'
import type { QuoteOptionDict } from '../i18n/translations'
import {
  generateQuote,
  type Budget,
  type CompanySize,
  type Deadline,
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

const DESCRIPTION_MIN_LENGTH = 20

function validateStep(step: number, draft: Draft, minLength: number): string | null {
  switch (step) {
    case 0:
      return draft.type ? null : 'type'
    case 1:
      return draft.description.trim().length >= minLength ? null : 'description'
    case 2:
      return draft.size ? null : 'size'
    case 3:
      return draft.deadline ? null : 'deadline'
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
  option: QuoteOptionDict
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
  const t = useT()
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center gap-5 text-center">
      <span
        className="flex size-14 items-center justify-center rounded-full border-2 border-fosa-500/25 border-t-fosa-500 animate-spin motion-reduce:animate-none"
        role="status"
        aria-label={t.quote.loading.title}
      >
        <Diamond className="size-3 text-fosa-500" />
      </span>
      <p className="text-[15.5px] font-semibold text-navy-900" aria-live="polite">
        {t.quote.loading.steps[Math.min(step, t.quote.loading.steps.length - 1)]}
      </p>
      <p className="text-[13.5px] text-ink">{t.quote.loading.subtitle}</p>
    </div>
  )
}

function ErrorView({ onRetry }: { onRetry: () => void }) {
  const t = useT()
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center gap-4 text-center">
      <Diamond className="size-2.5 text-fosa-500" />
      <p className="text-[15.5px] font-semibold text-navy-900">{t.quote.error.title}</p>
      <p className="max-w-sm text-[14px] leading-relaxed text-ink">{t.quote.error.text}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-[10px] bg-fosa-500 px-6 py-3 text-[15px] font-semibold text-navy-900 transition-colors duration-200 hover:bg-fosa-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-500"
      >
        {t.quote.error.retry}
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
  const t = useT()
  const headingRef = useRef<HTMLHeadingElement>(null)

  /* Le focus est déplacé sur le résultat pour les lecteurs d'écran. */
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const level = COMPLEXITY_LEVELS[result.complexity]
  const complexityLabel =
    result.complexity === 'Simple'
      ? t.quote.result.complexityValues.simple
      : result.complexity === 'Modérée'
        ? t.quote.result.complexityValues.moderate
        : t.quote.result.complexityValues.high

  return (
    <div>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-bold tracking-[-0.02em] text-navy-900 focus:outline-none"
      >
        {t.quote.result.title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink">{result.summary}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fosa-700">
            {t.quote.result.complexityLabel}
          </p>
          <p className="mt-2 text-[15px] font-semibold text-navy-900">{complexityLabel}</p>
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
            {t.quote.result.estimateLabel}
          </p>
          <p className="mt-2 text-[17px] font-bold text-navy-900">{result.estimated_range}</p>
          <p className="mt-3 text-[12.5px] leading-snug text-ink">{t.quote.result.estimateNote}</p>
        </div>

        <div className="rounded-xl border border-line bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fosa-700">
            {t.quote.result.timelineLabel}
          </p>
          <p className="mt-2 text-[15px] font-semibold text-navy-900">
            {result.estimated_timeline}
          </p>
          <p className="mt-3 text-[12.5px] leading-snug text-ink">{t.quote.result.timelineNote}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-white p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fosa-700">
          {t.quote.result.featuresLabel}
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
          {t.quote.result.nextStepsLabel}
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
        {t.quote.result.legalNote}
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button href="#rendez-vous" variant="primary" size="lg">
          {t.quote.result.cta}
        </Button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#d4dae3] bg-white px-7 py-3.5 text-base font-semibold text-navy-900 transition-colors duration-200 hover:border-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-500"
        >
          {t.quote.result.restart}
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
  const t = useT()
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<Draft>(INITIAL_DRAFT)
  const [status, setStatus] = useState<Status>('form')
  const [errorKey, setErrorKey] = useState<string | null>(null)
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState<QuoteResult | null>(null)

  /* Progression des messages d'analyse pendant le chargement. */
  useEffect(() => {
    if (status !== 'loading') return
    const id = window.setInterval(
      () =>
        setLoadingStep((current) =>
          Math.min(current + 1, Math.max(0, t.quote.loading.steps.length - 1)),
        ),
      850,
    )
    return () => window.clearInterval(id)
  }, [status, t.quote.loading.steps.length])

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
      const quote = await generateQuote(input, t.quote)
      setResult(quote)
      setStatus('result')
    } catch {
      setStatus('error')
    }
  }

  const handleNext = () => {
    const invalid = validateStep(step, draft, DESCRIPTION_MIN_LENGTH)
    if (invalid) {
      const messages = {
        type: t.quote.validation.type,
        description: t.quote.validation.description.replace('{min}', String(DESCRIPTION_MIN_LENGTH)),
        size: t.quote.validation.size,
        deadline: t.quote.validation.deadline,
      } as const
      setErrorKey(messages[invalid as keyof typeof messages])
      return
    }
    setErrorKey(null)
    if (step < t.quote.steps.length - 1) {
      setStep((current) => current + 1)
    } else {
      void runAnalysis()
    }
  }

  const handleBack = () => {
    setErrorKey(null)
    setStep((current) => Math.max(0, current - 1))
  }

  const handleRestart = () => {
    setDraft(INITIAL_DRAFT)
    setStep(0)
    setErrorKey(null)
    setResult(null)
    setStatus('form')
  }

  const progress = status === 'form' ? ((step + 1) / t.quote.steps.length) * 100 : 100
  const stepLabel =
    status === 'form'
      ? t.quote.stepCounter
          .replace('{current}', String(step + 1))
          .replace('{total}', String(t.quote.steps.length))
      : t.quote.loading.title

  return (
    <section id="devis" className="bg-surface py-20 lg:py-28" aria-labelledby="quote-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <SectionHeading
          overline={t.quote.overline}
          title={t.quote.title}
          subtitle={t.quote.subtitle}
        />

        <Reveal delay={120} className="mx-auto mt-14 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            {/* En-tête du panneau : identité + progression */}
            <div className="border-b border-line bg-surface/60 px-6 py-4 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-fosa-700">
                  <Diamond />
                  {t.quote.panelLabel}
                </p>
                <p className="text-[13px] font-medium text-ink">{stepLabel}</p>
              </div>
              <div
                className="mt-3 h-1 overflow-hidden rounded-full bg-line"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={t.quote.steps.length}
                aria-valuenow={status === 'form' ? step + 1 : t.quote.steps.length}
                aria-label={t.quote.progressAria}
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
                    {t.quote.steps[step].question}
                  </h3>

                  {step === 0 ? <p className="mt-1.5 text-[13.5px] text-ink">{t.quote.hints.type}</p> : null}
                  {step === 1 ? (
                    <p className="mt-1.5 text-[13.5px] text-ink">{t.quote.hints.description}</p>
                  ) : null}
                  {step === 4 ? <p className="mt-1.5 text-[13.5px] text-ink">{t.quote.hints.budget}</p> : null}

                  <div className="mt-6">
                    {step === 0 ? (
                      <fieldset>
                        <legend className="sr-only">{t.quote.steps[0].question}</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {t.quote.options.solutions.map((option) => (
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
                          {t.quote.steps[1].question}
                        </label>
                        <textarea
                          id="quote-description"
                          value={draft.description}
                          onChange={(event) =>
                            setDraft((current) => ({ ...current, description: event.target.value }))
                          }
                          rows={6}
                          maxLength={600}
                          placeholder={t.quote.descriptionPlaceholder}
                          className="w-full resize-y rounded-xl border border-line bg-white px-4 py-3.5 text-[15px] leading-relaxed text-navy-900 placeholder:text-[#9aa3b2] transition-colors duration-200 focus:border-fosa-500 focus:outline-none focus:ring-2 focus:ring-fosa-500/25"
                        />
                        <p className="mt-1.5 text-right text-[12.5px] text-ink">
                          {t.quote.descriptionCounter.replace('{count}', String(draft.description.length))}
                        </p>
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <fieldset>
                        <legend className="sr-only">{t.quote.steps[2].question}</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {t.quote.options.sizes.map((option) => (
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
                        <legend className="sr-only">{t.quote.steps[3].question}</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {t.quote.options.deadlines.map((option) => (
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
                        <legend className="sr-only">{t.quote.steps[4].question}</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {t.quote.options.budgets.map((option) => (
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

                  {errorKey ? (
                    <p role="alert" className="mt-5 text-[13.5px] font-medium text-[#b42318]">
                      {errorKey}
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
                      {t.quote.buttons.back}
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-fosa-500 px-6 py-3 text-[15px] font-semibold text-navy-900 transition-colors duration-200 hover:bg-fosa-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-500"
                    >
                      {step === t.quote.steps.length - 1 ? t.quote.buttons.submit : t.quote.buttons.next}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-xl text-center text-[13px] leading-relaxed text-ink">
            {t.quote.undernote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
