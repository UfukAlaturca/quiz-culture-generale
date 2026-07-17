import { useState } from 'react'
import { construireTextePartage } from '../partage'

function Score({ score, total, historique, titreQuiz, onRejouer }) {
  const [etatBouton, setEtatBouton] = useState('inactif') // 'inactif' | 'succes' | 'echec'

  // Partage natif = le menu de partage du système (WhatsApp, Messages, Instagram, etc.),
  // disponible sur la plupart des navigateurs mobiles. On vérifie qu'il existe avant de l'utiliser,
  // sinon on retombe sur la copie dans le presse-papier (comportement des navigateurs de bureau).
  const partageNatifDisponible = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  async function partagerResultat() {
    const texte = construireTextePartage({ titreQuiz, score, total, historique })

    if (partageNatifDisponible) {
      try {
        await navigator.share({ text: texte })
      } catch (erreur) {
        // Si l'utilisateur annule simplement le menu de partage, ce n'est pas une erreur à signaler.
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
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h1 className="text-2xl font-bold text-slate-800 text-center mb-1">Résultat</h1>
      {titreQuiz && (
        <p className="text-center text-sm text-slate-400 mb-1">{titreQuiz}</p>
      )}
      <p className="text-center text-slate-500 mb-6">
        {score} / {total} bonnes réponses
      </p>

      <div className="space-y-3 mb-6">
        {historique.map((entree, index) => (
          <div
            key={entree.id}
            className={`rounded-xl border p-3 text-sm ${
              entree.correct ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'
            }`}
          >
            <p className="font-medium text-slate-700 mb-1">
              {index + 1}. {entree.question}
            </p>
            <p className="text-slate-500">Ta réponse : {entree.choix[entree.indexChoisi]}</p>
            {!entree.correct && (
              <p className="text-slate-500">Bonne réponse : {entree.choix[entree.indexCorrect]}</p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={partagerResultat}
        className="w-full bg-slate-100 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors mb-3"
      >
        {libelleBouton()}
      </button>

      <button
        onClick={onRejouer}
        className="w-full bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
      >
        Rejouer
      </button>
    </div>
  )
}

export default Score