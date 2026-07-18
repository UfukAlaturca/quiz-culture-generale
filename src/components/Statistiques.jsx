function CarteStat({ valeur, label }) {
  return (
    <div className="bg-badge-fond/40 dark:bg-badge-fond-nuit/40 rounded-2xl p-4 text-center">
      <p className="font-titre font-extrabold text-2xl text-texte dark:text-texte-nuit">{valeur}</p>
      <p className="text-xs text-texte-doux dark:text-texte-doux-nuit mt-1">{label}</p>
    </div>
  )
}

function Statistiques({ stats, onRetour }) {
  const scoreMax = Math.max(...Object.values(stats.distribution), 1)

  return (
    <div className="carte-ludique p-6">
      <h1 className="font-titre font-extrabold text-2xl text-texte dark:text-texte-nuit text-center mb-6">
        Statistiques
      </h1>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <CarteStat valeur={stats.totalJoue} label="Parties jouées" />
        <CarteStat valeur={stats.totalJoue > 0 ? stats.scoreMoyen.toFixed(1) : '—'} label="Score moyen" />
        <CarteStat valeur={stats.streakActuelle} label="Série actuelle" />
        <CarteStat valeur={stats.meilleureStreak} label="Meilleure série" />
      </div>

      {stats.totalJoue > 0 ? (
        <>
          <p className="font-bold text-sm text-texte dark:text-texte-nuit mb-3">
            Répartition des scores
          </p>
          <div className="space-y-1.5 mb-6">
            {Object.entries(stats.distribution)
              .reverse()
              .map(([score, nombre]) => (
                <div key={score} className="flex items-center gap-2">
                  <span className="w-5 text-right text-xs font-bold text-texte-doux dark:text-texte-doux-nuit">
                    {score}
                  </span>
                  <div className="flex-1 bg-badge-fond/40 dark:bg-badge-fond-nuit/40 rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-accent dark:bg-accent-nuit h-5 rounded-full flex items-center justify-end px-2 transition-all"
                      style={{
                        width: `${nombre > 0 ? Math.max((nombre / scoreMax) * 100, 14) : 0}%`,
                      }}
                    >
                      {nombre > 0 && (
                        <span className="text-xs font-bold text-texte">{nombre}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <p className="text-center text-texte-doux dark:text-texte-doux-nuit mb-6">
          Joue ton premier quotidien pour voir tes statistiques apparaître ici.
        </p>
      )}

      <button
        onClick={onRetour}
        className="bouton-principal-ludique font-titre font-bold w-full px-6 py-4 rounded-2xl transition-transform"
      >
        Retour à l'accueil
      </button>
    </div>
  )
}

export default Statistiques