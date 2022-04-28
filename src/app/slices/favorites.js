import { createSlice } from "@reduxjs/toolkit";
// import BASE_URL from "../config";
const initialState = [];
const favoritesSlice = createSlice({
  name: `favorites`,
  initialState,
  reducers: {
    fullfillFavorites(state, action) {
      return action.payload;
    },
    populateFavorite(state, action) {
      const { id, data } = action.payload;
      const idx = state.findIndex((fav) => fav.id == id);
      if (idx > -1) {
        state[idx].data = data;
      }
    },
  },
});
export const { fullfillFavorites, populateFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
