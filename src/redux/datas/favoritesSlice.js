import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [], // Favori öğelerinizi saklayacak dizi
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Favoriye ekleme işlevselliğini tanımlayalım
    addToFavorites: (state, action) => {
      const { movie } = action.payload;
      // Eğer öğe zaten favorilerde ise eklemeyi durdur
      if (!state.favorites.find((fav) => fav.id === movie.id)) {
        state.favorites.push(movie); // Favorilere ekle
        // Favori öğeleri yerel depoya kaydet
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
  },
});

export const { addToFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
