/**
 * Configuration de la prise de rendez-vous FOSA (Calendly).
 * Une seule URL à personnaliser : tout le site s'en sert.
 */

import { CONTACT_MAILTO } from './content'

/**
 * ⚠️ À personnaliser : l'URL Calendly de FOSA.
 * Exemple : 'https://calendly.com/fosa-tech/30min'
 *
 * Tant que la valeur est vide, la section rendez-vous affiche un
 * panneau d'attente élégant avec un lien de contact par e-mail.
 */
export const CALENDLY_URL = 'https://calendly.com/brandonravomanana-v/30min'

/** Script officiel Calendly, chargé uniquement quand la section devient visible. */
export const CALENDLY_WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'

/** Solution de repli : prise de rendez-vous par e-mail. */
export const BOOKING_MAILTO = `${CONTACT_MAILTO}?subject=Prise%20de%20rendez-vous%20%E2%80%94%20FOSA`
