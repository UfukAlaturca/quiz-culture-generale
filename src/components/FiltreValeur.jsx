const LABELS_NIVEAU = {
  facile: 'Facile',
  moyen: 'Moyen',
  difficile: 'Difficile',
  'très difficile': 'Très difficile',
}

function FiltreValeur({ axe, options, onChoisirValeur, onRetour }) {
  const titre = axe === 'categorie' ? 'Choisis une catégorie' : 'Choisis un niveau'
  const cle = axe === 'categorie' ? 'categorie' : 'niveau'

  return (
    <div className="carte-ludique p-8">
      <h1 className="font-titre font-extrabold text-xl text-texte dark:text-texte-nuit text-center mb-6">
        {titre}
      </h1>

      {options.length === 0 && (
        <p className="text-texte-doux dark:text-texte-doux-nuit text-center mb-6">
          Pas encore assez de questions disponibles sur cet axe. Reviens quand la banque se sera
          étoffée.
        </p>
      )}

      <div className="space-y-2 mb-6">
        {options.map((option) => (
          <button
            key={option[cle]}
            onClick={() => onChoisirValeur(option[cle])}
            className="w-full text-left border-2 border-badge-fond dark:border-badge-fond-nuit bg-carte dark:bg-carte-nuit rounded-2xl px-4 py-3 hover:bg-badge-fond/20 dark:hover:bg-badge-fond-nuit/20 transition-colors flex justify-between items-center tap-sobre"
          >
            <span className="font-bold text-texte dark:text-texte-nuit">
              {axe === 'categorie' ? option.categorie : LABELS_NIVEAU[option.niveau]}
            </span>
            <span className="text-sm text-texte-doux dark:text-texte-doux-nuit">
              {option.total} questions
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={onRetour}
        className="text-texte-doux dark:text-texte-doux-nuit font-semibold px-6 py-2 hover:text-texte dark:hover:text-texte-nuit transition-colors tap-sobre"
      >
        ← Retour
      </button>
    </div>
  )
}

export default FiltreValeur