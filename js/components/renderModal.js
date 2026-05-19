const modalTitle =
    document.querySelector("#modalGameTitle");

const modalImage =
    document.querySelector("#modalGameImage");

const modalGenre =
    document.querySelector("#modalGameGenre");

const modalPlatform =
    document.querySelector("#modalGamePlatform");

const modalPublisher =
    document.querySelector("#modalGamePublisher");

const modalDescription =
    document.querySelector("#modalGameDescription");

const gameModal =
    new bootstrap.Modal(
        document.querySelector("#gameModal")
    );

export function openGameModal(game) {

    modalTitle.textContent = game.title;

    modalImage.src = game.thumbnail;

    modalGenre.textContent =
        `Género: ${game.genre}`;

    modalPlatform.textContent =
        `Plataforma: ${game.platform}`;

    modalPublisher.textContent =
        `Publisher: ${game.publisher}`;

    modalDescription.textContent =
        game.short_description;

    gameModal.show();

}