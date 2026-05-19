import { fetchGames } from "./api/gamesApi.js";

import { renderGames } from "./components/renderGames.js";

import {
    showLoader,
    hideLoader
} from "./components/loader.js";

const searchInput = document.querySelector(".search-input");

const loadMoreBtn = document.querySelector("#loadMoreBtn");

let allGames = [];

let visibleGames = 12;

async function initApp() {

    showLoader();

    const games = await fetchGames();

    allGames = games;

    renderGames(allGames.slice(0, visibleGames));

    hideLoader();

}

searchInput.addEventListener("input", handleSearch);

loadMoreBtn.addEventListener("click", loadMoreGames);

function handleSearch(event) {

    const searchTerm = event.target.value.toLowerCase();

    const filteredGames = allGames.filter((game) => {

        return game.title
            .toLowerCase()
            .includes(searchTerm);

    });

    renderGames(filteredGames.slice(0, visibleGames));

}

function loadMoreGames() {

    visibleGames += 12;

    const searchTerm = searchInput.value.toLowerCase();

    const filteredGames = allGames.filter((game) => {

        return game.title
            .toLowerCase()
            .includes(searchTerm);

    });

    renderGames(filteredGames.slice(0, visibleGames));

}

initApp();