import { useState } from 'react'
import { construireTextePartage } from '../partage'

function Score({ score, total, historique, titreQuiz, onRejouer }) {
  const [etatBouton, setEtatBouton] = useState('inactif') // 'inactif' | 'succes' | 'echec'

  const partageNatifDisponible = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  async function partagerResultat() {
    const texte = construireTextePartage({ titreQuiz, score, total, historique })

    if (partageNatifDisponible) {
      try {
        await navigator.share({ text: texte })
      } catch (erreur) {
        if (erreur.name !== 'AbortError') {
          setEtatBouton('echec')
          setTimeout(() => setEtatBouton('inactif'), 2000)
        }
      }
      return
    }

    try {
      await navigator.clipboard.writeText(texte)
      setEtatBouton('succes')
    } catch (erreur) {
      setEtatBouton('echec')
    }
    setTimeout(() => setEtatBouton('inactif'), 2000)
  }

  function libelleBouton() {
    if (etatBouton === 'succes') return 'Copié !'
    if (etatBouton === 'echec') return 'Échec du partage'
    return partageNatifDisponible ? 'Partager le résultat' : 'Copier le résultat'
  }

  return (
    <div className="carte-ludique p-6">
      <h1 className="font-titre font-extrabold text-2xl text-texte dark:text-texte-nuit text-center mb-1">
        Résultat
      </h1>
      {titreQuiz && (
        <p className="text-center text-sm text-texte-doux dark:text-texte-doux-nuit mb-1">{titreQuiz}</p>
      )}
      <p className="text-center font-titre font-bold text-badge-texte dark:text-badge-texte-nuit mb-6">
        {score} / {total} bonnes réponses
      </p>

      <div className="space-y-3 mb-6">
        {historique.map((entree, index) => (
          <div
            key={entree.id}
            className={`rounded-2xl border-2 p-3 text-sm ${
              entree.correct
                ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/30'
                : 'border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/30'
            }`}
          >
            <p className="font-bold text-texte dark:text-texte-nuit mb-1">
              {index + 1}. {entree.question}
            </p>
            <p className="text-texte-doux dark:text-texte-doux-nuit">
              Ta réponse : {entree.choix[entree.indexChoisi]}
            </p>
            {!entree.correct && (
              <p className="text-texte-doux dark:text-texte-doux-nuit">
                Bonne réponse : {entree.choix[entree.indexCorrect]}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={partagerResultat}
        className="w-full bg-badge-fond dark:bg-badge-fond-nuit text-badge-texte dark:text-badge-texte-nuit font-bold px-6 py-3 rounded-2xl hover:opacity-80 transition-opacity mb-3"
      >
        {libelleBouton()}
      </button>

      <button
        onClick={onRejouer}
        className="bouton-principal-ludique font-titre font-bold w-full px-6 py-4 rounded-2xl transition-transform"
      >
        Rejouer
      </button>
    </div>
  )
}

export default Score