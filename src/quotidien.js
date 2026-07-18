// Clé unique sous laquelle toute la progression de l'utilisateur est stockée dans localStorage
// (l'espace de stockage du navigateur qui persiste entre les fermetures d'onglet/app).
const CLE_STOCKAGE = 'quiz-culture-generale:progression'

const PROGRESSION_PAR_DEFAUT = {
  dernierJourJoue: null, // date ISO (ex: "2026-07-18") du dernier quotidien complété
  streakActuelle: 0, // nombre de jours calendaires consécutifs où un quotidien a été joué
  meilleureStreak: 0,
  resultats: {}, // { "2026-07-18": { score, total, historique } }
}

// Lit la progression sauvegardée localement, avec repli silencieux sur les valeurs par défaut
// si rien n'est stocké, ou si le stockage est inaccessible (navigation privée, quota dépassé, etc.).
// Ce repli silencieux est volontaire : la progression est un bonus, jamais bloquant pour jouer.
export function chargerProgression() {
  try {
    const brut = window.localStorage.getItem(CLE_STOCKAGE)
    if (!brut) return { ...PROGRESSION_PAR_DEFAUT, resultats: {} }
    const donnees = JSON.parse(brut)
    return { ...PROGRESSION_PAR_DEFAUT, ...donnees }
  } catch (erreur) {
    return { ...PROGRESSION_PAR_DEFAUT, resultats: {} }
  }
}

function sauvegarderProgression(progression) {
  try {
    window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(progression))
  } catch (erreur) {
    // Stockage indisponible : on continue sans bloquer l'utilisateur, la partie reste jouable.
  }
}

// Calcule la date ISO de la veille d'une date ISO donnée (ex: "2026-07-18" -> "2026-07-17").
function veilleDe(dateIso) {
  const date = new Date(`${dateIso}T00:00:00`)
  date.setDate(date.getDate() - 1)
  const annee = date.getFullYear()
  const mois = String(date.getMonth() + 1).padStart(2, '0')
  const jour = String(date.getDate()).padStart(2, '0')
  return `${annee}-${mois}-${jour}`
}

// Le quotidien du jour (date calendaire reelle) a-t-il deja ete joue aujourd'hui ?
// Retourne le resultat enregistre ({ score, total, historique }) si oui, sinon null.
export function resultatDuJour(aujourdHui) {
  const progression = chargerProgression()
  if (progression.dernierJourJoue !== aujourdHui) return null
  return progression.resultats[aujourdHui] || null
}

export function streakActuelle() {
  return chargerProgression().streakActuelle
}

// Enregistre le resultat du quotidien du jour et met a jour la serie de jours consecutifs.
// Idempotent : rappeler cette fonction plusieurs fois pour la meme date ne fausse jamais la serie
// (utile car React peut ré-exécuter un effet plusieurs fois en développement).
export function enregistrerResultatDuJour(aujourdHui, score, total, historique) {
  const progression = chargerProgression()

  if (progression.dernierJourJoue === aujourdHui) {
    const misAJour = {
      ...progression,
      resultats: { ...progression.resultats, [aujourdHui]: { score, total, historique } },
    }
    sauvegarderProgression(misAJour)
    return misAJour
  }

  const hier = veilleDe(aujourdHui)
  const nouvelleStreak = progression.dernierJourJoue === hier ? progression.streakActuelle + 1 : 1

  const misAJour = {
    dernierJourJoue: aujourdHui,
    streakActuelle: nouvelleStreak,
    meilleureStreak: Math.max(nouvelleStreak, progression.meilleureStreak),
    resultats: { ...progression.resultats, [aujourdHui]: { score, total, historique } },
  }

  sauvegarderProgression(misAJour)
  return misAJour
}