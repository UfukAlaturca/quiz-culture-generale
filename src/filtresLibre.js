// Seuil minimum de questions pour qu'une catégorie ou un niveau soit proposé en mode libre.
// Volontairement abaissé à 2 pendant la phase de tests (la banque est encore petite,
// une bonne partie des catégories/niveaux n'atteindraient jamais 10 questions sinon).
// À REMONTER À 10 avant la mise en production, pour garantir des parties suffisamment fournies.
export const SEUIL_MINIMUM_MODE_LIBRE = 2

// Nombre de questions visées par partie en mode libre (identique au mode quotidien).
const TAILLE_QUIZ_LIBRE = 10

// Ordre pédagogique (du plus facile au plus difficile), pas alphabétique.
const ORDRE_NIVEAUX = ['facile', 'moyen', 'difficile', 'très difficile']

// Une question n'est éligible au mode libre que si elle a déjà été "révélée" comme quiz
// du jour (date_quotidien passée ou égale à aujourd'hui), ou si elle n'a jamais été prévue
// pour le mode quotidien (date_quotidien = null). Ça évite que le mode libre ne dévoile par
// avance le contenu d'un quotidien pas encore publié.
function estEligibleModeLibre(question, aujourdHui) {
  return question.date_quotidien === null || question.date_quotidien <= aujourdHui
}

function questionsEligiblesModeLibre(banque, aujourdHui) {
  return banque.questions.filter((q) => estEligibleModeLibre(q, aujourdHui))
}

function compterPar(questions, champ) {
  const compteur = {}
  for (const q of questions) {
    compteur[q[champ]] = (compteur[q[champ]] || 0) + 1
  }
  return compteur
}

// Retourne les catégories ayant au moins `seuil` questions déjà éligibles, triées alphabétiquement.
// Chaque entrée : { categorie, total }
export function categoriesEligibles(banque, aujourdHui, seuil = SEUIL_MINIMUM_MODE_LIBRE) {
  const compteur = compterPar(questionsEligiblesModeLibre(banque, aujourdHui), 'categorie')
  return Object.entries(compteur)
    .filter(([, total]) => total >= seuil)
    .sort((a, b) => a[0].localeCompare(b[0], 'fr'))
    .map(([categorie, total]) => ({ categorie, total }))
}

// Retourne les niveaux ayant au moins `seuil` questions déjà éligibles, dans l'ordre facile -> très difficile.
// Chaque entrée : { niveau, total }
export function niveauxEligibles(banque, aujourdHui, seuil = SEUIL_MINIMUM_MODE_LIBRE) {
  const compteur = compterPar(questionsEligiblesModeLibre(banque, aujourdHui), 'niveau')
  return ORDRE_NIVEAUX.filter((niveau) => (compteur[niveau] || 0) >= seuil).map((niveau) => ({
    niveau,
    total: compteur[niveau] || 0,
  }))
}

function melanger(tableau) {
  const copie = [...tableau]
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copie[i], copie[j]] = [copie[j], copie[i]]
  }
  return copie
}

// Construit un quiz à partir d'une catégorie, parmi les questions déjà éligibles au mode libre.
// Toutes les questions de la catégorie sont éligibles (tous niveaux confondus), jamais de
// complément depuis une autre catégorie. Si la catégorie a moins de TAILLE_QUIZ_LIBRE questions
// éligibles, le quiz sera plus court.
export function construireQuizParCategorie(banque, categorie, aujourdHui) {
  const questions = questionsEligiblesModeLibre(banque, aujourdHui).filter(
    (q) => q.categorie === categorie
  )
  return melanger(questions).slice(0, TAILLE_QUIZ_LIBRE)
}

// Construit un quiz à partir d'un niveau, parmi les questions déjà éligibles au mode libre.
// Toutes les questions du niveau sont éligibles (toutes catégories confondues). Si le niveau a
// moins de TAILLE_QUIZ_LIBRE questions éligibles, le quiz sera plus court.
export function construireQuizParNiveau(banque, niveau, aujourdHui) {
  const questions = questionsEligiblesModeLibre(banque, aujourdHui).filter(
    (q) => q.niveau === niveau
  )
  return melanger(questions).slice(0, TAILLE_QUIZ_LIBRE)
}