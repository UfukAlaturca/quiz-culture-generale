function formatDate(dateIso) {
  const [annee, mois, jour] = dateIso.split('-')
  return `${jour}/${mois}/${annee}`
}

function Accueil({ quiz, onDemarrer, onModeLibre }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 text-center">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Quiz Culture Générale</h1>
      <p className="text-slate-500 mb-6">Quiz du {formatDate(quiz.date)}</p>
      <p className="text-slate-600 mb-8">
        {quiz.questions.length} questions, du plus facile au plus difficile. Prêt ?
      </p>
      <button
        onClick={onDemarrer}
        className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors w-full mb-3"
      >
        Commencer
      </button>
      <button
        onClick={onModeLibre}
        className="text-indigo-600 font-medium px-6 py-2 rounded-xl hover:bg-indigo-50 transition-colors w-full"
      >
        Mode libre
      </button>
    </div>
  )
}

export default Accueil