import { fetchGames } from "./api/gamesApi.js";

import { renderGames } from "./components/renderGames.js";

import {
    showLoader,
    hideLoader
} from "./components/loader.js";

const searchInput = document.querySelector(".search-input");

let allGames = [];

async function initApp() {

    showLoader();

    const games = await fetchGames();

    allGames = games;

    renderGames(allGames);

    hideLoader();

}

searchInput.addEventListener("input", handleSearch);

function handleSearch(event) {

    const searchTerm = event.target.value.toLowerCase();

    const filteredGames = allGames.filter((game) => {

        return game.title
            .toLowerCase()
            .includes(searchTerm);

    });

    renderGames(filteredGames);

}

initApp();