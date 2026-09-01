/**
 * Dictionnaire de traductions FOSA — français / anglais.
 * Chaque section du site consomme sa clé via useT() ; le changement de
 * langue est appliqué dynamiquement partout.
 *
 * Ajouter une langue : dupliquer le bloc `fr`, traduire, ajouter la clé
 * au type Locale et au contexte LanguageContext.
 */

import type { CompanySize, Deadline, SolutionType } from '../lib/quote'

export type Locale = 'fr' | 'en'

export interface QuoteOptionDict {
  value: string
  label: string
  hint?: string
}

export interface Dict {
  common: {
    language: string
    skipLink: string
    logoBackToTop: string
  }
  nav: {
    links: { label: string; href: string }[]
    contact: string
    openMenu: string
    closeMenu: string
  }
  hero: {
    overline: string
    titleTop: string
    titleMiddle: string
    titleAccent: string
    titleEnd: string
    text: string
    ctaPrimary: string
    ctaSecondary: string
    note: string
  }
  trust: {
    title: string
    sub: string
  }
  problem: {
    titleA: string
    titleAccent: string
    titleB: string
    textBold: string
    text: string
    blocks: { number: string; title: string; description: string }[]
  }
  solutions: {
    overline: string
    title: string
    subtitle: string
    items: { icon: string; title: string; description: string }[]
  }
  industries: {
    overline: string
    title: string
    subtitle: string
    items: { icon: string; title: string; description: string }[]
    moreTitle: string
    moreText: string
    moreCta: string
  }
  products: {
    overline: string
    title: string
    subtitle: string
    statuses: { available: string; inDevelopment: string; comingSoon: string }
    viewProduct: string
    viewDemo: string
    viewDemoAria: string
    comingTitle: string
    comingText: string
    notify: string
  }
  showcase: {
    overline: string
    title: string
    subtitle: string
    annotations: string[]
  }
  features: {
    overline: string
    title: string
    items: { illustration: string; title: string; description: string }[]
  }
  quote: {
    overline: string
    title: string
    subtitle: string
    panelLabel: string
    stepCounter: string
    progressAria: string
    steps: { name: string; question: string }[]
    hints: { type: string; description: string; budget: string }
    descriptionPlaceholder: string
    descriptionCounter: string
    options: {
      solutions: QuoteOptionDict[]
      sizes: QuoteOptionDict[]
      deadlines: QuoteOptionDict[]
      budgets: QuoteOptionDict[]
    }
    validation: {
      type: string
      description: string
      size: string
      deadline: string
    }
    buttons: { back: string; next: string; submit: string }
    loading: { title: string; subtitle: string; steps: string[] }
    error: { title: string; text: string; retry: string }
    result: {
      title: string
      complexityLabel: string
      complexityValues: { simple: string; moderate: string; high: string }
      estimateLabel: string
      estimateNote: string
      timelineLabel: string
      timelineNote: string
      featuresLabel: string
      nextStepsLabel: string
      legalNote: string
      cta: string
      restart: string
    }
    undernote: string
    /** Libellés injectés dans generateQuote() (avec article). */
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
  testimonials: {
    overline: string
    title: string
    subtitle: string
    emptyTitle: string
    emptyText: string
    prev: string
    next: string
    pagination: string
    goTo: string
    formTitle: string
    formText: string
    nameLabel: string
    namePlaceholder: string
    roleLabel: string
    rolePlaceholder: string
    companyLabel: string
    companyPlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    ratingLabel: string
    ratingValue: (value: number) => string
    quoteLabel: string
    quotePlaceholder: string
    quoteCounter: string
    submit: string
    submitting: string
    invalidName: string
    invalidEmail: string
    invalidEmailDomain: string
    invalidRating: string
    invalidQuote: string
    genericError: string
    successTitle: string
    successText: string
    alreadyTitle: string
    alreadyText: string
    privacy: string
    optional: string
    loading: string
  }
  brand: {
    overline: string
    titleA: string
    titleAccent: string
    titleB: string
    titleEnd: string
    tagline: string[]
    videoWaitingTitle: string
    videoWaitingText: string
    videoPlayAria: string
    videoIframeTitle: string
    videoLabel: string
    videoSub: string
  }
  booking: {
    overline: string
    title: string
    subtitle: string
    text: string
    benefits: string[]
    emailNoteA: string
    emailLink: string
    emailNoteB: string
    fallbackTitle: string
    fallbackText: string
    fallbackCta: string
    loading: string
    loadingNote: string
    errorTitle: string
    errorText: string
    openCalendar: string
    writeUs: string
    incomplete: string
    openInNewTab: string
  }
  newsletter: {
    overline: string
    titleA: string
    titleAccent: string
    titleB: string
    text: string
    placeholder: string
    submit: string
    submitting: string
    invalid: string
    genericError: string
    privacy: string
    successTitle: string
    successText: string
    alreadyTitle: string
    alreadyText: string
  }
  finalCta: {
    title: string
    text: string
    estimate: string
    booking: string
    whatsapp: string
  }
  footer: {
    tagline: string
    solutionsTitle: string
    solutions: { label: string; href: string }[]
    companyTitle: string
    company: { label: string; href: string }[]
    resourcesTitle: string
    resources: { label: string; soon?: boolean }[]
    soon: string
    copyright: string
    world: string
    socialAria: string
  }
}

export const fr = {
  common: {
    language: 'Choix de la langue',
    skipLink: 'Aller au contenu principal',
    logoBackToTop: 'FOSA — retour en haut de page',
  },
  nav: {
    links: [
      { label: 'Solutions', href: '#solutions' },
      { label: 'Produits', href: '#produits' },
      { label: 'Secteurs', href: '#secteurs' },
      { label: 'Fonctionnalités', href: '#fonctionnalites' },
      { label: 'À propos', href: '#apropos' },
    ],
    contact: 'Nous contacter',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
  hero: {
    overline: 'Solutions digitales pour PME',
    titleTop: 'Digitalisez.',
    titleMiddle: 'Simplifiez.',
    titleAccent: 'Propulsez',
    titleEnd: 'votre entreprise.',
    text: 'FOSA accompagne les PME dans leur transformation digitale avec des solutions simples, puissantes et évolutives.',
    ctaPrimary: 'Découvrir nos solutions',
    ctaSecondary: 'Obtenir un devis',
    note: 'Des outils conçus pour simplifier votre quotidien et accélérer votre croissance.',
  },
  trust: {
    title: 'Ils nous font confiance',
    sub: 'Des solutions pensées pour les entreprises ambitieuses.',
  },
  problem: {
    titleA: 'Votre entreprise',
    titleAccent: 'mérite mieux',
    titleB: 'que des outils compliqués.',
    textBold: 'Trop d’outils, trop de tâches manuelles, trop de données dispersées.',
    text: 'FOSA rassemble l’essentiel pour vous permettre de vous concentrer sur ce qui compte vraiment : votre entreprise.',
    blocks: [
      { number: '01', title: 'Simplifiez', description: 'Centralisez vos opérations et réduisez les tâches inutiles.' },
      { number: '02', title: 'Pilotez', description: 'Visualisez vos données et prenez de meilleures décisions.' },
      { number: '03', title: 'Développez', description: 'Des solutions évolutives qui grandissent avec votre entreprise.' },
    ],
  },
  solutions: {
    overline: 'Nos solutions',
    title: 'Une technologie pensée pour votre activité.',
    subtitle: 'Des solutions digitales conçues autour des besoins réels des PME.',
    items: [
      { icon: 'enterprise', title: "Gestion d'entreprise", description: 'Pilotez vos opérations au quotidien depuis une interface unique, structurée et pensée pour votre métier.' },
      { icon: 'crm', title: 'CRM', description: 'Suivez vos contacts, vos échanges et vos opportunités sans jamais perdre une information.' },
      { icon: 'sales', title: 'Ventes & facturation', description: 'Gérez vos offres, vos commandes et vos factures en quelques clics, du devis à l’encaissement.' },
      { icon: 'stock', title: 'Stocks', description: 'Gardez un contrôle précis de vos inventaires, de vos approvisionnements et de vos mouvements.' },
      { icon: 'analytics', title: 'Analyse & reporting', description: 'Transformez vos données en tableaux de bord clairs pour prendre de meilleures décisions.' },
      { icon: 'automation', title: 'Automatisation', description: 'Éliminez les tâches répétitives grâce à des flux de travail intelligents et configurables.' },
      { icon: 'mobile', title: 'Solutions mobiles', description: 'Accédez à vos outils depuis n’importe quel appareil, où que vous soyez, à tout moment.' },
      { icon: 'ai', title: 'Intelligence artificielle', description: 'Exploitez l’IA pour anticiper les tendances, automatiser les décisions et gagner du temps.' },
    ],
  },
  industries: {
    overline: 'Secteurs',
    title: 'Une solution pour chaque secteur.',
    subtitle: 'Quel que soit votre domaine d’activité, FOSA s’adapte aux réalités de votre métier.',
    items: [
      { icon: 'health', title: 'Santé', description: 'Gestion des patients, des rendez-vous et des données sensibles en toute conformité.' },
      { icon: 'retail', title: 'Commerce & Distribution', description: 'Points de vente, achats, stocks et performance commerciale, tout au même endroit.' },
      { icon: 'hospitality', title: 'Hôtellerie & Restauration', description: 'Réservations, services et suivi d’activité au quotidien pour une expérience client fluide.' },
      { icon: 'education', title: 'Éducation & Formation', description: 'Gestion des apprenants, des programmes, des cours et des inscriptions, simplement.' },
      { icon: 'services', title: 'Services & Prestations', description: 'Devis, interventions, suivi des missions et facturation de vos prestations.' },
      { icon: 'ngo', title: 'Associations & ONG', description: 'Projets, adhérents, dons et reporting d’impact, centralisés et simplifiés.' },
    ],
    moreTitle: 'Et plus encore',
    moreText: 'Chaque métier a ses particularités. Parlons de vos besoins.',
    moreCta: 'Discutons-en',
  },
  products: {
    overline: 'Nos produits',
    title: 'Découvrez nos produits',
    subtitle: 'Des solutions conçues pour résoudre des problèmes concrets et simplifier le quotidien des entreprises.',
    statuses: { available: 'Disponible', inDevelopment: 'En développement', comingSoon: 'Bientôt disponible' },
    viewProduct: 'Voir le produit',
    viewDemo: 'Voir la démo',
    viewDemoAria: 'Voir la démo de',
    comingTitle: 'Nos prochaines solutions arrivent bientôt.',
    comingText: 'Nous construisons des produits SaaS prêts à l’emploi pour accompagner la transformation digitale des PME. Soyez informé en avant-première de leur lancement.',
    notify: 'Être informé',
  },
  showcase: {
    overline: 'La plateforme',
    title: 'Toutes vos opérations. Une vision claire.',
    subtitle: 'Un tableau de bord pensé pour piloter votre activité d’un seul regard — où que vous soyez.',
    annotations: ['Données en temps réel', 'Gestion centralisée', 'Accessible partout', 'Sécurité avancée'],
  },
  features: {
    overline: 'Fonctionnalités',
    title: 'Conçu pour travailler plus intelligemment.',
    items: [
      { illustration: 'interface', title: 'Gestion complète', description: 'Gérez vos opérations depuis une interface unique.' },
      { illustration: 'realtime', title: 'Données en temps réel', description: 'Suivez les indicateurs essentiels de votre activité.' },
      { illustration: 'security', title: 'Sécurité avancée', description: 'Protégez vos données et celles de vos clients.' },
      { illustration: 'anywhere', title: 'Accessible partout', description: 'Travaillez depuis votre ordinateur ou votre mobile.' },
      { illustration: 'scalable', title: 'Évolutif', description: 'Une architecture pensée pour accompagner votre croissance.' },
    ],
  },
  quote: {
    overline: 'Devis intelligent',
    title: 'Estimez votre projet avec notre assistant.',
    subtitle: 'Décrivez votre besoin en quelques étapes et obtenez une première estimation indicative en moins d’une minute.',
    panelLabel: 'Assistant estimation',
    stepCounter: 'Étape {current} sur {total}',
    progressAria: 'Progression du formulaire',
    steps: [
      { name: 'Solution', question: 'Quel type de solution recherchez-vous ?' },
      { name: 'Projet', question: 'Parlez-nous de votre projet' },
      { name: 'Entreprise', question: 'Quelle est la taille de votre entreprise ?' },
      { name: 'Délai', question: 'Quel est votre délai ?' },
      { name: 'Budget', question: 'Quel est votre budget approximatif ?' },
    ],
    hints: {
      type: 'Choisissez l’option la plus proche de votre besoin.',
      description: 'Quelques phrases suffisent : contexte, objectif, fonctionnalités attendues.',
      budget: 'Facultatif — cette réponse affine l’estimation, sans être obligatoire.',
    },
    descriptionPlaceholder: 'Ex. : nous sommes une PME de distribution et nous cherchons un outil pour suivre nos stocks, nos ventes et nos factures…',
    descriptionCounter: '{count} / 600',
    options: {
      solutions: [
        { value: 'site', label: 'Site web', hint: 'Présentation, visibilité, contact' },
        { value: 'webapp', label: 'Application web', hint: 'Outil métier accessible en ligne' },
        { value: 'mobile', label: 'Application mobile', hint: 'iOS, Android ou cross-platform' },
        { value: 'crm', label: 'CRM', hint: 'Suivi clients et opportunités' },
        { value: 'erp', label: 'ERP / gestion', hint: 'Pilotage complet de l’activité' },
        { value: 'ecommerce', label: 'E-commerce', hint: 'Boutique en ligne et paiements' },
        { value: 'automation', label: 'Automatisation', hint: 'Moins de tâches répétitives' },
        { value: 'ai', label: 'Intelligence artificielle', hint: 'Assistant, analyse, prédiction' },
        { value: 'custom', label: 'Solution personnalisée', hint: 'Un besoin propre à votre métier' },
      ],
      sizes: [
        { value: 'independant', label: 'Indépendant', hint: '1 personne' },
        { value: 'petite', label: 'Petite entreprise', hint: '2 à 10 personnes' },
        { value: 'pme', label: 'PME', hint: '11 à 250 personnes' },
        { value: 'entreprise', label: 'Entreprise', hint: 'Plus de 250 personnes' },
      ],
      deadlines: [
        { value: 'asap', label: 'Dès que possible' },
        { value: 'un-a-trois-mois', label: '1 à 3 mois' },
        { value: 'trois-a-six-mois', label: '3 à 6 mois' },
        { value: 'flexible', label: 'Flexible' },
      ],
      budgets: [
        { value: 'moins-de-2000', label: 'Moins de 2 000 €' },
        { value: '2000-a-5000', label: '2 000 € – 5 000 €' },
        { value: '5000-a-10000', label: '5 000 € – 10 000 €' },
        { value: '10000-a-25000', label: '10 000 € – 25 000 €' },
        { value: 'plus-de-25000', label: 'Plus de 25 000 €' },
        { value: 'non-precise', label: 'Je préfère ne pas préciser' },
      ],
    },
    validation: {
      type: 'Sélectionnez une solution pour continuer.',
      description: 'Décrivez votre besoin en quelques phrases ({min} caractères minimum).',
      size: 'Sélectionnez la taille de votre entreprise.',
      deadline: 'Sélectionnez votre délai.',
    },
    buttons: { back: 'Précédent', next: 'Continuer', submit: 'Obtenir mon estimation' },
    loading: {
      title: 'Analyse en cours',
      subtitle: 'Quelques secondes suffisent.',
      steps: [
        'Analyse de votre besoin…',
        'Identification des fonctionnalités…',
        'Évaluation de la complexité…',
        'Préparation de votre estimation…',
      ],
    },
    error: {
      title: 'Une erreur est survenue pendant l’analyse.',
      text: 'Vos réponses ont été conservées. Réessayez dans un instant.',
      retry: 'Réessayer',
    },
    result: {
      title: 'Analyse de votre projet',
      complexityLabel: 'Complexité',
      complexityValues: { simple: 'Simple', moderate: 'Modérée', high: 'Élevée' },
      estimateLabel: 'Estimation indicative',
      estimateNote: 'Avant analyse détaillée.',
      timelineLabel: 'Délai estimatif',
      timelineNote: 'Selon le périmètre retenu.',
      featuresLabel: 'Fonctionnalités recommandées',
      nextStepsLabel: 'Prochaines étapes',
      legalNote: 'Cette estimation est indicative et peut évoluer après analyse détaillée de votre projet.',
      cta: 'Discuter de mon projet',
      restart: 'Recommencer',
    },
    undernote: 'Assistant d’estimation préliminaire — il ne remplace pas un devis commercial détaillé, établi avec notre équipe.',
    typeLabels: {
      site: 'un site web',
      webapp: 'une application web',
      mobile: 'une application mobile',
      crm: 'un CRM',
      erp: 'un ERP de gestion',
      ecommerce: 'une solution e-commerce',
      automation: 'une automatisation',
      ai: 'une solution d’intelligence artificielle',
      custom: 'une solution personnalisée',
    },
    sizeLabels: {
      independant: 'un indépendant',
      petite: 'une petite entreprise',
      pme: 'une PME',
      entreprise: 'une entreprise',
    },
    deadlineLabels: {
      asap: 'dès que possible',
      'un-a-trois-mois': 'de 1 à 3 mois',
      'trois-a-six-mois': 'de 3 à 6 mois',
      flexible: 'flexible',
    },
    featuresByType: {
      site: ['Pages de présentation et services', 'Design responsive sur mesure', 'Optimisation SEO', 'Formulaire de contact'],
      webapp: ['Espace utilisateur sécurisé', 'Gestion des données métier', 'Tableaux de bord et reporting', 'Rôles et permissions'],
      mobile: ['Application iOS et Android', 'Comptes utilisateurs', 'Notifications push', 'Publication sur les stores'],
      crm: ['Fiches contacts et entreprises', 'Suivi des opportunités', 'Historique des échanges', 'Rapports de vente'],
      erp: ['Gestion des stocks', 'Devis, commandes et facturation', 'Suivi de production', 'Tableaux de bord de pilotage'],
      ecommerce: ['Catalogue produits', 'Panier et paiement en ligne', 'Gestion des commandes', 'Suivi des stocks'],
      automation: ['Connecteurs entre vos outils', 'Flux de travail configurables', 'Déclencheurs et planifications', 'Alertes par e-mail'],
      ai: ['Assistant conversationnel', 'Analyse prédictive', 'Extraction de données', 'Automatisation des réponses'],
      custom: ['Analyse de votre besoin spécifique', 'Spécifications sur mesure', 'Prototype rapide', 'Intégration à vos outils existants'],
    },
    rangeCustom: 'Sur mesure — à définir ensemble',
    timelineFlexible: 'À définir ensemble',
    timelineAsap: '4 à 8 semaines',
    timelineAsapComplex: '6 à 10 semaines',
    timeline1to3: '2 à 4 mois',
    timeline3to6: '4 à 7 mois',
    budgetPhasedNote: ' Votre enveloppe nécessitera probablement un découpage en phases — nous en discuterons ensemble.',
    budgetAdjustedNote: ' L’estimation a été ajustée à votre enveloppe budgétaire.',
    summaryTemplate: (typeLabel, sizeLabel, deadlineLabel) =>
      `Votre besoin porte sur ${typeLabel}, pensé pour ${sizeLabel}, avec un délai ${deadlineLabel}.`,
    nextStepsStandard: [
      'Réserver un créneau pour préciser le périmètre avec notre équipe',
      'Recevoir un devis détaillé et un planning indicatif',
      'Valider ensemble les priorités de la première version',
    ],
    nextStepsComplex: [
      'Réserver un créneau pour préciser le périmètre avec notre équipe',
      'Recevoir un devis détaillé et un planning indicatif',
      'Découper le projet en phases concrètes et mesurables',
    ],
  },
  testimonials: {
    overline: 'Témoignages',
    title: 'Ce que nos clients pensent de FOSA',
    subtitle: 'La confiance de nos clients est notre meilleure preuve de qualité.',
    emptyTitle: 'Les premiers témoignages de nos clients apparaîtront ici.',
    emptyText: 'Nous publierons bientôt les retours de nos premiers clients, avec leur accord.',
    prev: 'Témoignage précédent',
    next: 'Témoignage suivant',
    pagination: 'Pagination des témoignages',
    goTo: 'Aller aux témoignages',
    formTitle: 'Partagez votre expérience',
    formText:
      'Un client satisfait est notre meilleure carte de visite. Racontez-nous votre projet en quelques lignes.',
    nameLabel: 'Nom',
    namePlaceholder: 'Votre nom',
    roleLabel: 'Poste',
    rolePlaceholder: 'Ex. : Directrice générale',
    companyLabel: 'Entreprise',
    companyPlaceholder: 'Ex. : Entreprise SARL',
    emailLabel: 'E-mail',
    emailPlaceholder: 'vous@entreprise.com',
    ratingLabel: 'Votre note',
    ratingValue: (value) => `${value} étoile${value > 1 ? 's' : ''} sur 5`,
    quoteLabel: 'Votre témoignage',
    quotePlaceholder: 'Comment FOSA a-t-il accompagné votre projet ?',
    quoteCounter: '{count} / 1000',
    submit: 'Envoyer mon témoignage',
    submitting: 'Envoi en cours…',
    invalidName: 'Indiquez votre nom (2 caractères minimum).',
    invalidEmail: 'Entrez une adresse e-mail valide.',
    invalidEmailDomain:
      'Cette adresse e-mail semble temporaire ou inexistante. Utilisez une adresse réelle.',
    invalidRating: 'Choisissez une note entre 1 et 5 étoiles.',
    invalidQuote: 'Écrivez un témoignage d’au moins 10 caractères.',
    genericError: 'Une erreur est survenue. Réessayez dans un instant.',
    successTitle: 'Merci !',
    successText: 'Votre témoignage a bien été reçu. Merci pour votre retour !',
    alreadyTitle: 'Déjà reçu',
    alreadyText: 'Un témoignage a déjà été envoyé depuis cette adresse. Merci !',
    privacy:
      'Votre adresse e-mail sert uniquement à éviter les doublons. Elle n’est jamais publiée.',
    optional: 'Optionnel',
    loading: 'Chargement des témoignages…',
  },
  brand: {
    overline: 'Notre vision',
    titleA: 'Nous ne créons pas seulement des logiciels.',
    titleAccent: 'font avancer',
    titleB: 'Nous créons des outils qui',
    titleEnd: 'les entreprises.',
    tagline: ['Intelligent.', 'Stratégique.', 'Visionnaire.'],
    videoWaitingTitle: 'Notre vidéo de présentation arrive bientôt.',
    videoWaitingText: 'Découvrez la plateforme FOSA en images d’ici peu.',
    videoPlayAria: 'Lancer la vidéo de présentation FOSA',
    videoIframeTitle: 'Vidéo de présentation FOSA',
    videoLabel: 'La plateforme en vidéo',
    videoSub: 'Regarder la présentation',
  },
  booking: {
    overline: 'Rendez-vous',
    title: 'Parlons de votre projet.',
    subtitle: 'Réservez un créneau avec notre équipe et discutons de vos besoins.',
    text: 'Un échange de 30 minutes, à distance, pour comprendre votre contexte et identifier les solutions digitales les plus pertinentes pour votre activité. Aucun jargon, aucun engagement.',
    benefits: ['Analyse de vos besoins', 'Identification des meilleures solutions', 'Conseils personnalisés', 'Sans engagement'],
    emailNoteA: 'Vous préférez écrire ?',
    emailLink: 'Contactez-nous par e-mail',
    emailNoteB: '— nous revenons vers vous sous 24 h ouvrées.',
    fallbackTitle: 'Notre agenda en ligne arrive bientôt.',
    fallbackText: 'En attendant, écrivez-nous pour convenir d’un créneau qui vous arrange.',
    fallbackCta: 'Proposer un créneau',
    loading: 'Chargement du calendrier…',
    loadingNote: 'Quelques secondes suffisent.',
    errorTitle: 'Le calendrier n’a pas pu être chargé.',
    errorText: 'Ouvrez-le directement dans un nouvel onglet, ou écrivez-nous pour convenir d’un créneau.',
    openCalendar: 'Ouvrir le calendrier',
    writeUs: 'Nous écrire',
    incomplete: 'L’affichage est incomplet ?',
    openInNewTab: 'Ouvrir le calendrier dans un nouvel onglet',
  },
  newsletter: {
    overline: 'Newsletter',
    titleA: 'Restez informé de nos',
    titleAccent: 'lancements produits',
    titleB: '.',
    text: 'Un e-mail par mois maximum : nouveautés, conseils de digitalisation pour PME et accès anticipés. Désinscription en un clic.',
    placeholder: 'vous@entreprise.com',
    submit: 'S’inscrire',
    submitting: 'Inscription…',
    invalid: 'Entrez une adresse e-mail valide, par exemple vous@entreprise.com',
    genericError: 'Une erreur est survenue. Réessayez dans un instant.',
    privacy: 'Votre adresse reste privée. Aucun spam, jamais.',
    successTitle: 'Bienvenue à bord !',
    successText: 'Votre adresse a bien été enregistrée. À très vite dans votre boîte de réception.',
    alreadyTitle: 'Vous êtes déjà inscrit',
    alreadyText: 'Cette adresse figure déjà dans notre liste — aucun doublon n’a été créé.',
  },
  finalCta: {
    title: 'Votre projet mérite une solution adaptée.',
    text: 'Décrivez-nous votre besoin, obtenez une première estimation et échangez avec notre équipe.',
    estimate: 'Obtenir une estimation',
    booking: 'Prendre rendez-vous',
    whatsapp: 'Ou discutez directement avec nous sur WhatsApp',
  },
  footer: {
    tagline: 'Digitalisez. Simplifiez. Propulsez votre entreprise.',
    solutionsTitle: 'Solutions',
    solutions: [
      { label: 'Gestion', href: '#solutions' },
      { label: 'CRM', href: '#solutions' },
      { label: 'Ventes', href: '#solutions' },
      { label: 'Automatisation', href: '#solutions' },
      { label: 'IA', href: '#solutions' },
    ],
    companyTitle: 'Entreprise',
    company: [
      { label: 'À propos', href: '#apropos' },
      { label: 'Notre vision', href: '#apropos' },
      { label: 'Contact', href: '' },
    ],
    resourcesTitle: 'Ressources',
    resources: [{ label: 'Documentation', soon: true }, { label: 'Blog', soon: true }, { label: 'Support', soon: false }],
    soon: 'Bientôt',
    copyright: '© 2026 FOSA. Tous droits réservés.',
    world: 'Des outils digitaux pour les entreprises du monde entier.',
    socialAria: 'FOSA sur',
  },
} satisfies Dict

export const en: Dict = {
  common: {
    language: 'Language selection',
    skipLink: 'Skip to main content',
    logoBackToTop: 'FOSA — back to top',
  },
  nav: {
    links: [
      { label: 'Solutions', href: '#solutions' },
      { label: 'Products', href: '#produits' },
      { label: 'Industries', href: '#secteurs' },
      { label: 'Features', href: '#fonctionnalites' },
      { label: 'About', href: '#apropos' },
    ],
    contact: 'Contact us',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    overline: 'Digital solutions for SMBs',
    titleTop: 'Digitize.',
    titleMiddle: 'Simplify.',
    titleAccent: 'Propel',
    titleEnd: 'your business.',
    text: 'FOSA helps SMBs embrace digital transformation with simple, powerful and scalable solutions.',
    ctaPrimary: 'Discover our solutions',
    ctaSecondary: 'Get a quote',
    note: 'Tools designed to simplify your daily operations and accelerate your growth.',
  },
  trust: {
    title: 'They trust us',
    sub: 'Solutions built for ambitious businesses.',
  },
  problem: {
    titleA: 'Your business',
    titleAccent: 'deserves better',
    titleB: 'than complicated tools.',
    textBold: 'Too many tools, too much manual work, too much scattered data.',
    text: 'FOSA brings the essentials together so you can focus on what really matters: your business.',
    blocks: [
      { number: '01', title: 'Simplify', description: 'Centralize your operations and cut out unnecessary tasks.' },
      { number: '02', title: 'Steer', description: 'Visualize your data and make better decisions.' },
      { number: '03', title: 'Grow', description: 'Scalable solutions that grow with your company.' },
    ],
  },
  solutions: {
    overline: 'Our solutions',
    title: 'Technology built for your business.',
    subtitle: 'Digital solutions designed around the real needs of SMBs.',
    items: [
      { icon: 'enterprise', title: 'Business management', description: 'Run your day-to-day operations from a single, structured interface built for your trade.' },
      { icon: 'crm', title: 'CRM', description: 'Track your contacts, conversations and opportunities without ever losing information.' },
      { icon: 'sales', title: 'Sales & invoicing', description: 'Manage your quotes, orders and invoices in a few clicks, from quote to payment.' },
      { icon: 'stock', title: 'Inventory', description: 'Keep precise control of your stock levels, supplies and movements.' },
      { icon: 'analytics', title: 'Analytics & reporting', description: 'Turn your data into clear dashboards to make better decisions.' },
      { icon: 'automation', title: 'Automation', description: 'Eliminate repetitive tasks with smart, configurable workflows.' },
      { icon: 'mobile', title: 'Mobile solutions', description: 'Access your tools from any device, wherever you are, at any time.' },
      { icon: 'ai', title: 'Artificial intelligence', description: 'Use AI to anticipate trends, automate decisions and save time.' },
    ],
  },
  industries: {
    overline: 'Industries',
    title: 'A solution for every industry.',
    subtitle: 'Whatever your field, FOSA adapts to the realities of your business.',
    items: [
      { icon: 'health', title: 'Healthcare', description: 'Manage patients, appointments and sensitive data in full compliance.' },
      { icon: 'retail', title: 'Retail & Distribution', description: 'Points of sale, purchasing, inventory and sales performance in one place.' },
      { icon: 'hospitality', title: 'Hospitality & Restaurants', description: 'Daily bookings, services and activity tracking for a smooth customer experience.' },
      { icon: 'education', title: 'Education & Training', description: 'Manage learners, programs, courses and enrollments — simply.' },
      { icon: 'services', title: 'Services & Providers', description: 'Quotes, interventions, mission tracking and invoicing for your services.' },
      { icon: 'ngo', title: 'Nonprofits & NGOs', description: 'Projects, members, donations and impact reporting — centralized and simplified.' },
    ],
    moreTitle: 'And more',
    moreText: 'Every business has its own specifics. Let’s talk about your needs.',
    moreCta: 'Let’s talk',
  },
  products: {
    overline: 'Our products',
    title: 'Discover our products',
    subtitle: 'Solutions designed to solve real problems and simplify everyday business operations.',
    statuses: { available: 'Available', inDevelopment: 'In development', comingSoon: 'Coming soon' },
    viewProduct: 'View product',
    viewDemo: 'View demo',
    viewDemoAria: 'View the demo of',
    comingTitle: 'Our next solutions are coming soon.',
    comingText: 'We are building ready-to-use SaaS products to support SMB digital transformation. Be the first to know when they launch.',
    notify: 'Get notified',
  },
  showcase: {
    overline: 'The platform',
    title: 'All your operations. One clear view.',
    subtitle: 'A dashboard designed to run your business at a glance — wherever you are.',
    annotations: ['Real-time data', 'Centralized management', 'Accessible anywhere', 'Advanced security'],
  },
  features: {
    overline: 'Features',
    title: 'Built to help you work smarter.',
    items: [
      { illustration: 'interface', title: 'Full management', description: 'Run your operations from a single interface.' },
      { illustration: 'realtime', title: 'Real-time data', description: 'Track the key metrics of your business.' },
      { illustration: 'security', title: 'Advanced security', description: 'Protect your data and your customers’ data.' },
      { illustration: 'anywhere', title: 'Accessible everywhere', description: 'Work from your computer or your phone.' },
      { illustration: 'scalable', title: 'Scalable', description: 'An architecture designed to support your growth.' },
    ],
  },
  quote: {
    overline: 'Smart estimate',
    title: 'Estimate your project with our assistant.',
    subtitle: 'Describe your need in a few steps and get a first indicative estimate in under a minute.',
    panelLabel: 'Estimate assistant',
    stepCounter: 'Step {current} of {total}',
    progressAria: 'Form progress',
    steps: [
      { name: 'Solution', question: 'What kind of solution are you looking for?' },
      { name: 'Project', question: 'Tell us about your project' },
      { name: 'Company', question: 'How big is your company?' },
      { name: 'Timeline', question: 'What is your timeline?' },
      { name: 'Budget', question: 'What is your approximate budget?' },
    ],
    hints: {
      type: 'Pick the option closest to your need.',
      description: 'A few sentences are enough: context, goal, expected features.',
      budget: 'Optional — this answer refines the estimate, without being required.',
    },
    descriptionPlaceholder: 'E.g. we are a distribution SMB looking for a tool to track our inventory, sales and invoices…',
    descriptionCounter: '{count} / 600',
    options: {
      solutions: [
        { value: 'site', label: 'Website', hint: 'Presentation, visibility, contact' },
        { value: 'webapp', label: 'Web application', hint: 'Online business tool' },
        { value: 'mobile', label: 'Mobile app', hint: 'iOS, Android or cross-platform' },
        { value: 'crm', label: 'CRM', hint: 'Track clients and opportunities' },
        { value: 'erp', label: 'ERP / management', hint: 'Full control of your operations' },
        { value: 'ecommerce', label: 'E-commerce', hint: 'Online store and payments' },
        { value: 'automation', label: 'Automation', hint: 'Fewer repetitive tasks' },
        { value: 'ai', label: 'Artificial intelligence', hint: 'Assistant, analytics, prediction' },
        { value: 'custom', label: 'Custom solution', hint: 'A need specific to your business' },
      ],
      sizes: [
        { value: 'independant', label: 'Freelancer', hint: '1 person' },
        { value: 'petite', label: 'Small business', hint: '2 to 10 people' },
        { value: 'pme', label: 'SMB', hint: '11 to 250 people' },
        { value: 'entreprise', label: 'Enterprise', hint: 'More than 250 people' },
      ],
      deadlines: [
        { value: 'asap', label: 'As soon as possible' },
        { value: 'un-a-trois-mois', label: '1 to 3 months' },
        { value: 'trois-a-six-mois', label: '3 to 6 months' },
        { value: 'flexible', label: 'Flexible' },
      ],
      budgets: [
        { value: 'moins-de-2000', label: 'Under €2,000' },
        { value: '2000-a-5000', label: '€2,000 – €5,000' },
        { value: '5000-a-10000', label: '€5,000 – €10,000' },
        { value: '10000-a-25000', label: '€10,000 – €25,000' },
        { value: 'plus-de-25000', label: 'Over €25,000' },
        { value: 'non-precise', label: 'I’d rather not say' },
      ],
    },
    validation: {
      type: 'Select a solution to continue.',
      description: 'Describe your need in a few sentences (at least {min} characters).',
      size: 'Select your company size.',
      deadline: 'Select your timeline.',
    },
    buttons: { back: 'Back', next: 'Continue', submit: 'Get my estimate' },
    loading: {
      title: 'Analysis in progress',
      subtitle: 'It only takes a few seconds.',
      steps: [
        'Analyzing your need…',
        'Identifying features…',
        'Assessing complexity…',
        'Preparing your estimate…',
      ],
    },
    error: {
      title: 'Something went wrong during the analysis.',
      text: 'Your answers have been kept. Try again in a moment.',
      retry: 'Try again',
    },
    result: {
      title: 'Your project analysis',
      complexityLabel: 'Complexity',
      complexityValues: { simple: 'Simple', moderate: 'Moderate', high: 'High' },
      estimateLabel: 'Indicative estimate',
      estimateNote: 'Before detailed analysis.',
      timelineLabel: 'Estimated timeline',
      timelineNote: 'Depending on final scope.',
      featuresLabel: 'Recommended features',
      nextStepsLabel: 'Next steps',
      legalNote: 'This estimate is indicative and may evolve after a detailed analysis of your project.',
      cta: 'Discuss my project',
      restart: 'Start over',
    },
    undernote: 'Preliminary estimate assistant — it does not replace a detailed commercial quote established with our team.',
    typeLabels: {
      site: 'a website',
      webapp: 'a web application',
      mobile: 'a mobile app',
      crm: 'a CRM',
      erp: 'an ERP suite',
      ecommerce: 'an e-commerce solution',
      automation: 'an automation workflow',
      ai: 'an AI solution',
      custom: 'a custom solution',
    },
    sizeLabels: {
      independant: 'a freelancer',
      petite: 'a small business',
      pme: 'an SMB',
      entreprise: 'an enterprise',
    },
    deadlineLabels: {
      asap: 'as soon as possible',
      'un-a-trois-mois': '1 to 3 months',
      'trois-a-six-mois': '3 to 6 months',
      flexible: 'flexible',
    },
    featuresByType: {
      site: ['Presentation and services pages', 'Custom responsive design', 'SEO optimization', 'Contact form'],
      webapp: ['Secure user area', 'Business data management', 'Dashboards and reporting', 'Roles and permissions'],
      mobile: ['iOS and Android app', 'User accounts', 'Push notifications', 'App store publishing'],
      crm: ['Contact and company records', 'Opportunity tracking', 'Conversation history', 'Sales reports'],
      erp: ['Inventory management', 'Quotes, orders and invoicing', 'Production tracking', 'Management dashboards'],
      ecommerce: ['Product catalog', 'Cart and online payments', 'Order management', 'Inventory tracking'],
      automation: ['Connectors between your tools', 'Configurable workflows', 'Triggers and schedules', 'Email alerts'],
      ai: ['Conversational assistant', 'Predictive analytics', 'Data extraction', 'Automated replies'],
      custom: ['Analysis of your specific need', 'Custom specifications', 'Rapid prototype', 'Integration with your existing tools'],
    },
    rangeCustom: 'Custom — defined together',
    timelineFlexible: 'Defined together',
    timelineAsap: '4 to 8 weeks',
    timelineAsapComplex: '6 to 10 weeks',
    timeline1to3: '2 to 4 months',
    timeline3to6: '4 to 7 months',
    budgetPhasedNote: ' Your budget will likely require a phased rollout — we will discuss it together.',
    budgetAdjustedNote: ' The estimate has been adjusted to your budget.',
    summaryTemplate: (typeLabel, sizeLabel, deadlineLabel) =>
      `Your project is ${typeLabel}, designed for ${sizeLabel} — deadline: ${deadlineLabel}.`,
    nextStepsStandard: [
      'Book a slot to define the scope with our team',
      'Receive a detailed quote and an indicative schedule',
      'Validate the priorities of the first version together',
    ],
    nextStepsComplex: [
      'Book a slot to define the scope with our team',
      'Receive a detailed quote and an indicative schedule',
      'Break the project into concrete, measurable phases',
    ],
  },
  testimonials: {
    overline: 'Testimonials',
    title: 'What our clients say about FOSA',
    subtitle: 'Our clients’ trust is our best proof of quality.',
    emptyTitle: 'The first client testimonials will appear here.',
    emptyText: 'We will soon publish feedback from our first clients, with their consent.',
    prev: 'Previous testimonial',
    next: 'Next testimonial',
    pagination: 'Testimonials pagination',
    goTo: 'Go to testimonials',
    formTitle: 'Share your experience',
    formText: 'A satisfied client is our best business card. Tell us about your project in a few lines.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    roleLabel: 'Role',
    rolePlaceholder: 'E.g. CEO',
    companyLabel: 'Company',
    companyPlaceholder: 'E.g. Company Ltd',
    emailLabel: 'Email',
    emailPlaceholder: 'you@company.com',
    ratingLabel: 'Your rating',
    ratingValue: (value) => `${value} star${value > 1 ? 's' : ''} out of 5`,
    quoteLabel: 'Your testimonial',
    quotePlaceholder: 'How did FOSA help with your project?',
    quoteCounter: '{count} / 1000',
    submit: 'Send my testimonial',
    submitting: 'Sending…',
    invalidName: 'Enter your name (at least 2 characters).',
    invalidEmail: 'Enter a valid email address.',
    invalidEmailDomain: 'This email address seems temporary or non-existent. Use a real address.',
    invalidRating: 'Choose a rating between 1 and 5 stars.',
    invalidQuote: 'Write a testimonial of at least 10 characters.',
    genericError: 'Something went wrong. Try again in a moment.',
    successTitle: 'Thank you!',
    successText: 'Your testimonial has been received. Thank you for your feedback!',
    alreadyTitle: 'Already submitted',
    alreadyText: 'A testimonial has already been submitted from this address. Thank you!',
    privacy: 'Your email address is only used to prevent duplicates. It is never published.',
    optional: 'Optional',
    loading: 'Loading testimonials…',
  },
  brand: {
    overline: 'Our vision',
    titleA: 'We don’t just build software.',
    titleAccent: 'move',
    titleB: 'We build tools that',
    titleEnd: 'businesses forward.',
    tagline: ['Intelligent.', 'Strategic.', 'Visionary.'],
    videoWaitingTitle: 'Our presentation video is coming soon.',
    videoWaitingText: 'See the FOSA platform in action very soon.',
    videoPlayAria: 'Play the FOSA presentation video',
    videoIframeTitle: 'FOSA presentation video',
    videoLabel: 'The platform in video',
    videoSub: 'Watch the presentation',
  },
  booking: {
    overline: 'Appointment',
    title: 'Let’s talk about your project.',
    subtitle: 'Book a slot with our team and let’s discuss your needs.',
    text: 'A 30-minute remote conversation to understand your context and identify the most relevant digital solutions for your business. No jargon, no commitment.',
    benefits: ['Analysis of your needs', 'Identification of the best solutions', 'Personalized advice', 'No commitment'],
    emailNoteA: 'Prefer to write?',
    emailLink: 'Contact us by email',
    emailNoteB: '— we get back to you within 24 business hours.',
    fallbackTitle: 'Our online calendar is coming soon.',
    fallbackText: 'In the meantime, email us to arrange a slot that suits you.',
    fallbackCta: 'Suggest a slot',
    loading: 'Loading the calendar…',
    loadingNote: 'It only takes a few seconds.',
    errorTitle: 'The calendar could not be loaded.',
    errorText: 'Open it directly in a new tab, or email us to arrange a slot.',
    openCalendar: 'Open the calendar',
    writeUs: 'Email us',
    incomplete: 'Display incomplete?',
    openInNewTab: 'Open the calendar in a new tab',
  },
  newsletter: {
    overline: 'Newsletter',
    titleA: 'Stay informed about our',
    titleAccent: 'product launches',
    titleB: '.',
    text: 'One email per month at most: news, digitalization tips for SMBs and early access. Unsubscribe in one click.',
    placeholder: 'you@company.com',
    submit: 'Subscribe',
    submitting: 'Subscribing…',
    invalid: 'Enter a valid email address, e.g. you@company.com',
    genericError: 'Something went wrong. Try again in a moment.',
    privacy: 'Your address stays private. No spam, ever.',
    successTitle: 'Welcome aboard!',
    successText: 'Your address has been saved. See you soon in your inbox.',
    alreadyTitle: 'You are already subscribed',
    alreadyText: 'This address is already on our list — no duplicate has been created.',
  },
  finalCta: {
    title: 'Your project deserves a tailored solution.',
    text: 'Tell us about your need, get a first estimate and talk with our team.',
    estimate: 'Get an estimate',
    booking: 'Book a meeting',
    whatsapp: 'Or chat with us directly on WhatsApp',
  },
  footer: {
    tagline: 'Digitize. Simplify. Propel your business.',
    solutionsTitle: 'Solutions',
    solutions: [
      { label: 'Management', href: '#solutions' },
      { label: 'CRM', href: '#solutions' },
      { label: 'Sales', href: '#solutions' },
      { label: 'Automation', href: '#solutions' },
      { label: 'AI', href: '#solutions' },
    ],
    companyTitle: 'Company',
    company: [
      { label: 'About', href: '#apropos' },
      { label: 'Our vision', href: '#apropos' },
      { label: 'Contact', href: '' },
    ],
    resourcesTitle: 'Resources',
    resources: [{ label: 'Documentation', soon: true }, { label: 'Blog', soon: true }, { label: 'Support', soon: false }],
    soon: 'Soon',
    copyright: '© 2026 FOSA. All rights reserved.',
    world: 'Digital tools for businesses around the world.',
    socialAria: 'FOSA on',
  },
}

export const translations: Record<Locale, Dict> = { fr, en }
