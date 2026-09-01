/**
 * Témoignages FOSA — API Google Sheets + Apps Script, sans connexion.
 *
 * Architecture :
 *   - La feuille Google privée stocke les témoignages ; le script
 *     `scripts/testimonials-appsscript.gs` (à coller dans la feuille,
 *     Extensions → Apps Script) expose une mini-API :
 *       GET  → { ok: true, testimonials: [{ name, role, company, quote, rating }] }
 *              Uniquement les témoignages « approved » et notés >= 4 — le
 *              filtrage « médiocre » est fait côté serveur, jamais l'e-mail.
 *       POST → { ok: true, status: 'success' | 'already' } (already = e-mail
 *              déjà utilisé) | { ok: false, status: 'error' | 'rate' }
 *   - Une adresse e-mail ne peut témoigner qu'une fois (dédup serveur + locale).
 *
 * Déduplication :
 *   - Locale : l'adresse souscrite est mémorisée dans localStorage — une
 *     deuxième soumission du même navigateur est refusée sans appel réseau.
 *   - Serveur : le script refuse un e-mail déjà présent dans la feuille.
 */

import type { Testimonial } from '../data/testimonials'

/**
 * ⚠️ À personnaliser : URL « .../exec » de l'application Web Apps Script.
 *
 * Où la trouver :
 *   Dans la feuille Google → Extensions → Apps Script → Déployer →
 *   Gérer les déploiements → copier l'URL de la forme
 *   `https://script.google.com/macros/s/XXXX/exec`.
 *   Instructions complètes : scripts/testimonials-appsscript.gs.
 *
 * Tant que la valeur est vide :
 *   - la section affiche la liste statique de data/testimonials.ts
 *     (comportement d'avant, état d'attente si elle est vide) ;
 *   - le formulaire « Laisser un témoignage » est masqué.
 */
/* Annotation string explicite : la valeur est destinée à être modifiée
   (une URL littérale casserait les comparaisons `!== ''` au type-check). */
export const TESTIMONIALS_ENDPOINT: string =
  'https://script.google.com/macros/s/AKfycbwCL0aE6s8Bf_BH_GfIj_nikr5CgRYagcd9sMLZnT0jhLyohjpBmA8ZvaICY6DzHA3S/exec'

/** Clé localStorage : dernier e-mail ayant témoigné sur cet appareil. */
const SUBMITTED_KEY = 'fosa-testimonial-email'

const TIMEOUT_MS = 12000

export interface TestimonialSubmission {
  name: string
  role: string
  company: string
  email: string
  rating: number
  quote: string
  /** Honeypot anti-bot : un humain laisse ce champ vide. */
  website: string
}

/** `invalid_email` : e-mail jetable ou domaine sans enregistrement MX (vérifié côté script). */
export type TestimonialSubmitStatus = 'success' | 'already' | 'invalid_email' | 'error'

export interface TestimonialSubmitResult {
  status: TestimonialSubmitStatus
}

export function getStoredTestimonialEmail(): string | null {
  try {
    return localStorage.getItem(SUBMITTED_KEY)
  } catch {
    return null
  }
}

function storeTestimonialEmail(email: string): void {
  try {
    localStorage.setItem(SUBMITTED_KEY, email)
  } catch {
    /* Stockage indisponible : la dédup locale est simplement ignorée. */
  }
}

/** Parsing défensif : le script renvoie du JSON, mais une page d'erreur HTML ne doit rien casser. */
async function readJson(res: Response): Promise<unknown> {
  try {
    return await res.json()
  } catch {
    return null
  }
}

/**
 * Récupère la liste publique des témoignages.
 * Toute erreur (réseau, timeout, réponse invalide) renvoie `[]` : la section
 * retombe alors en silence sur la liste statique.
 */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!TESTIMONIALS_ENDPOINT) return []

  try {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), TIMEOUT_MS)
    const res = await fetch(TESTIMONIALS_ENDPOINT, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
    })
    window.clearTimeout(timeoutId)

    const data = (await readJson(res)) as {
      ok?: boolean
      testimonials?: Array<Partial<Testimonial> & { rating?: unknown }>
    } | null
    if (!res.ok || !data || data.ok !== true || !Array.isArray(data.testimonials)) return []

    return data.testimonials
      .map((entry) => {
        const rating = Number(entry.rating)
        return {
          quote: String(entry.quote ?? '').trim(),
          name: String(entry.name ?? '').trim(),
          role: String(entry.role ?? '').trim(),
          company: String(entry.company ?? '').trim(),
          rating: Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : undefined,
        }
      })
      .filter((entry) => entry.quote && entry.name)
  } catch {
    return []
  }
}

/**
 * Soumet un témoignage. Aucune clé n'est exposée : l'application Web Apps
 * Script fait foi côté serveur (validation, dédup, quota).
 *
 * NB : le POST part en `Content-Type: text/plain` (corps JSON) — Apps Script
 * ne répond pas au préflight OPTIONS, un `application/json` déclencherait une
 * erreur CORS dans le navigateur.
 */
export async function submitTestimonial(
  input: TestimonialSubmission,
): Promise<TestimonialSubmitResult> {
  const normalizedEmail = input.email.trim().toLowerCase()

  /* Dédup locale : cet e-mail a déjà témoigné depuis ce navigateur. */
  if (getStoredTestimonialEmail() === normalizedEmail) {
    return { status: 'already' }
  }

  /* Endpoint pas encore configuré : le formulaire est masqué, défense de principe. */
  if (!TESTIMONIALS_ENDPOINT) {
    return { status: 'error' }
  }

  try {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), TIMEOUT_MS)
    const res = await fetch(TESTIMONIALS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      redirect: 'follow',
      body: JSON.stringify({ ...input, email: normalizedEmail }),
      signal: controller.signal,
    })
    window.clearTimeout(timeoutId)

    const data = (await readJson(res)) as { ok?: boolean; status?: string } | null
    if (res.ok && data?.ok === true && data.status === 'success') {
      storeTestimonialEmail(normalizedEmail)
      return { status: 'success' }
    }
    if (res.ok && data?.ok === true && data.status === 'already') {
      storeTestimonialEmail(normalizedEmail)
      return { status: 'already' }
    }
    /* E-mail jetable ou domaine inexistant : statut dédié pour un message clair. */
    if (res.ok && data?.ok === false && data.status === 'invalid_email') {
      return { status: 'invalid_email' }
    }
    /* Message du service volontairement masqué : l'UI affiche un texte générique en français. */
    return { status: 'error' }
  } catch {
    return { status: 'error' }
  }
}
