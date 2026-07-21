export const initialState = {
  ecran: 'accueil',
  questions: [],
  indexCourant: 0,
  reponseSelectionnee: null,
  historique: [],
  score: 0,
  total: 0,
  axeLibre: null,
  titreQuiz: null,
  modeQuiz: null,
}

export function quizReducer(state, action) {
  switch (action.type) {
    case 'DEMARRER':
      return {
        ...initialState,
        ecran: 'question',
        questions: action.payload.questions,
        total: action.payload.questions.length,
        titreQuiz: action.payload.titre,
        modeQuiz: 'quotidien',
      }

    case 'OUVRIR_MODE_LIBRE':
      return {
        ...state,
        ecran: 'libre-axe',
      }

    case 'CHOISIR_AXE':
      return {
        ...state,
        ecran: 'libre-valeur',
        axeLibre: action.payload,
      }

    case 'DEMARRER_LIBRE':
      return {
        ...initialState,
        ecran: 'question',
        questions: action.payload.questions,
        total: action.payload.questions.length,
        titreQuiz: action.payload.titre,
        modeQuiz: 'libre',
      }

    // Rouvre l'écran de score à partir d'un résultat déjà enregistré (mode quotidien du jour),
    // sans repasser par l'écran de questions. modeQuiz: 'consultation' (distinct de 'quotidien')
    // évite de redéclencher l'enregistrement du résultat dans App.jsx.
    case 'VOIR_RESULTAT_DU_JOUR':
      return {
        ...initialState,
        ecran: 'score',
        score: action.payload.score,
        total: action.payload.total,
        historique: action.payload.historique,
        titreQuiz: action.payload.titre,
        modeQuiz: 'consultation',
      }

    case 'OUVRIR_STATISTIQUES':
      return {
        ...state,
        ecran: 'statistiques',
      }

    // Ouvre l'écran Réglages. On repart de state (pas de initialState) : on ne fait que
    // changer d'écran, sans toucher à un éventuel quiz en cours.
    case 'OUVRIR_REGLAGES':
      return {
        ...state,
        ecran: 'reglages',
      }

    case 'RETOUR_ACCUEIL':
      return initialState

    case 'REPONDRE': {
      if (state.reponseSelectionnee !== null) return state

      const question = state.questions[state.indexCourant]
      const estCorrect = action.payload.indexChoisi === question.reponse_correcte

      const entree = {
        id: question.id,
        question: question.question,
        choix: question.choix,
        indexChoisi: action.payload.indexChoisi,
        indexCorrect: question.reponse_correcte,
        correct: estCorrect,
        explication: question.explication,
        source: question.source,
      }

      return {
        ...state,
        reponseSelectionnee: action.payload.indexChoisi,
        historique: [...state.historique, entree],
        score: estCorrect ? state.score + 1 : state.score,
      }
    }

    case 'SUIVANT': {
      const dernier = state.indexCourant + 1 >= state.questions.length
      return {
        ...state,
        ecran: dernier ? 'score' : 'question',
        indexCourant: dernier ? state.indexCourant : state.indexCourant + 1,
        reponseSelectionnee: null,
      }
    }

    case 'REJOUER':
      return initialState

    default:
      return state
  }
}