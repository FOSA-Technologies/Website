import { Diamond } from './SectionHeading'

/**
 * Mockup du produit FOSA, entièrement construit en HTML/CSS.
 * Container queries (seuils Tailwind v4 : @lg = 512px, @2xl = 672px) :
 * la composition s'adapte à sa propre largeur, jamais au viewport.
 * Hauteurs fixes par palier + rangée graphique/tableau en flex-1 :
 * aucun débordement possible, ratios réalistes garantis.
 */

const SIDEBAR_ITEMS = ["Vue d'ensemble", 'Ventes', 'Clients', 'Stocks', 'Analyse'] as const

const KPIS = [
  { label: 'Revenus', value: '€ 48 250', delta: '+12,4 %' },
  { label: 'Commandes', value: '1 284', delta: '+8,1 %' },
  { label: 'Nouveaux clients', value: '342', delta: '+5,6 %' },
] as const

/** Hauteurs des barres du graphique, en % de la zone disponible. */
const CHART_BARS = [38, 55, 46, 68, 58, 78, 64, 88] as const
/** Index des barres mises en avant en orange. */
const HIGHLIGHTED_BARS = new Set<number>([3, 5, 7])

const TABLE_ROWS = [
  { status: 'Payée', statusClass: 'bg-fosa-50 text-fosa-700' },
  { status: 'En cours', statusClass: 'bg-surface text-[#8a93a3]' },
  { status: 'Livrée', statusClass: 'bg-navy-900/[0.06] text-navy-900' },
] as const

const PHONE_BARS = [45, 70, 55, 85, 65, 95] as const

function ArrowUpIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="size-2.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d="M6 10V2.5M2.8 5.5 6 2.5l3.2 3" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d="M11 6.5a4 4 0 0 0-8 0v3l-1.5 2.5h11L11 9.5zM5.8 12h2.4" />
    </svg>
  )
}

