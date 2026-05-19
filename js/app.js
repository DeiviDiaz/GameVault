import { renderGames } from "./components/renderGames.js";

const games = [
    {
        id: 1,
        title: "The Witcher 3",
        genre: "RPG",
        image:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e"
    },

    {
        id: 2,
        title: "Cyberpunk 2077",
        genre: "Action",
        image:
            "https://images.unsplash.com/photo-1511512578047-dfb367046420"
    },

    {
        id: 3,
        title: "Red Dead Redemption 2",
        genre: "Adventure",
        image:
            "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8"
    },

    {
        id: 4,
        title: "Elden Ring",
        genre: "Soulslike",
        image:
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
    }
];

renderGames(games);
