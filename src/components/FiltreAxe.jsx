function FiltreAxe({ onChoisirAxe, onRetour }) {
  return (
    <div className="carte-ludique p-8 text-center">
      <h1 className="font-titre font-extrabold text-2xl text-texte dark:text-texte-nuit mb-2">
        Mode libre
      </h1>
      <p className="text-texte-doux dark:text-texte-doux-nuit mb-8">
        Comment veux-tu choisir tes questions ?
      </p>

      <button
        onClick={() => onChoisirAxe('categorie')}
        className="bouton-principal-ludique font-titre font-bold text-lg w-full rounded-2xl px-6 py-4 mb-3 transition-transform"
      >
        Par catégorie
      </button>
      <button
        onClick={() => onChoisirAxe('niveau')}
        className="bouton-principal-ludique font-titre font-bold text-lg w-full rounded-2xl px-6 py-4 mb-3 transition-transform"
      >
        Par niveau
      </button>

      <button
        onClick={onRetour}
        className="text-texte-doux dark:text-texte-doux-nuit font-semibold px-6 py-2 mt-2 hover:text-texte dark:hover:text-texte-nuit transition-colors"
      >
        ← Retour
      </button>
    </div>
  )
}

export default FiltreAxe