export default function DashboardMockup({ className = '' }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Aperçu du tableau de bord FOSA sur ordinateur et mobile : revenus, commandes, activité et gestion des clients"
      className={`relative pb-12 pr-4 @container sm:pr-8 ${className}`}
    >
      {/* ——— Cadre navigateur + dashboard ——— */}
      <div className="h-[320px] overflow-hidden rounded-2xl border border-line bg-white shadow-soft @lg:h-[430px] @2xl:h-[520px]">
        {/* Barre du navigateur */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#e0e4ea]" />
            <span className="size-2.5 rounded-full bg-[#e0e4ea]" />
            <span className="size-2.5 rounded-full bg-fosa-300" />
          </span>
          <span className="mx-auto flex min-w-0 items-center gap-2 rounded-lg bg-surface px-4 py-1.5">
            <Diamond className="size-1.5 shrink-0 text-fosa-500" />
            <span className="truncate text-[11px] font-medium text-[#7a8494]">app.fosa.tech</span>
          </span>
          <span className="w-12 shrink-0" aria-hidden="true" />
        </div>

        <div className="flex h-[calc(100%-45px)]">
          {/* Sidebar navy (seulement pour les grandes largeurs de composant) */}
          <div className="hidden w-44 shrink-0 flex-col justify-between bg-navy-900 p-4 @2xl:flex">
            <div>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/fosa-logo.webp"
                  alt=""
                  width={957}
                  height={1018}
                  className="h-6 w-auto select-none"
                  loading="lazy"
                  draggable={false}
                />
                <span className="text-[13px] font-extrabold tracking-tight text-white">FOSA</span>
              </div>
              <ul className="mt-6 space-y-1">
                {SIDEBAR_ITEMS.map((label, i) => (
                  <li
                    key={label}
                    className={`flex items-center gap-2.5 truncate rounded-lg px-3 py-2 text-[12px] font-medium ${
                      i === 0 ? 'bg-white/[0.06] text-white' : 'text-white/50'
                    }`}
                  >
                    <Diamond
                      className={`size-1.5 shrink-0 ${i === 0 ? 'text-fosa-400' : 'text-white/25'}`}
                    />
                    <span className="truncate">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.05] p-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-fosa-500">
                <Diamond className="size-2 text-white" />
              </span>
              <span className="min-w-0 space-y-1.5">
                <span className="block h-1.5 w-16 rounded-full bg-white/25" />
                <span className="block h-1.5 w-10 rounded-full bg-white/15" />
              </span>
            </div>
          </div>

          {/* Zone de contenu */}
          <div className="flex min-w-0 flex-1 flex-col bg-surface p-3 @2xl:p-5">
            {/* En-tête */}
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-[13.5px] font-semibold text-navy-900">Tableau de bord</p>
              <div className="flex shrink-0 items-center gap-2.5">
                <span className="hidden items-center gap-2 rounded-lg border border-line bg-white px-3 py-1.5 text-[11px] text-[#9aa3b2] @lg:flex">
                  <svg
                    viewBox="0 0 12 12"
                    className="size-3 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.4}
                    strokeLinecap="square"
                    aria-hidden="true"
                  >
                    <circle cx="5.5" cy="5.5" r="3.5" />
                    <path d="m8.5 8.5 2 2" />
                  </svg>
                  <span className="truncate">Rechercher…</span>
                </span>
                <span
                  className="relative flex size-7 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-[#7a8494]"
                  aria-hidden="true"
                >
                  <BellIcon />
                  <span className="absolute right-1.5 top-1.5 size-1.5 rotate-45 bg-fosa-500" />
                </span>
                <span className="size-7 shrink-0 rounded-full bg-navy-800" aria-hidden="true" />
              </div>
            </div>

            {/* KPIs */}
            <div className="mt-3 grid grid-cols-3 gap-3 @2xl:mt-4">
              {KPIS.map((kpi) => (
                <div key={kpi.label} className="min-w-0 rounded-lg border border-line bg-white p-2.5 @2xl:p-3">
                  <p className="truncate text-[10px] font-semibold uppercase tracking-[0.07em] text-[#8a93a3]">
                    {kpi.label}
                  </p>
                  <p className="mt-1 truncate text-[13px] font-bold tracking-tight text-navy-900 @2xl:mt-1.5 @2xl:text-[16px]">
                    {kpi.value}
                  </p>
                  <p className="mt-1 inline-flex max-w-full items-center gap-1 truncate rounded bg-fosa-50 px-1.5 py-0.5 text-[10px] font-semibold text-fosa-700 @2xl:mt-1.5">
                    <ArrowUpIcon />
                    <span className="truncate">{kpi.delta}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Graphique + dernières commandes (côte à côte) */}
            <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-3 @lg:grid-cols-3 @2xl:mt-4">
              <div className="flex min-h-0 flex-col rounded-lg border border-line bg-white p-3.5 @lg:col-span-2">
                <div className="flex shrink-0 items-center justify-between gap-2">
                  <p className="truncate text-[12px] font-semibold text-navy-900">Activité</p>
                  <span className="shrink-0 rounded-md bg-surface px-2 py-1 text-[10px] font-medium text-[#8a93a3]">
                    12 mois
                  </span>
                </div>
                <div className="mt-2.5 flex min-h-0 flex-1 items-end gap-1.5 border-b border-line @2xl:mt-3 @2xl:gap-2">
                  {CHART_BARS.map((height, i) => {
                    const highlighted = HIGHLIGHTED_BARS.has(i)
                    return (
                      <span key={i} className="relative flex h-full min-h-0 flex-1 items-end">
                        {i === 7 ? (
                          <span className="absolute -top-3 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-navy-900" />
                        ) : null}
                        <span
                          className={`w-full rounded-[2px] ${highlighted ? 'bg-fosa-500' : 'bg-fosa-100'}`}
                          style={{ height: `${height}%` }}
                        />
                      </span>
                    )
                  })}
                </div>
              </div>

              <div className="hidden min-h-0 flex-col rounded-lg border border-line bg-white p-3.5 @lg:flex">
                <div className="flex shrink-0 items-center justify-between">
                  <p className="truncate text-[12px] font-semibold text-navy-900">Dernières commandes</p>
                  <span className="shrink-0 text-[11px] font-semibold text-fosa-700">Tout voir →</span>
                </div>
                <div className="mt-2 min-h-0 flex-1">
                  {TABLE_ROWS.map((row, i) => (
                    <div
                      key={row.status}
                      className={`flex items-center gap-2.5 py-1.5 ${i > 0 ? 'border-t border-line' : ''}`}
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-fosa-50">
                        <Diamond className="size-1.5 text-fosa-500" />
                      </span>
                      <span className="min-w-0 flex-1 space-y-1">
                        <span className="block h-1.5 w-4/5 rounded-full bg-[#dde2ea]" />
                        <span className="block h-1.5 w-3/5 rounded-full bg-[#e9edf2]" />
                      </span>
                      <span
                        className={`hidden shrink-0 truncate rounded px-1.5 py-0.5 text-[10px] font-semibold @3xl:inline-flex ${row.statusClass}`}
                      >
                        {row.status}
                      </span>
                      <span className="block h-1.5 w-8 shrink-0 rounded-full bg-navy-900/70" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ——— Téléphone superposé ——— */}
      <div
        className="absolute bottom-0 right-0 w-[122px] rounded-[24px] bg-navy-900 p-1.5 shadow-soft ring-1 ring-black/10 @lg:w-[150px]"
        aria-hidden="true"
      >
        <div className="overflow-hidden rounded-[19px]">
          <div className="flex items-center gap-2 bg-fosa-500 px-3 py-2.5">
            <Diamond className="size-2 shrink-0 text-white" />
            <span className="h-1.5 w-12 rounded-full bg-white/85" />
          </div>
          <div className="bg-navy-900 px-2.5 pb-2.5 pt-2">
            <div className="rounded-lg bg-white/[0.07] p-2">
              <span className="block h-1 w-8 rounded-full bg-white/25" />
              <span className="mt-1.5 block h-2 w-14 rounded-full bg-white/70" />
              <span className="mt-1.5 flex items-center gap-1.5">
                <Diamond className="size-1 text-fosa-400" />
                <span className="block h-1 w-6 rounded-full bg-white/20" />
              </span>
            </div>
            <div className="mt-2 flex h-14 items-end gap-1 border-b border-white/10 @lg:h-16">
              {PHONE_BARS.map((height, i) => (
                <span
                  key={i}
                  className={`w-full rounded-[2px] ${i === 3 || i === 5 ? 'bg-fosa-500' : 'bg-white/10'}`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="mt-2.5 flex justify-center gap-2">
              <span className="size-1.5 rotate-45 bg-fosa-500" />
              <span className="size-1.5 rotate-45 bg-white/20" />
              <span className="size-1.5 rotate-45 bg-white/20" />
            </div>
            <span className="mx-auto mt-2 block h-1 w-10 rounded-full bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  )
}
