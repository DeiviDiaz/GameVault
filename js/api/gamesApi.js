const BASE_URL =
    "https://corsproxy.io/?https://www.freetogame.com/api/games";

export async function fetchGames() {

    try {

        const response = await fetch(BASE_URL);

        if (!response.ok) {
            throw new Error("Error al obtener videojuegos");
        }

        const data = await response.json();

        return data.slice(0, 12);

    } catch (error) {

        console.error(error);

        return [];

    }

}