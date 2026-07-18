import { useEffect, useReducer, useState } from 'react'
import Accueil from './components/Accueil'
import FiltreAxe from './components/FiltreAxe'
import FiltreValeur from './components/FiltreValeur'
import Question from './components/Question'
import Score from './components/Score'
import Statistiques from './components/Statistiques'
import { quizReducer, initialState } from './reducer'
import banque from './data/banque-questions.json'
import {
  categoriesEligibles,
  niveauxEligibles,
  construireQuizParCategorie,
  construireQuizParNiveau,
} from './filtresLibre'
import {
  resultatDuJour,
  streakActuelle,
  enregistrerResultatDuJour,
  calculerStatistiques,
} from './quotidien'

const LABELS_NIVEAU = {
  facile: 'Facile',
  moyen: 'Moyen',
  difficile: 'Difficile',
  'très difficile': 'Très difficile',
}

function dateDuJourISO() {
  const maintenant = new Date()
  const annee = maintenant.getFullYear()
  const mois = String(maintenant.getMonth() + 1).padStart(2, '0')
  const jour = String(maintenant.getDate()).padStart(2, '0')
  return `${annee}-${mois}-${jour}`
}

// Formate une date ISO (2026-07-14) en format affichage français (14/07/2026).
function formatDateAffichage(dateIso) {
  const [annee, mois, jour] = dateIso.split('-')
  return `${jour}/${mois}/${annee}`
}

function trouverQuizDuJour(banque) {
  const aujourdHui = dateDuJourISO()
  const datesDisponibles = [...new Set(
    banque.questions.map((q) => q.date_quotidien).filter(Boolean)
  )].sort()

  let dateRetenue = datesDisponibles.includes(aujourdHui) ? aujourdHui : null

  if (!dateRetenue) {
    const datesPassees = datesDisponibles.filter((d) => d < aujourdHui)
    dateRetenue = datesPassees.length > 0 ? datesPassees[datesPassees.length - 1] : null
  }

  if (!dateRetenue) return null

  return {
    date: dateRetenue,
    questions: banque.questions.filter((q) => q.date_quotidien === dateRetenue)
  }
}

// Calculée une seule fois : sert à la fois à trouver le quiz du jour et à déterminer
// quelles questions sont déjà "révélées" et donc éligibles au mode libre, ainsi qu'au
// verrou "un essai par jour" (basé sur la date calendaire réelle, pas sur la date du contenu affiché).
const aujourdHui = dateDuJourISO()

const quizDuJour = trouverQuizDuJour(banque)
// Calculées une seule fois : la banque est statique (importée en JSON), pas besoin de recalculer à chaque rendu.
const categoriesDisponibles = categoriesEligibles(banque, aujourdHui)
const niveauxDisponibles = niveauxEligibles(banque, aujourdHui)

function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState)
  const [resultatQuotidien, setResultatQuotidien] = useState(() => resultatDuJour(aujourdHui))
  const [streak, setStreak] = useState(() => streakActuelle())

  // Enregistre le résultat une seule fois, au moment précis où le quotidien (pas le mode libre,
  // ni une simple consultation) se termine et affiche l'écran de score.
  useEffect(() => {
    if (state.ecran === 'score' && state.modeQuiz === 'quotidien') {
      const progression = enregistrerResultatDuJour(
        aujourdHui,
        state.score,
        state.total,
        state.historique
      )
      setResultatQuotidien(progression.resultats[aujourdHui])
      setStreak(progression.streakActuelle)
    }
  }, [state.ecran, state.modeQuiz])

  function demarrerQuizLibre(valeur) {
    const questions =
      state.axeLibre === 'categorie'
        ? construireQuizParCategorie(banque, valeur, aujourdHui)
        : construireQuizParNiveau(banque, valeur, aujourdHui)

    const titre = state.axeLibre === 'categorie' ? valeur : LABELS_NIVEAU[valeur]

    dispatch({ type: 'DEMARRER_LIBRE', payload: { questions, titre } })
  }

  function revoirResultatDuJour() {
    dispatch({
      type: 'VOIR_RESULTAT_DU_JOUR',
      payload: {
        score: resultatQuotidien.score,
        total: resultatQuotidien.total,
        historique: resultatQuotidien.historique,
        titre: `Quotidien du ${formatDateAffichage(quizDuJour.date)}`,
      },
    })
  }

  if (!quizDuJour) {
    return (
      <div className="min-h-screen bg-fond dark:bg-fond-nuit flex items-center justify-center p-4">
        <p className="text-texte-doux dark:text-texte-doux-nuit">Aucun quiz disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-fond dark:bg-fond-nuit flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {state.ecran === 'accueil' && (
          <Accueil
            quiz={quizDuJour}
            resultatQuotidien={resultatQuotidien}
            streak={streak}
            onDemarrer={() =>
              dispatch({
                type: 'DEMARRER',
                payload: {
                  questions: quizDuJour.questions,
                  titre: `Quotidien du ${formatDateAffichage(quizDuJour.date)}`,
                },
              })
            }
            onModeLibre={() => dispatch({ type: 'OUVRIR_MODE_LIBRE' })}
            onRevoirResultat={revoirResultatDuJour}
            onStatistiques={() => dispatch({ type: 'OUVRIR_STATISTIQUES' })}
          />
        )}

        {state.ecran === 'libre-axe' && (
          <FiltreAxe
            onChoisirAxe={(axe) => dispatch({ type: 'CHOISIR_AXE', payload: axe })}
            onRetour={() => dispatch({ type: 'RETOUR_ACCUEIL' })}
          />
        )}

        {state.ecran === 'libre-valeur' && (
          <FiltreValeur
            axe={state.axeLibre}
            options={state.axeLibre === 'categorie' ? categoriesDisponibles : niveauxDisponibles}
            onChoisirValeur={demarrerQuizLibre}
            onRetour={() => dispatch({ type: 'OUVRIR_MODE_LIBRE' })}
          />
        )}

        {state.ecran === 'question' && (
          <Question
            question={state.questions[state.indexCourant]}
            numero={state.indexCourant + 1}
            total={state.questions.length}
            reponseSelectionnee={state.reponseSelectionnee}
            modeLibre={state.modeQuiz === 'libre'}
            onRepondre={(indexChoisi) => dispatch({ type: 'REPONDRE', payload: { indexChoisi } })}
            onSuivant={() => dispatch({ type: 'SUIVANT' })}
            onQuitter={() => dispatch({ type: 'RETOUR_ACCUEIL' })}
          />
        )}

        {state.ecran === 'score' && (
          <Score
            score={state.score}
            total={state.total}
            historique={state.historique}
            titreQuiz={state.titreQuiz}
            streak={state.modeQuiz === 'quotidien' || state.modeQuiz === 'consultation' ? streak : null}
            modeConsultation={state.modeQuiz === 'consultation'}
            onRejouer={() => dispatch({ type: 'REJOUER' })}
          />
        )}

        {state.ecran === 'statistiques' && (
          <Statistiques
            stats={calculerStatistiques()}
            onRetour={() => dispatch({ type: 'RETOUR_ACCUEIL' })}
          />
        )}
      </div>
    </div>
  )
}

export default App