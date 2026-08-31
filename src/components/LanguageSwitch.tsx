import { useLang, useT } from '../i18n/LanguageContext'
import type { Locale } from '../i18n/translations'

const LOCALES: Locale[] = ['fr', 'en']

/**
 * Sélecteur de langue FR / EN : pilule à deux positions avec indicateur
 * coulissant. Le contenu entier du site change instantanément.
 */
export default function LanguageSwitch() {
  const { lang, setLang } = useLang()
  const t = useT()

  return (
    <div
      role="group"
      aria-label={t.common.language}
      className="relative flex items-center rounded-full border border-line bg-surface p-[3px]"
    >
      {/* Indicateur coulissant */}
      <span
        aria-hidden="true"
        className={`absolute bottom-[3px] left-[3px] top-[3px] w-[calc(50%-3px)] rounded-full bg-navy-900 transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          lang === 'en' ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      {LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => setLang(locale)}
          aria-pressed={lang === locale}
          className={`relative z-10 rounded-full px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.08em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-500 ${
            lang === locale ? 'text-white' : 'text-navy-900/55 hover:text-navy-900'
          }`}
        >
          {locale}
        </button>
      ))}
    </div>
  )
}
