import { useState } from 'react'

const LETTRES = ['A', 'B', 'C', 'D']

function Question({
  question,
  numero,
  total,
  reponseSelectionnee,
  modeLibre,
  onRepondre,
  onSuivant,
  onQuitter,
}) {
  const [confirmationQuitter, setConfirmationQuitter] = useState(false)
  const aRepondu = reponseSelectionnee !== null

  function couleurBouton(index) {
    if (!aRepondu) {
      return 'bg-carte dark:bg-carte-nuit hover:bg-badge-fond/20 dark:hover:bg-badge-fond-nuit/20 border-badge-fond dark:border-badge-fond-nuit text-texte dark:text-texte-nuit'
    }
    if (index === question.reponse_correcte) {
      return 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-400 dark:border-emerald-600 text-emerald-800 dark:text-emerald-200'
    }
    if (index === reponseSelectionnee) {
      return 'bg-rose-100 dark:bg-rose-900/40 border-rose-400 dark:border-rose-600 text-rose-800 dark:text-rose-200'
    }
    return 'bg-carte dark:bg-carte-nuit border-badge-fond dark:border-badge-fond-nuit text-texte-doux dark:text-texte-doux-nuit'
  }

  if (confirmationQuitter) {
    return (
      <div className="carte-ludique p-6 text-center">
        <p className="font-titre font-bold text-texte dark:text-texte-nuit mb-2">
          Abandonner ce quiz ?
        </p>
        <p className="text-texte-doux dark:text-texte-doux-nuit text-sm mb-6">
          Ta progression sur ces questions sera perdue.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setConfirmationQuitter(false)}
            className="flex-1 bg-badge-fond dark:bg-badge-fond-nuit text-badge-texte dark:text-badge-texte-nuit font-bold px-4 py-3 rounded-2xl hover:opacity-80 transition-opacity"
          >
            Annuler
          </button>
          <button
            onClick={onQuitter}
            className="flex-1 bg-rose-600 dark:bg-rose-500 text-white font-bold px-4 py-3 rounded-2xl hover:opacity-90 transition-opacity"
          >
            Quitter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="carte-ludique p-6">
      <div className="w-full bg-badge-fond dark:bg-badge-fond-nuit rounded-full h-2 mb-4">
        <div
          className="bg-accent dark:bg-accent-nuit h-2 rounded-full transition-all"
          style={{ width: `${(numero / total) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-texte-doux dark:text-texte-doux-nuit font-semibold">
          Question {numero} / {total}
        </p>
        {modeLibre && (
          <button
            onClick={() => setConfirmationQuitter(true)}
            className="text-sm text-texte-doux dark:text-texte-doux-nuit hover:text-texte dark:hover:text-texte-nuit transition-colors"
          >
            Quitter
          </button>
        )}
      </div>

      <h2 className="font-titre font-bold text-lg text-texte dark:text-texte-nuit mb-5">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.choix.map((choix, index) => (
          <button
            key={index}
            disabled={aRepondu}
            onClick={() => onRepondre(index)}
            className={`w-full text-left border-2 rounded-2xl px-4 py-3 transition-colors ${couleurBouton(index)}`}
          >
            <span className="font-titre font-bold mr-2">{LETTRES[index]})</span>
            {choix}
          </button>
        ))}
      </div>

      {aRepondu && (
        <div className="mt-5 p-4 rounded-2xl bg-badge-fond/40 dark:bg-badge-fond-nuit/40 text-sm text-texte dark:text-texte-nuit">
          <p className="mb-3">{question.explication}</p>
          <button
            onClick={onSuivant}
            className="bouton-principal-ludique font-titre font-bold px-5 py-2 rounded-2xl transition-transform"
          >
            {numero === total ? 'Voir le score' : 'Question suivante'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Question