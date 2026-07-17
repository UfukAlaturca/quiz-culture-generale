// Lien réel vers l'application, déployée sur Vercel.
const LIEN_PARTAGE = 'https://quiz-culture-generale-beta.vercel.app'

// Construit le texte à copier dans le presse-papier, façon Wordle : une grille d'emojis
// représentant les bonnes/mauvaises réponses dans l'ordre, sans jamais révéler le contenu
// des questions ni les réponses elles-mêmes.
export function construireTextePartage({ titreQuiz, score, total, historique }) {
  const grille = historique.map((entree) => (entree.correct ? '🟩' : '⬛')).join('')

  const ligneScore = titreQuiz ? `${titreQuiz} : ${score}/${total}` : `${score}/${total}`

  return ['Quiz Culture Générale', ligneScore, '', grille, '', LIEN_PARTAGE].join('\n')
}