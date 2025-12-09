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




// TODO: Sélectionner l'input de recherche




// TODO: Sélectionner le conteneur des résultats




// TODO: Sélectionner l'élément audio pour jouer la musique



//* ===== ÉTAPE 2 : CRÉER UN EVENT LISTENER =====
// TODO: Ajouter un addEventListener sur le bouton de recherche
// Quand on clique, on appelle la fonction searchArtist()
// Votre code ici





// (BONUS: Permettre de chercher en appuyant sur Entrée)




//* ===== ÉTAPE 3 : FONCTION POUR CHERCHER UN ARTISTE =====
async function searchArtist() {
   // TODO: Récupérer la valeur de l'input dans une variable et la stocker dans la variable /!\ artistName /!\




   

   // TODO: Vider le conteneur de résultats avant d'afficher de nouveaux résultats



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
      // Votre code ici







//**! PAS TOUCHE */
   } catch (error) {
      console.error("Erreur:", error);
   }
}   //**! PAS TOUCHE */



//* ===== ÉTAPE 5 : CRÉER UNE CARTE POUR CHAQUE CHANSON =====
function creerCarteTrack(track) {
   // TODO: Créer une carte HTML avec les informations





   // TODO: Insérer la carte dans le conteneur   


   



}


//* ===== BONUS : AJOUTER DES INTERACTIONS =====
// Une fois que vous avez tout fait fonctionner, essayez d'ajouter:
// 1. Un click pour jouer la musique

// TODO: Ajouter un événement click sur resultsContainer
// Quand on clique sur une carte, on joue la musique
