// Service worker minimal, écrit à la main (pas de dépendance supplémentaire type Workbox).
// Stratégie volontaire : réseau en priorité, pour que les mises à jour du quiz (nouvelles
// questions, nouveau design) soient toujours visibles dès que l'appareil est en ligne.
// Le cache ne sert que de secours si l'appareil est hors-ligne.
const CACHE_NOM = 'quiz-culture-generale-v1'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (evenement) => {
  evenement.waitUntil(
    caches.keys().then((cles) =>
      Promise.all(cles.filter((cle) => cle !== CACHE_NOM).map((cle) => caches.delete(cle)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (evenement) => {
  if (evenement.request.method !== 'GET') return

  evenement.respondWith(
    fetch(evenement.request)
      .then((reponse) => {
        const copie = reponse.clone()
        caches.open(CACHE_NOM).then((cache) => cache.put(evenement.request, copie))
        return reponse
      })
      .catch(() => caches.match(evenement.request))
  )
})
