import { fetchGames } from "./api/gamesApi.js";

import { renderGames } from "./components/renderGames.js";

import { initializeTheme, toggleTheme } from "./utils/helpers.js";

import { showLoader, hideLoader } from "./components/loader.js";

const searchInput = document.querySelector(".search-input");

const loadMoreBtn = document.querySelector("#loadMoreBtn");

const genreFilter = document.querySelector("#genreFilter");

const platformFilter = document.querySelector("#platformFilter");

const themeToggle = document.querySelector("#themeToggle");

window.allGames = [];

let visibleGames = 12;

function showError() {
    const gamesContainer = document.querySelector("#gamesContainer");
    const loadMoreBtn = document.querySelector("#loadMoreBtn");

    loadMoreBtn.style.display = "none";

    gamesContainer.innerHTML = `
        <div class="col-12">
            <div class="error-state">
                <span class="error-icon">⚠️</span>
                <h2>No pudimos cargar los juegos</h2>
                <p>Revisa tu conexión o intenta de nuevo.</p>
                <button class="retry-btn" id="retryBtn">
                    <span>Reintentar</span>
                </button>
            </div>
        </div>
    `;

    document.querySelector("#retryBtn").addEventListener("click", () => {
        gamesContainer.innerHTML = "";
        loadMoreBtn.style.display = "";
        initApp();
    });
}

async function initApp() {
    initializeTheme();
    showLoader();

    const result = await fetchGames();

    hideLoader();

    if (!result.ok) {
        showError();
        return;
    }

    window.allGames = result.data;
    applyFilters();
}

searchInput.addEventListener("input", applyFilters);

genreFilter.addEventListener("change", applyFilters);

platformFilter.addEventListener("change", applyFilters);

themeToggle.addEventListener("click", toggleTheme);

loadMoreBtn.addEventListener("click", loadMoreGames);

function applyFilters() {
    const searchTerm      = searchInput.value.toLowerCase();
    const selectedGenre   = genreFilter.value;
    const selectedPlatform = platformFilter.value;

    let filteredGames = window.allGames.filter((game) => {
        const matchesSearch   = game.title.toLowerCase().includes(searchTerm);
        const matchesGenre    = selectedGenre === ""   || game.genre === selectedGenre;
        const matchesPlatform = selectedPlatform === "" || game.platform.includes(selectedPlatform);
        return matchesSearch && matchesGenre && matchesPlatform;
    });

    // Guarda el total filtrado para comparar con visibleGames
    window.filteredTotal = filteredGames.length;

    renderGames(filteredGames.slice(0, visibleGames));
    updateLoadMoreBtn(filteredGames.length);
}

function loadMoreGames() {
    visibleGames += 12;
    applyFilters();
}

function updateLoadMoreBtn(totalFiltered) {
    const hasMore = visibleGames < totalFiltered;
    loadMoreBtn.style.display  = hasMore ? "" : "none";
    loadMoreBtn.disabled       = !hasMore;
}

initApp();

// ── Efecto spotlight en tarjetas ─────────────
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".game-card");
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
    card.style.setProperty("--mouse-x", x + "%");
    card.style.setProperty("--mouse-y", y + "%");
  });
});

// ── Feedback táctil en click de tarjetas ─────
document.addEventListener(
  "click",
  (e) => {
    const card = e.target.closest(".game-card");
    if (!card) return;
    card.style.transform = "scale(0.98)";
    setTimeout(() => {
      card.style.transform = "";
    }, 150);
  },
  { passive: true },
);
