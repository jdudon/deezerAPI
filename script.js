/* ========================================
   EXERCICE : DEEZER API + DOM MANIPULATION
   ======================================== */

/* OBJECTIFS :
   1. Sélectionner des éléments du DOM
   2. Créer des eventListeners sur le bouton
   3. Récupérer des données depuis l'API Deezer
   4. Créer dynamiquement des cartes pour chaque chanson
   5. Ajouter des interactions (hover, click)
*/

/* CONSEILS :
   - Testez chaque étape avec console.log()
   - Regardez dans la console du navigateur pour voir les erreurs
   - L'API Deezer retourne toujours 25 résultats maximum
*/


//* ===== ÉTAPE 1 : SÉLECTIONNER LES ÉLÉMENTS DU DOM =====
// Bien regarder comment est construit le code HTML
// TODO: Sélectionner le bouton de recherche avec getElementById
let searchBtn = document.getElementById("search-btn");

// TODO: Sélectionner l'input de recherche
let searchInput = document.getElementById("artist-input");

// TODO: Sélectionner le conteneur des résultats
let container = document.getElementById("results-container");

// TODO: Sélectionner l'élément audio pour jouer la musique
let audio = document.getElementById("audio-player");


//* ===== ÉTAPE 2 : CRÉER UN EVENT LISTENER =====
// TODO: Ajouter un addEventListener sur le bouton de recherche
// Quand on clique, on appelle la fonction searchArtist()

// ATTENTION : on passe la fonction SANS les parenthèses
searchBtn.addEventListener("click", searchArtist);

// (BONUS: Permettre de chercher en appuyant sur Entrée)
searchInput.addEventListener("keydown", function (event) {
   if (event.key === "Enter") {
      searchArtist();
   }
});


//* ===== ÉTAPE 3 : FONCTION POUR CHERCHER UN ARTISTE =====
async function searchArtist() {
   // TODO: Récupérer la valeur de l'input dans une variable et la stocker dans la variable /!\ artistName /!\
   let artistName = searchInput.value.trim();
   console.log("Recherche pour :", artistName);

   // Si l'input est vide, on ne fait rien
   if (artistName === "") {
      container.innerHTML = "<p>Veuillez saisir un nom d'artiste.</p>";
      return;
   }

   // TODO: Vider le conteneur de résultats avant d'afficher de nouveaux résultats
   container.innerHTML = "";

   // On stoppe la musique en cours si besoin
   audio.pause();
   audio.currentTime = 0;
   audio.removeAttribute("src");

   //**! PAS TOUCHE */
   // URL de l'API Deezer (avec proxy pour éviter les problèmes CORS)
   const API_URL = `https://corsproxy.io/?https://api.deezer.com/search?q=${artistName}`;
   
   try {
      // Récupérer les données de l'API
      const response = await fetch(API_URL);
      const data = await response.json();
      const tracks = data.data;
      
      console.log("Données reçues:", tracks);
      //**! PAS TOUCHE */

      //* ===== ÉTAPE 4 : AFFICHER LES CHANSONS =====
      // TODO: Utiliser forEach pour parcourir toutes les chansons
      // Pour chaque chanson (track), appeler la fonction creerCarteTrack(track)      

      if (!tracks || tracks.length === 0) {
         container.innerHTML = "<p>Aucun résultat trouvé pour cet artiste.</p>";
         return;
      }

      tracks.forEach(function (track) {
         creerCarteTrack(track);
      });

   //**! PAS TOUCHE */
   } catch (error) {
      console.error("Erreur:", error);
      container.innerHTML = "<p>Une erreur est survenue. Réessayez plus tard.</p>";
   }
}   //**! PAS TOUCHE */


//* ===== ÉTAPE 5 : CRÉER UNE CARTE POUR CHAQUE CHANSON =====
function creerCarteTrack(track) {
   // TODO: Créer une carte HTML avec les informations
   // Structure proposée :
   // <div class="track-card" data-preview="URL_DU_PREVIEW">
   //   <img src="cover" alt="Pochette album">
   //   <h3>Titre</h3>
   //   <p>Artiste</p>
   // </div>

   const card = document.createElement("div");
   card.classList.add("track-card");

   // On stocke l'URL du preview dans un data-attribute
   card.dataset.preview = track.preview;

   const img = document.createElement("img");
   img.src = track.album.cover_medium;
   img.alt = `Pochette de l'album ${track.album.title}`;

   const title = document.createElement("h3");
   title.textContent = track.title;

   const artist = document.createElement("p");
   artist.textContent = track.artist.name;

   // On ajoute les éléments à la carte
   card.appendChild(img);
   card.appendChild(title);
   card.appendChild(artist);

   // TODO: Insérer la carte dans le conteneur   
   container.appendChild(card);
}


//* ===== BONUS : AJOUTER DES INTERACTIONS =====
// 1. Un click pour jouer la musique

// TODO: Ajouter un événement click sur resultsContainer
// Quand on clique sur une carte, on joue la musique

container.addEventListener("click", function (event) {
   // event.target = l'élément exact cliqué (image, titre, etc.)
   // closest() remonte jusqu'au parent qui a la classe "track-card"
   const card = event.target.closest(".track-card");

   if (!card) return; // on a cliqué à côté

   const previewUrl = card.dataset.preview;

   if (!previewUrl) {
      console.log("Pas de preview disponible pour ce morceau.");
      return;
   }

   // On change la source du player audio et on lance la lecture
   audio.src = previewUrl;
   audio.play();
});
