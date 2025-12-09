/* ========================================
   EXERCICE : DEEZER API + DOM
   Version simple avec getTracks()
   ======================================== */

/* OBJECTIFS :
   - Sélectionner des éléments du DOM
   - Utiliser addEventListener
   - Récupérer des données depuis une API
   - Afficher des résultats dynamiquement
   - Jouer un extrait audio
*/

/* CONSEILS :
   - Avance étape par étape
   - Utilise console.log() souvent
   - Lis les erreurs dans la console
*/


//* ========================================
//* ÉTAPE 1 : SÉLECTIONNER LES ÉLÉMENTS DU DOM
//* ========================================
// PSEUDO-CODE :
// 1. Sélectionner le bouton de recherche
// 2. Sélectionner l’input de recherche
// 3. Sélectionner le conteneur des résultats
// 4. Sélectionner la balise audio

// TODO



//* ========================================
//* ÉTAPE 2 : AJOUTER UN EVENT LISTENER
//* ========================================
// PSEUDO-CODE :
// 1. Écouter le clic sur le bouton
// 2. Appeler la fonction searchArtist
// ⚠️ Attention : passer la fonction SANS parenthèses

// TODO



//* ========================================
//* ÉTAPE 3 : RÉCUPÉRER LES DONNÉES (API)
//* ========================================
// Cette fonction est une "boîte noire".
// Elle reçoit un nom d’artiste
// Elle renvoie une liste de chansons
//
// PSEUDO-CODE :
// 1. Construire l’URL de l’API Deezer
// 2. Appeler fetch() avec cette URL
// 3. Transformer la réponse en JSON
// 4. Renvoyer la liste des chansons

async function getTracks(artistName) {
   const API_URL = `https://corsproxy.io/?https://api.deezer.com/search?q=${artistName}`;

   const response = await fetch(API_URL);
   const data = await response.json();

   return data.data;
}



//* ========================================
//* ÉTAPE 4 : LANCER UNE RECHERCHE
//* ========================================
// PSEUDO-CODE :
// 1. Vider les anciens résultats
// 2. Récupérer ce que l’utilisateur a tapé dans l’input
// 3. Si la saisie est vide → afficher un message et arrêter
// 4. Appeler getTracks() pour récupérer les chansons
// 5. Pour chaque chanson, appeler afficherTrack()

async function searchArtist() {
   // TODO
}



//* ========================================
//* ÉTAPE 5 : AFFICHER UNE CHANSON
//* ========================================
// PSEUDO-CODE :
// 1. Vérifier si la chanson possède un extrait audio (preview)
// 2. Créer une carte (div)
// 3. Ajouter le HTML (image, titre, artiste)
// 4. Ajouter un clic sur la carte pour jouer la musique
// 5. Ajouter la carte dans le conteneur

function afficherTrack(track) {
   // TODO
}
