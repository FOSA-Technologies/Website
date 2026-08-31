import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Dict, type Locale } from './translations'

const STORAGE_KEY = 'fosa-lang'
const LANG_PARAM = 'lang'

interface LanguageContextValue {
  lang: Locale
  setLang: (lang: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const PAGE_TITLES: Record<Locale, string> = {
  fr: 'FOSA — Solutions digitales pour PME | Digitalisez. Simplifiez. Propulsez.',
  en: 'FOSA — Digital solutions for SMBs | Digitize. Simplify. Propel.',
}

const PAGE_DESCRIPTIONS: Record<Locale, string> = {
  fr: "FOSA accompagne les PME dans leur transformation digitale : gestion d'entreprise, CRM, ventes & facturation, stocks, analyse, automatisation et intelligence artificielle. Découvrez nos produits SaaS, obtenez une estimation de projet en ligne et prenez rendez-vous avec notre équipe.",
  en: 'FOSA helps SMBs embrace digital transformation: business management, CRM, sales & invoicing, inventory, analytics, automation and AI. Discover our SaaS products, get an online project estimate and book a meeting with our team.',
}

/** Priorité : paramètre d'URL (?lang=) > préférence enregistrée > français par défaut. */
function readLangParam(): Locale | null {
  if (typeof window === 'undefined') return null
  const param = new URLSearchParams(window.location.search).get(LANG_PARAM)
  return param === 'fr' || param === 'en' ? param : null
}

function detectInitialLang(): Locale {
  const fromUrl = readLangParam()
  if (fromUrl) return fromUrl
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'fr' || stored === 'en') return stored
  } catch {
    /* localStorage indisponible : français par défaut. */
  }
  return 'fr'
}

/** Reflète la langue active dans l'URL (URL propre en français, ?lang=en en anglais). */
function syncUrl(lang: Locale): void {
  try {
    const url = new URL(window.location.href)
    if (lang === 'fr') url.searchParams.delete(LANG_PARAM)
    else url.searchParams.set(LANG_PARAM, lang)
    window.history.replaceState(null, '', url)
  } catch {
    /* L'URL reste inchangée : la langue fonctionne quand même. */
  }
}

/** Met à jour les métadonnées lisibles par les moteurs de recherche. */
function syncMetadata(lang: Locale): void {
  document.documentElement.lang = lang
  document.title = PAGE_TITLES[lang]
  const setMeta = (selector: string, value: string) => {
    document.querySelector(selector)?.setAttribute('content', value)
  }
  setMeta('meta[name="description"]', PAGE_DESCRIPTIONS[lang])
  setMeta('meta[property="og:title"]', PAGE_TITLES[lang])
  setMeta('meta[property="og:description"]', PAGE_DESCRIPTIONS[lang])
  setMeta('meta[name="twitter:title"]', PAGE_TITLES[lang])
  setMeta('meta[name="twitter:description"]', PAGE_DESCRIPTIONS[lang])
}

/**
 * Fournit la langue active et la fonction de bascule.
 * Persistée dans localStorage, synchronisée avec l'URL (?lang=),
 * <html lang> et les métadonnées (title, description, OG, Twitter).
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>(detectInitialLang)

  const setLang = (next: Locale) => {
    setLangState(next)
    syncUrl(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* Stockage indisponible : la langue dure jusqu'au rechargement. */
    }
  }

  useEffect(() => {
    syncMetadata(lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
  )
}

export function useLang(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLang doit être utilisé dans <LanguageProvider>')
  }
  return context
}

/** Renvoie le dictionnaire complet de la langue active : tout se met à jour au basculement. */
export function useT(): Dict {
  const { lang } = useLang()
  return translations[lang]
}
