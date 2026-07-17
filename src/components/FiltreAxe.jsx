function FiltreAxe({ onChoisirAxe, onRetour }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 text-center">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Mode libre</h1>
      <p className="text-slate-600 mb-8">Comment veux-tu choisir tes questions ?</p>

      <button
        onClick={() => onChoisirAxe('categorie')}
        className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors w-full mb-3"
      >
        Par catégorie
      </button>
      <button
        onClick={() => onChoisirAxe('niveau')}
        className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors w-full mb-3"
      >
        Par niveau
      </button>

      <button
        onClick={onRetour}
        className="text-slate-400 font-medium px-6 py-2 mt-2 hover:text-slate-600 transition-colors"
      >
        ← Retour
      </button>
    </div>
  )
}

export default FiltreAxe