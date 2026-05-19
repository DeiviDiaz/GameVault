import { fetchGames } from "./api/gamesApi.js";

import { renderGames } from "./components/renderGames.js";

import {
    showLoader,
    hideLoader
} from "./components/loader.js";

const searchInput =
    document.querySelector(".search-input");

const loadMoreBtn =
    document.querySelector("#loadMoreBtn");

const genreFilter =
    document.querySelector("#genreFilter");

const platformFilter =
    document.querySelector("#platformFilter");

window.allGames = [];

let visibleGames = 12;

async function initApp() {

    showLoader();

    const games = await fetchGames();

    window.allGames = games;

    applyFilters();

    hideLoader();

}

searchInput.addEventListener("input", applyFilters);

genreFilter.addEventListener("change", applyFilters);

platformFilter.addEventListener("change", applyFilters);

loadMoreBtn.addEventListener("click", loadMoreGames);

function applyFilters() {

    const searchTerm =
        searchInput.value.toLowerCase();

    const selectedGenre =
        genreFilter.value;

    const selectedPlatform =
        platformFilter.value;

    let filteredGames =
        window.allGames.filter((game) => {

            const matchesSearch =
                game.title
                    .toLowerCase()
                    .includes(searchTerm);

            const matchesGenre =
                selectedGenre === "" ||
                game.genre === selectedGenre;

            const matchesPlatform =
                selectedPlatform === "" ||
                game.platform.includes(
                    selectedPlatform
                );

            return (
                matchesSearch &&
                matchesGenre &&
                matchesPlatform
            );

        });

    renderGames(
        filteredGames.slice(0, visibleGames)
    );

}

function loadMoreGames() {

    visibleGames += 12;

    applyFilters();

}

initApp();