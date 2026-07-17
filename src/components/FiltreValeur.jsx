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
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h1 className="text-xl font-bold text-slate-800 text-center mb-6">{titre}</h1>

      {options.length === 0 && (
        <p className="text-slate-500 text-center mb-6">
          Pas encore assez de questions disponibles sur cet axe. Reviens quand la banque se sera
          étoffée.
        </p>
      )}

      <div className="space-y-2 mb-6">
        {options.map((option) => (
          <button
            key={option[cle]}
            onClick={() => onChoisirValeur(option[cle])}
            className="w-full text-left border border-slate-200 rounded-xl px-4 py-3 hover:bg-slate-50 transition-colors flex justify-between items-center"
          >
            <span className="font-medium text-slate-800">
              {axe === 'categorie' ? option.categorie : LABELS_NIVEAU[option.niveau]}
            </span>
            <span className="text-sm text-slate-400">{option.total} questions</span>
          </button>
        ))}
      </div>

      <button
        onClick={onRetour}
        className="text-slate-400 font-medium px-6 py-2 hover:text-slate-600 transition-colors"
      >
        ← Retour
      </button>
    </div>
  )
}

export default FiltreValeur