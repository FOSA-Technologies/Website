/**
 * Configuration vidéo FOSA.
 */

/**
 * ⚠️ À personnaliser : URL YouTube de la vidéo de présentation FOSA.
 * Formats acceptés : youtube.com/watch?v=…, youtu.be/…, youtube.com/shorts/…
 * Exemple : 'https://www.youtube.com/watch?v=XXXXXXXXXXX'
 *
 * Tant que la valeur est vide, la section À propos affiche un visuel
 * d'attente élégant (« Notre vidéo de présentation arrive bientôt. »).
 */
export const YOUTUBE_VIDEO_URL = ''

/** Extrait l'identifiant YouTube d'une URL (watch, shorts, embed, youtu.be). */
export function getYouTubeId(url: string): string | null {
  if (!url) return null
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/,
  )
  return match ? match[1] : null
}

/** Miniature officielle YouTube (aucune clé API requise). */
export function getYouTubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}
