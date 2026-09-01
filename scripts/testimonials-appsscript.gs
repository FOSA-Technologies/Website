/**
 * FOSA — API Témoignages (Google Sheets + Apps Script).
 *
 * doGet  : renvoie UNIQUEMENT les témoignages publiés (colonne approved) et
 *          notés >= 4. Ne renvoie JAMAIS l'e-mail. Les avis 1–3 étoiles
 *          restent privés : le filtrage « médiocre » est fait côté serveur.
 * doPost : valide, refuse les e-mails jetables ou de domaines inexistants
 *          (vérification DNS MX/A), dédoublonne par e-mail (insensible à la
 *          casse), applique un quota quotidien (~50) et ajoute une ligne.
 *          Honeypot silencieux.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * MISE EN SERVICE (une seule fois)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. Créer une feuille : https://sheets.new → renommer l'onglet « testimonials ».
 *    ⚠️ L'application Web s'exécute HORS du contexte de la feuille
 *    (getActiveSpreadsheet() y renvoie null) : elle a besoin de l'ID du
 *    classeur. Deux options, une seule suffit :
 *      a) Après avoir collé ce script : dans l'éditeur, sélectionner la
 *         fonction `setup` dans la barre d'outils → Exécuter → Autoriser.
 *         L'ID est mémorisé automatiquement (propriétés du script).
 *      b) Coller l'ID manuellement dans SPREADSHEET_ID ci-dessous
 *         (dans l'URL de la feuille : …/spreadsheets/d/<ID>/edit).
 * 2. Ligne d'en-tête exacte, colonnes A→H :
 *    timestamp | email | name | role | company | rating | quote | approved
 * 3. Extensions → Apps Script → remplacer le contenu par ce fichier → Ctrl+S.
 * 4. Déployer → Nouveau déploiement → Application Web :
 *      - Exécuter en tant que : Moi
 *      - Qui a accès : Tout le monde      ← indispensable pour les visiteurs
 *    Déployer → Autoriser (Compte avancé → Accéder à « … » (non sécurisé) → Autoriser).
 * 5. Copier l'URL « .../exec » dans src/lib/testimonials.ts (TESTIMONIALS_ENDPOINT).
 * 6. Vérifier en navigation privée : ouvrir l'URL → { "ok": true, "testimonials": [] }.
 *
 * IMPORTANT — après chaque modification du script :
 *   Déployer → Gérer les déploiements → Modifier → Nouvelle version → Enregistrer.
 *   L'URL /exec reste identique. Ne PAS faire « Nouveau déploiement » :
 *   cela créerait une nouvelle URL qu'il faudrait recopier dans la config.
 *
 * La feuille reste PRIVÉE : les e-mails y sont stockés en colonne B et ne
 * sont jamais exposés par l'API.
 */

var SHEET_NAME = 'testimonials'
/** Version du script, renvoyée dans chaque réponse (champ `v`) pour vérifier
 *  en curl quelle version est réellement déployée. À incrémenter à chaque
 *  modification. */
var SCRIPT_VERSION = '4'
/** ID de la feuille (URL : …/spreadsheets/d/<ID>/edit). Optionnel : la
 *  fonction setup() (ci-dessous) le mémorise automatiquement. */
var SPREADSHEET_ID = '13x09pzpVpbT5OxByB4jWAROiMhIg7LYt56zA24JKD_E'
var MAX_DAILY_SUBMISSIONS = 50
var MIN_QUOTE_LENGTH = 10
var MAX_QUOTE_LENGTH = 1000

/**
 * Domaines de messagerie jetable connus. Les soumissions venant de ces
 * domaines sont refusées (liste de base — le gros du filtrage est fait
 * par la vérification DNS MX ci-dessous).
 */
var DISPOSABLE_DOMAINS = [
  '10mail.org',
  '10minutemail.com',
  '10minutemail.net',
  'discard.email',
  'dropmail.me',
  'emailondeck.com',
  'fakemail.net',
  'fakemailgenerator.com',
  'getnada.com',
  'guerrillamail.biz',
  'guerrillamail.com',
  'guerrillamail.de',
  'guerrillamail.info',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'harakirimail.com',
  'inboxalias.com',
  'mailcatch.com',
  'maildrop.cc',
  'mailforspam.com',
  'mailinator.com',
  'mailinator.net',
  'mailnesia.com',
  'mailnull.com',
  'mailpoof.com',
  'mailsac.com',
  'minuteinbox.com',
  'moakt.com',
  'mt2014.com',
  'mytrashmail.com',
  'oneoffemail.com',
  'sharklasers.com',
  'spamgourmet.com',
  'spamherelots.com',
  'temp-mail.io',
  'temp-mail.org',
  'temp-mail.ru',
  'tempemail.co',
  'tempmail.com',
  'tempmail.de',
  'tempmail.email',
  'tempmail.net',
  'tempmailaddress.com',
  'throwaway.email',
  'throwawaymail.com',
  'trash-mail.com',
  'trashmail.com',
  'trashmail.net',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
]

