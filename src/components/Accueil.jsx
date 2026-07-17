function formatDate(dateIso) {
  const [annee, mois, jour] = dateIso.split('-')
  return `${jour}/${mois}/${annee}`
}

function Accueil({ quiz, onDemarrer, onModeLibre }) {
  return (
    <div className="carte-ludique p-8 text-center">
      <span className="inline-block bg-badge-fond dark:bg-badge-fond-nuit text-badge-texte dark:text-badge-texte-nuit font-bold text-sm px-4 py-1.5 rounded-full mb-4">
        Défi du jour
      </span>
      <h1 className="font-titre font-extrabold text-2xl text-texte dark:text-texte-nuit mb-2">
        Quiz Culture Générale
      </h1>
      <p className="font-titre font-bold text-badge-texte dark:text-badge-texte-nuit mb-6">
        Quiz du {formatDate(quiz.date)}
      </p>
      <p className="text-texte-doux dark:text-texte-doux-nuit mb-8">
        {quiz.questions.length} questions, du plus facile au plus difficile. Prêt ?
      </p>
      <button
        onClick={onDemarrer}
        className="bouton-principal-ludique font-titre font-bold text-lg w-full rounded-2xl px-6 py-4 mb-3 transition-transform"
      >
        Commencer
      </button>
      <button
        onClick={onModeLibre}
        className="w-full font-bold text-badge-texte dark:text-badge-texte-nuit border-2 border-badge-fond dark:border-badge-fond-nuit rounded-2xl px-6 py-3 hover:bg-badge-fond/30 dark:hover:bg-badge-fond-nuit/30 transition-colors"
      >
        Mode libre
      </button>
    </div>
  )
}

export default Accueil