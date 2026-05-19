const themeToggle =
    document.querySelector("#themeToggle");

export function initializeTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add(
            "light-theme"
        );

        themeToggle.textContent = "☀️";

    }

}

export function toggleTheme() {

    document.body.classList.toggle(
        "light-theme"
    );

    const isLightTheme =
        document.body.classList.contains(
            "light-theme"
        );

    localStorage.setItem(
        "theme",
        isLightTheme ? "light" : "dark"
    );

    themeToggle.textContent =
        isLightTheme ? "☀️" : "🌙";

}