/** Durée de cache des réponses DNS (secondes). */
var DNS_CACHE_SECONDS = 6 * 60 * 60

/** À exécuter UNE FOIS depuis l'éditeur (barre d'outils : setup → Exécuter) :
 *  mémorise l'ID du classeur dans les propriétés du script, pour que
 *  l'application Web puisse ouvrir la feuille (getActive() y renvoie null). */
function setup() {
  var ss = SpreadsheetApp.getActive()
  if (!ss) {
    throw new Error('setup() doit être lancée depuis l’éditeur lié à la feuille, pas depuis l’URL web.')
  }
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', ss.getId())
  return 'OK — ID enregistré : ' + ss.getId()
}

/** Feuille de stockage. En application Web, getActive() renvoie null
 *  (exécution hors contexte de la feuille) → repli sur openById via
 *  SPREADSHEET_ID ou l'ID mémorisé par setup(). */
function sheet_() {
  var ss = SpreadsheetApp.getActive()
  if (!ss) {
    var id = SPREADSHEET_ID
    if (!id) id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')
    if (id) ss = SpreadsheetApp.openById(id)
  }
  if (!ss) return null
  return ss.getSheetByName(SHEET_NAME)
}

function json_(payload) {
  payload.v = SCRIPT_VERSION
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}

/** Domaine d'une adresse e-mail (minuscules), ou '' si mal formée. */
function emailDomain_(email) {
  var parts = email.split('@')
  return parts.length === 2 ? parts[1].toLowerCase() : ''
}

/**
 * L'adresse e-mail est-elle plausible ?
 * 1. Le domaine n'est pas un service jetable connu.
 * 2. Le domaine publie un enregistrement MX (ou à défaut A/AAAA) : sinon,
 *    aucune boîte aux lettres ne peut exister derrière lui.
 * Toute défaillance de la vérification DNS laisse passer (fail-open) :
 * on ne bloque jamais un vrai client pour un souci d'infrastructure.
 */
function emailIsReal_(email) {
  var domain = emailDomain_(email)
  if (!domain) return false
  if (DISPOSABLE_DOMAINS.indexOf(domain) !== -1) return false

  var cache = CacheService.getScriptCache()
  // Préfixe v2 : ignore les résultats mis en cache par l'ancienne version,
  // qui comparait mal les types DNS et a pu mémoriser des refus à tort.
  var cacheKey = 'dns2_' + domain
  var cached = cache.get(cacheKey)
  if (cached !== null) return cached === '1'

  var exists = dnsHasRecords_(domain, 'MX') || dnsHasRecords_(domain, 'A')
  cache.put(cacheKey, exists ? '1' : '0', DNS_CACHE_SECONDS)
  return exists
}

/** Codes numériques des types DNS dans la réponse de dns.google :
 *  le champ `type` est un nombre (15 = MX, 1 = A), pas la chaîne « MX ». */
var DNS_TYPE_CODES = { A: 1, MX: 15 }

/** Interroge dns.google pour un type d'enregistrement. Fail-open sur toute erreur. */
function dnsHasRecords_(domain, type) {
  try {
    var url = 'https://dns.google/resolve?name=' + encodeURIComponent(domain) + '&type=' + type
    var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true })
    if (res.getResponseCode() !== 200) return true
    var data = JSON.parse(res.getContentText())
    if (data.Status === 2) return true // SERVFAIL : fail-open
    var answers = data.Answer || []
    for (var i = 0; i < answers.length; i++) {
      if (Number(answers[i].type) === DNS_TYPE_CODES[type]) return true
    }
    return false // NOERROR sans enregistrement, ou NXDOMAIN
  } catch (err) {
    return true // DoH injoignable : ne pas bloquer les vrais utilisateurs
  }
}

