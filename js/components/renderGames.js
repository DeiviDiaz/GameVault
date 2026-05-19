import { openGameModal } from "./renderModal.js";

import { state } from "../state/state.js";

import { saveFavorites }
    from "../services/storage.js";

const gamesContainer =
    document.querySelector("#gamesContainer");

export function renderGames(games) {

    gamesContainer.innerHTML = "";

    if (games.length === 0) {

        gamesContainer.innerHTML = `
            <div class="col-12 text-center">
                <h2>No se encontraron videojuegos</h2>
            </div>
        `;

        return;

    }

    games.forEach((game) => {

        const isFavorite =
            state.favorites.some(
                favorite => favorite.id === game.id
            );

        const gameCard =
            document.createElement("div");

        gameCard.classList.add("col-md-6");
        gameCard.classList.add("col-lg-3");

        gameCard.innerHTML = `
            <article class="game-card">

                <img
                    src="${game.thumbnail}"
                    alt="${game.title}"
                    class="game-image"
                >

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
                        >
                            ${isFavorite ? "★" : "☆"}
                        </button>

                    </div>

                </div>

            </article>
        `;

        const detailsBtn =
            gameCard.querySelector(".details-btn");

        detailsBtn.addEventListener("click", () => {
            openGameModal(game);
        });

        const favoriteBtn =
            gameCard.querySelector(".favorite-btn");

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

    renderGames(state.favorites.length > 0
        ? [...state.favorites,
           ...window.allGames.filter(
               game =>
               !state.favorites.some(
                   fav => fav.id === game.id
               )
           )]
        : window.allGames
    );

}