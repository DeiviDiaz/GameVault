const gamesContainer = document.querySelector("#gamesContainer");

export function renderGames(games) {

    gamesContainer.innerHTML = "";

    games.forEach((game) => {

        const gameCard = document.createElement("div");

        gameCard.classList.add("col-md-6");
        gameCard.classList.add("col-lg-3");

        gameCard.innerHTML = `
            <article class="game-card">

                <img
                    src="${game.image}"
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

                    <button class="details-btn">
                        Ver detalles
                    </button>

                </div>

            </article>
        `;

        gamesContainer.appendChild(gameCard);

    });

}