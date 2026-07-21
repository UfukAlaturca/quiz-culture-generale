// Une ligne de réglage réutilisable : un titre, une description, et un interrupteur (switch).
// Quand tu ajouteras le son (EV3), il suffira de dupliquer une <LigneReglage> ici.
function LigneReglage({ titre, description, actif, onToggle }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="text-left">
        <p className="font-bold text-texte dark:text-texte-nuit">{titre}</p>
        <p className="text-sm text-texte-doux dark:text-texte-doux-nuit">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={actif}
        onClick={onToggle}
        className={`shrink-0 w-14 h-8 rounded-full p-1 transition-colors tap-sobre ${
          actif ? 'bg-accent dark:bg-accent-nuit' : 'bg-badge-fond dark:bg-badge-fond-nuit'
        }`}
      >
        <span
          className={`block w-6 h-6 rounded-full bg-white shadow transition-transform ${
            actif ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

function Reglages({ animationsReduites, onToggleAnimations, onRetour }) {
  return (
    <div className="carte-ludique p-8">
      <h1 className="font-titre font-extrabold text-2xl text-texte dark:text-texte-nuit text-center mb-6">
        Réglages
      </h1>

      <div className="divide-y divide-badge-fond dark:divide-badge-fond-nuit">
        <LigneReglage
          titre="Réduire les animations"
          description="Supprime les effets de mouvement (rebond, secousse). Les couleurs de bonne et mauvaise réponse restent affichées."
          actif={animationsReduites}
          onToggle={onToggleAnimations}
        />
      </div>

      <p className="text-xs text-texte-doux dark:text-texte-doux-nuit mt-6 mb-6 text-center">
        Si ton appareil est déjà réglé pour réduire les animations, l'app le respecte
        automatiquement, sans que tu aies à toucher à cet interrupteur.
      </p>

      <button
        onClick={onRetour}
        className="text-texte-doux dark:text-texte-doux-nuit font-semibold px-6 py-2 mx-auto block hover:text-texte dark:hover:text-texte-nuit transition-colors tap-sobre"
      >
        ← Retour
      </button>
    </div>
  )
}

export default Reglages