/** GET — liste publique : approved && rating >= 4, plus récents d'abord, max 50. */
function doGet() {
  try {
    var values = sheet_().getDataRange().getValues() // [0] = ligne d'en-tête
    var entries = []
    for (var i = 1; i < values.length; i++) {
      var row = values[i]
      var rating = Number(row[5])
      if (row[7] !== true) continue // modération manuelle (dépublier = passer à FALSE)
      if (!(rating >= 4)) continue // filtre « médiocre » côté serveur
      var name = String(row[2] || '').trim()
      var quote = String(row[6] || '').trim()
      if (!name || !quote) continue // lignes incomplètes
      entries.push({
        ts: String(row[0] || ''), // ISO — tri lexicographique valide
        name: name,
        role: String(row[3] || '').trim(),
        company: String(row[4] || '').trim(),
        quote: quote,
        rating: rating, // 4 ou 5 uniquement
      })
    }
    entries.sort(function (a, b) {
      return a.ts < b.ts ? 1 : a.ts > b.ts ? -1 : 0
    })
    var testimonials = entries.slice(0, 50).map(function (e) {
      return { name: e.name, role: e.role, company: e.company, quote: e.quote, rating: e.rating }
    })
    return json_({ ok: true, testimonials: testimonials })
  } catch (err) {
    // Liste vide : le site retombe en silence sur sa liste statique.
    // `debug` est ignoré par le site ; il sert au diagnostic (curl).
    return json_({ ok: true, testimonials: [], debug: 'doGet: ' + err })
  }
}

/** POST — soumission validée, dédoublonnée, plafonnée. */
function doPost(e) {
  try {
    var data = {}
    try {
      data = JSON.parse(e.postData.contents || '{}')
    } catch (err) {
      return json_({ ok: false, status: 'error' })
    }

    // Honeypot : champ « website » rempli = bot → succès factice, rien n'est écrit.
    if (typeof data.website === 'string' && data.website.length > 0) {
      return json_({ ok: true, status: 'success' })
    }

    // Validation (longueurs plafonnées côté serveur).
    var email = String(data.email || '').trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
      return json_({ ok: false, status: 'error' })
    }

    // L'e-mail doit exister : domaine non jetable + enregistrements DNS réels.
    // (Avant le verrou : la résolution DNS peut prendre ~1 s.)
    if (!emailIsReal_(email)) return json_({ ok: false, status: 'invalid_email' })
    var name = String(data.name || '').trim()
    if (name.length < 2 || name.length > 80) return json_({ ok: false, status: 'error' })
    var role = String(data.role || '').trim().slice(0, 60)
    var company = String(data.company || '').trim().slice(0, 80)
    var rating = Number(data.rating)
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return json_({ ok: false, status: 'error' })
    }
    var quote = String(data.quote || '').trim()
    if (quote.length < MIN_QUOTE_LENGTH || quote.length > MAX_QUOTE_LENGTH) {
      return json_({ ok: false, status: 'error' })
    }

    // Quota quotidien + dédup, sous verrou (course entre deux POST simultanés).
    var props = PropertiesService.getScriptProperties()
    var key = 'submissions_' + Utilities.formatDate(new Date(), 'GMT', 'yyyyMMdd')
    var lock = LockService.getScriptLock()
    if (!lock.tryLock(30000)) {
      return json_({ ok: false, status: 'error', debug: 'verrou occupé' })
    }
    try {
      var count = Number(props.getProperty(key) || 0)
      if (count >= MAX_DAILY_SUBMISSIONS) return json_({ ok: false, status: 'rate' })

      var sheet = sheet_()
      if (!sheet) {
        return json_({
          ok: false,
          status: 'error',
          debug:
            'feuille introuvable — vérifier : onglet « ' +
            SHEET_NAME +
            ' » dans le classeur, et setup() exécutée ou SPREADSHEET_ID rempli',
        })
      }

      var lastRow = sheet.getLastRow()
      var emails = []
      if (lastRow > 1) {
        emails = sheet
          .getRange(2, 2, lastRow - 1, 1)
          .getValues()
          .map(function (r) {
            return String(r[0])
          })
      }
      if (emails.indexOf(email) !== -1) return json_({ ok: true, status: 'already' })

      sheet.appendRow([new Date().toISOString(), email, name, role, company, rating, quote, true])
      props.setProperty(key, String(count + 1))
      return json_({ ok: true, status: 'success' })
    } finally {
      lock.releaseLock()
    }
  } catch (err) {
    // Toujours répondre en JSON : un doPost sans réponse = erreur « CORS »
    // illisible côté navigateur. `debug` est ignoré par le site (curl only).
    return json_({ ok: false, status: 'error', debug: 'doPost: ' + err })
  }
}
