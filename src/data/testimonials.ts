/**
 * Témoignages clients FOSA — configuration centralisée.
 *
 * ⚠️ N'ajoutez ici que de VRAIS témoignages, publiés avec l'accord
 * écrit du client concerné. Jamais de témoignage inventé.
 *
 * Exemple :
 * {
 *   quote: 'FOSA a digitalisé notre suivi de commandes en quelques semaines.',
 *   name: 'Prénom Nom',
 *   role: 'Directrice générale',
 *   company: 'Entreprise SARL',
 *   avatar: '/assets/testimonials/nom.webp', // photo fournie par le client
 * }
 */

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  /** Photo du client (fournie par lui). Optionnelle : les initiales s'affichent à la place. */
  avatar?: string
}

/**
 * Encore aucun témoignage publié : la section affiche son état
 * « premiers témoignages à venir » automatiquement.
 */
export const TESTIMONIALS: Testimonial[] = []
