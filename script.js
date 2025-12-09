/* ========================================
   EXERCICE : DEEZER API + DOM (VERSION SIMPLE)
   Avec fonction getTracks()
   ======================================== */

/* OBJECTIFS :
   - Sélectionner des éléments du DOM
   - Réagir à un clic utilisateur
   - Récupérer des données depuis une API
   - Afficher des résultats dynamiquement
   - Jouer un extrait audio
*/

/* CONSEILS :
   - Avance étape par étape
   - Utilise console.log() souvent
   - Regarde la console en cas d’erreur
   - Teste dès qu’une étape fonctionne
*/


//* ========================================
//* ÉTAPE 1 : SÉLECTIONNER LES ÉLÉMENTS DU DOM
//* ========================================
// PSEUDO-CODE :
// 1. Récupérer le bouton de recherche
// 2. Récupérer l’input de recherche
// 3. Récupérer le conteneur des résultats
// 4. Récupérer la balise <audio>

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("artist-input");
const container = document.getElementById("results-container");
const audio = document.getElementById("audio-player");


//* ========================================
//* ÉTAPE 2 : AJOUTER UN EVENT LISTENER
//* ========================================
// PSEUDO-CODE :
// 1. Écouter le clic sur le bouton
// 2. Quand on clique, appeler searchArtist
// ⚠️ Passer la fonction SANS parenthèses

searchBtn.addEventListener("click", searchArtist);


//* ========================================
//* ÉTAPE 3 : RÉCUPÉRER LES DONNÉES (API)
//* ========================================
// Cette fonction est une "boîte noire".
// Elle reçoit un nom d’artiste
// Elle renvoie une liste de chansons
//
// PSEUDO-CODE :
// 1. Construire l’URL de l’API Deezer
// 2. Envoyer la demande à l’API (fetch)
// 3. Transformer la réponse en données JavaScript (json)
// 4. Renvoyer la liste des chansons

async function getTracks(artistName) {
   const API_URL = `https://corsproxy.io/?https://api.deezer.com/search?q=${artistName}`;

   const response = await fetch(API_URL);
   const data = await response.json();
   console.log(data);

   return data.data;
}


//* ========================================
//* ÉTAPE 4 : LANCER UNE RECHERCHE
//* ========================================
// PSEUDO-CODE :
// 1. Vider les anciens résultats
// 2. Récupérer ce que l’utilisateur a tapé
// 3. Si l’input est vide → afficher un message et arrêter
// 4. Appeler getTracks() pour récupérer les chansons
// 5. Pour chaque chanson, appeler afficherTrack()

async function searchArtist() {
   // 1. Nettoyer l'affichage
   container.innerHTML = "";

   // 2. Récupérer la saisie utilisateur
   const artistName = searchInput.value;

   // 3. Vérifier la saisie
   if (artistName === "") {
      container.innerHTML = "<p>Écris un nom d’artiste</p>";
      return;
   }

   // 4. Appel à l’API (via getTracks)
   const tracks = await getTracks(artistName);

   // 5. Affichage des résultats
   tracks.forEach(track => {
      afficherTrack(track);
   });
}


//* ========================================
//* ÉTAPE 5 : AFFICHER UNE CHANSON
//* ========================================
// PSEUDO-CODE :
// 1. Vérifier si la chanson a un extrait audio (preview)
// 2. Créer une carte (div)
// 3. Ajouter le HTML (image, titre, artiste)
// 4. Ajouter un clic sur la carte
//    → jouer l’extrait audio
// 5. Ajouter la carte au conteneur

function afficherTrack(track) {
   // 1. Si pas de preview, on ignore la chanson
   if (!track.preview) return;

   // 2. Création de la carte
   const div = document.createElement("div");
   div.className = "track-card";

   // 3. Contenu de la carte
   div.innerHTML = `
      <div class="cover-container">
         <img src="${track.album.cover_medium}" class="cover-image">
         <div class="play-overlay">
            <span class="play-icon">▶️</span>
         </div>
      </div>
      <h3>${track.title}</h3>
      <p>${track.artist.name}</p>
   `;

   // 4. Interaction : lecture audio
   div.addEventListener("click", function () {
      audio.src = track.preview;
      audio.play();
   });

   // 5. Ajout dans la page
   container.appendChild(div);
}
