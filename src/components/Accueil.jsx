function formatDate(dateIso) {
  const [annee, mois, jour] = dateIso.split('-')
  return `${jour}/${mois}/${annee}`
}

function Accueil({ quiz, resultatQuotidien, streak, onDemarrer, onModeLibre, onRevoirResultat, onStatistiques, onReglages }) {
  return (
    <div className="carte-ludique p-8 text-center relative">
      <button
        onClick={onReglages}
        aria-label="Réglages"
        className="absolute top-5 right-5 text-texte-doux dark:text-texte-doux-nuit hover:text-texte dark:hover:text-texte-nuit transition-colors tap-sobre"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      <span className="inline-block bg-badge-fond dark:bg-badge-fond-nuit text-badge-texte dark:text-badge-texte-nuit font-bold text-sm px-4 py-1.5 rounded-full mb-4">
        Défi du jour
      </span>
      <h1 className="font-titre font-extrabold text-2xl text-texte dark:text-texte-nuit mb-2">
        Quiz Culture Générale
      </h1>
      <p className="font-titre font-bold text-badge-texte dark:text-badge-texte-nuit mb-2">
        Quiz du {formatDate(quiz.date)}
      </p>

      {streak > 1 && (
        <p className="text-sm font-bold text-texte dark:text-texte-nuit mb-4">
          🔥 {streak} jours de suite
        </p>
      )}

      {resultatQuotidien ? (
        <>
          <p className="text-texte-doux dark:text-texte-doux-nuit mb-6">
            Tu as déjà relevé le défi aujourd'hui : {resultatQuotidien.score} / {resultatQuotidien.total}.
            Reviens demain pour un nouveau quiz !
          </p>
          <button
            onClick={onRevoirResultat}
            className="bouton-principal-ludique font-titre font-bold text-lg w-full rounded-2xl px-6 py-4 mb-3 transition-transform"
          >
            Revoir mon résultat
          </button>
        </>
      ) : (
        <>
          <p className="text-texte-doux dark:text-texte-doux-nuit mb-8">
            {quiz.questions.length} questions, du plus facile au plus difficile. Prêt ?
          </p>
          <button
            onClick={onDemarrer}
            className="bouton-principal-ludique font-titre font-bold text-lg w-full rounded-2xl px-6 py-4 mb-3 transition-transform"
          >
            Commencer
          </button>
        </>
      )}

      <button
        onClick={onModeLibre}
        className="w-full font-bold text-badge-texte dark:text-badge-texte-nuit border-2 border-badge-fond dark:border-badge-fond-nuit rounded-2xl px-6 py-3 mb-3 hover:bg-badge-fond/30 dark:hover:bg-badge-fond-nuit/30 transition-colors tap-sobre"
      >
        Mode libre
      </button>

      <button
        onClick={onStatistiques}
        className="text-sm text-texte-doux dark:text-texte-doux-nuit font-semibold hover:text-texte dark:hover:text-texte-nuit transition-colors tap-sobre"
      >
        Voir mes statistiques
      </button>
    </div>
  )
}

export default Accueil