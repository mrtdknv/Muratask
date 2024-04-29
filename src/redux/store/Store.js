import { configureStore } from "@reduxjs/toolkit";
import moviesComingSlice from "../datas/moviesComingSlice";
import moviesImdbSlice from "../datas/moviesImdbSlice";
import favoritesSlice from "../datas/favoritesSlice";

const rootReducer = {
  moviesImdb: moviesImdbSlice,
  movieComing: moviesComingSlice,
  favorites: favoritesSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
