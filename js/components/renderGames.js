import { openGameModal } from "./renderModal.js";

const gamesContainer = document.querySelector("#gamesContainer");

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

        const gameCard = document.createElement("div");

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

                    <button
                        class="details-btn"
                        data-id="${game.id}"
                    >
                        Ver detalles
                    </button>

                </div>

            </article>
        `;

        const detailsBtn =
            gameCard.querySelector(".details-btn");

        detailsBtn.addEventListener("click", () => {
            openGameModal(game);
        });

        gamesContainer.appendChild(gameCard);

    });

}