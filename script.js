/* ========================================
   EXERCICE : DEEZER API + DOM MANIPULATION
   VERSION SIMPLE (fetch avec .then)
   ======================================== */

/* OBJECTIFS :
   1. Sélectionner des éléments du DOM
   2. Ajouter un eventListener sur le bouton
   3. Récupérer des données depuis l'API Deezer
   4. Créer dynamiquement des cartes pour chaque chanson
   5. Pouvoir cliquer sur une carte pour jouer un extrait
*/

/* CONSEILS :
   - Teste chaque étape avec console.log()
   - Regarde la console du navigateur pour voir les erreurs
   - L'API Deezer retourne toujours AU MAX 25 résultats
*/


//* ===== ÉTAPE 1 : SÉLECTIONNER LES ÉLÉMENTS DU DOM =====
// PSEUDO-CODE :
// 1. Récupérer le bouton "Rechercher"
// 2. Récupérer l'input où on tape le nom de l'artiste
// 3. Récupérer la div où on va afficher les résultats
// 4. Récupérer le lecteur audio

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("artist-input");
const container = document.getElementById("results-container");
const audio = document.getElementById("audio-player");


//* ===== ÉTAPE 2 : AJOUTER L'ÉVÉNEMENT SUR LE BOUTON =====
// PSEUDO-CODE :
// Quand on clique sur le bouton :
//    -> appeler la fonction searchArtist()

searchBtn.addEventListener("click", searchArtist);


//* ===== ÉTAPE 3 : FONCTION PRINCIPALE DE RECHERCHE =====
// PSEUDO-CODE :
// 1. Effacer les anciens résultats (vider le container)
// 2. Récupérer le texte écrit dans l'input
// 3. Si l'input est vide : afficher un message et arrêter la fonction
// 4. Construire l'URL de l'API avec le nom de l'artiste
// 5. Utiliser fetch(apiUrl)
// 6. Transformer la réponse en JSON
// 7. Pour chaque morceau dans les données reçues :
//       -> appeler afficherTrack(track)
// 8. Gérer les erreurs avec .catch()

function searchArtist() {
   // 1. Vider les anciens résultats
   container.innerHTML = "";

   // 2. Récupérer le contenu de l'input
   const artistName = searchInput.value;

   // 3. Vérifier si c'est vide
   if (artistName === "") {
      container.innerHTML = "<p>Écris un nom d’artiste</p>";
      return; // on arrête la fonction ici
   }

   // 4. Construire l'URL de l'API Deezer + proxy CORS
   const apiUrl = `https://corsproxy.io/?https://api.deezer.com/search?q=${artistName}`;

   // 5–8. Utiliser fetch avec la syntaxe en .then()
   fetch(apiUrl)
      .then(function(response) {
         // Transforme la réponse en JSON
         return response.json();
      })
      .then(function(data) {
         console.log("Données récupérées avec succès :", data);

         // data.data contient le tableau de morceaux
         data.data.forEach(function(track) {
            afficherTrack(track);
         });
      })
      .catch(function(error) {
         console.error("Erreur lors de la récupération des données :", error);
         container.innerHTML = "<p>Oups, erreur lors de la recherche. Réessaie plus tard.</p>";
      });
}


//* ===== ÉTAPE 4 : AFFICHER UN MORCEAU =====
// PSEUDO-CODE :
// 1. Si le morceau n'a PAS de preview audio -> ne rien afficher (return)
// 2. Créer une div pour la carte (class "track-card")
// 3. Ajouter à la carte :
//       - la pochette de l'album
//       - un overlay avec une icône Play
//       - le titre du morceau
//       - le nom de l'artiste
// 4. Ajouter un eventListener "click" sur la carte :
//       - changer la source de l'audio (audio.src = track.preview)
//       - lancer la lecture (audio.play())
// 5. Ajouter la carte dans le container

function afficherTrack(track) {
   // 1. Certains morceaux n'ont pas d'extrait (preview)
   if (!track.preview) return;

   // 2. Créer la carte
   const div = document.createElement("div");
   div.className = "track-card";

   // 3. Remplir la carte avec le HTML
   div.innerHTML = `
      <div class="cover-container">
         <img src="${track.album.cover_medium}" class="cover-image" alt="Pochette de l'album">
         <div class="play-overlay">
            <span class="play-icon">▶️</span>
         </div>
      </div>
      <h3>${track.title}</h3>
      <p>${track.artist.name}</p>
   `;

   // 4. Ajouter le click pour jouer la musique
   div.addEventListener("click", function () {
      audio.src = track.preview;
      audio.play();
   });

   // 5. Ajouter la carte dans le container
   container.appendChild(div);
}
