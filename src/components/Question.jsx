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
      return 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
    }
    if (index === question.reponse_correcte) {
      return 'bg-emerald-100 border-emerald-400 text-emerald-800'
    }
    if (index === reponseSelectionnee) {
      return 'bg-rose-100 border-rose-400 text-rose-800'
    }
    return 'bg-white border-slate-200 text-slate-400'
  }

  if (confirmationQuitter) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center">
        <p className="text-slate-700 font-medium mb-2">Abandonner ce quiz ?</p>
        <p className="text-slate-500 text-sm mb-6">Ta progression sur ces questions sera perdue.</p>
        <div className="flex gap-3">
          <button
            onClick={() => setConfirmationQuitter(false)}
            className="flex-1 bg-slate-100 text-slate-700 font-semibold px-4 py-3 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onQuitter}
            className="flex-1 bg-rose-600 text-white font-semibold px-4 py-3 rounded-xl hover:bg-rose-700 transition-colors"
          >
            Quitter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all"
          style={{ width: `${(numero / total) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-slate-400">Question {numero} / {total}</p>
        {modeLibre && (
          <button
            onClick={() => setConfirmationQuitter(true)}
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            Quitter
          </button>
        )}
      </div>

      <h2 className="text-lg font-semibold text-slate-800 mb-5">{question.question}</h2>

      <div className="space-y-3">
        {question.choix.map((choix, index) => (
          <button
            key={index}
            disabled={aRepondu}
            onClick={() => onRepondre(index)}
            className={`w-full text-left border rounded-xl px-4 py-3 transition-colors ${couleurBouton(index)}`}
          >
            <span className="font-semibold mr-2">{LETTRES[index]})</span>
            {choix}
          </button>
        ))}
      </div>

      {aRepondu && (
        <div className="mt-5 p-4 rounded-xl bg-slate-50 text-sm text-slate-600">
          <p className="mb-3">{question.explication}</p>
          <button
            onClick={onSuivant}
            className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            {numero === total ? 'Voir le score' : 'Question suivante'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Question