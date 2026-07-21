// Gère les préférences utilisateur persistantes (mémorisées dans le localStorage du navigateur,
// le même mécanisme que ta streak). Volontairement séparé du reducer : le reducer se réinitialise
// à chaque quiz (retour accueil, rejouer...), alors qu'une préférence doit survivre à ces remises
// à zéro. La garder ici évite tout risque de la perdre par mégarde lors d'un reset d'état.

const CLE_ANIMATIONS_REDUITES = 'quiz-cg-animations-reduites'

export function lireAnimationsReduites() {
  try {
    return localStorage.getItem(CLE_ANIMATIONS_REDUITES) === 'true'
  } catch {
    return false
  }
}

export function ecrireAnimationsReduites(valeur) {
  try {
    localStorage.setItem(CLE_ANIMATIONS_REDUITES, valeur ? 'true' : 'false')
  } catch {
    // localStorage indisponible (navigation privée, quota plein...) : on ignore silencieusement.
    // La préférence ne sera simplement pas mémorisée d'une session à l'autre.
  }
}