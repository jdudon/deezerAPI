const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("artist-input");
const container = document.getElementById("results-container");
const audio = document.getElementById("audio-player");

searchBtn.addEventListener("click", searchArtist);

async function searchArtist() {
   container.innerHTML = "";

   const artistName = searchInput.value;

   if (artistName === "") {
      container.innerHTML = "<p>Écris un nom d’artiste</p>";
      return;
   }

   const API_URL = `https://corsproxy.io/?https://api.deezer.com/search?q=${artistName}`;
   const response = await fetch(API_URL);
   const data = await response.json();

   data.data.forEach(track => {
      afficherTrack(track);
   });
}

function afficherTrack(track) {
   if (!track.preview) return; // évite l'erreur audio

   const div = document.createElement("div");
   div.className = "track-card";

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

   div.addEventListener("click", function () {
      audio.src = track.preview;
      audio.play();
   });

   container.appendChild(div);
}
