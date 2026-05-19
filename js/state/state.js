export const state = {

    favorites: JSON.parse(
        localStorage.getItem("favorites")
    ) || []

};