import { openGameModal } from "./renderModal.js";

import { state } from "../state/state.js";

import { saveFavorites } from "../services/storage.js";

const gamesContainer = document.querySelector("#gamesContainer");

export function renderGames(games) {
  gamesContainer.innerHTML = "";

  if (games.length === 0) {

    gamesContainer.innerHTML = `
        <div class="col-12">
            <div class="empty-state">
                <span class="empty-icon">🕹️</span>
                <h2>Sin resultados</h2>
                <p>No encontramos juegos con esos filtros.<br>
                   Prueba con otro género, plataforma o término de búsqueda.</p>
            </div>
        </div>
    `;

    return;

  }

  games.forEach((game) => {
    const isFavorite = state.favorites.some(
      (favorite) => favorite.id === game.id,
    );

    const gameCard = document.createElement("div");

    gameCard.classList.add("col-md-6");
    gameCard.classList.add("col-lg-3");

    gameCard.innerHTML = `
            <article class="game-card">

                <div class="game-image-wrapper">
                  <img
                      src="${game.thumbnail}"
                      alt="${game.title}"
                      class="game-image"
                      loading="lazy"
                  >
                </div>

                <div class="game-content">

                    <h3 class="game-title">
                        ${game.title}
                    </h3>

                    <p class="game-genre">
                        ${game.genre}
                    </p>

                    <div class="d-flex gap-2">

                        <button
                            class="details-btn flex-grow-1"
                        >
                            Ver detalles
                        </button>

                        <button
                            class="favorite-btn"
                            data-id="${game.id}"
                            title="${isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}"
                            aria-label="${isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}"
                        >
                            ${isFavorite ? "★" : "☆"}
                        </button>

                    </div>

                </div>

            </article>
        `;

    const detailsBtn = gameCard.querySelector(".details-btn");

    detailsBtn.addEventListener("click", () => {
      openGameModal(game);
    });

    const favoriteBtn = gameCard.querySelector(".favorite-btn");

    favoriteBtn.addEventListener("click", () => {
      toggleFavorite(game);
    });

    gamesContainer.appendChild(gameCard);
  });
}

function toggleFavorite(game) {

    const alreadyExists =
        state.favorites.some(
            favorite => favorite.id === game.id
        );

    if (alreadyExists) {
        state.favorites =
            state.favorites.filter(
                favorite => favorite.id !== game.id
            );
    } else {
        state.favorites.push(game);
    }

    saveFavorites(state.favorites);

    // Solo actualiza el botón de esa tarjeta, sin rerenderizar todo
    const isFav = state.favorites.some(f => f.id === game.id);

    // Busca el botón dentro del contenedor por data-id
    const btn = document.querySelector(
        `.favorite-btn[data-id="${game.id}"]`
    );

    if (btn) {
        btn.textContent  = isFav ? "★" : "☆";
        btn.title        = isFav ? "Quitar de favoritos" : "Añadir a favoritos";
        btn.setAttribute("aria-label", isFav ? "Quitar de favoritos" : "Añadir a favoritos");

        // Micro-animación de confirmación
        btn.classList.remove("fav-pop");
        void btn.offsetWidth; // fuerza reflow para reiniciar animación
        btn.classList.add("fav-pop");
    }

}
