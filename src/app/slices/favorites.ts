import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import BASE_URL from "../config";

export interface Favorite {
  id: string;
  created_at?: number;
  messages?: any[];
}

const initialState: Favorite[] = [];

const favoritesSlice = createSlice({
  name: `favorites`,
  initialState,
  reducers: {
    fillFavorites(state, action: PayloadAction<Favorite[]>) {
      return action.payload;
    },
    addFavorite(state, action: PayloadAction<Favorite>) {
      state.push(action.payload);
    },
    deleteFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      const idx = state.findIndex((f) => f.id == id);
      if (idx > -1) {
        state.splice(idx, 1);
      }
    },
    populateFavorite(state, action: PayloadAction<Favorite>) {
      const { id, messages } = action.payload;
      const idx = state.findIndex((fav) => fav.id == id);
      if (idx > -1) {
        state[idx].messages = messages;
      }
    }
  }
});

export const { addFavorite, deleteFavorite, fillFavorites, populateFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
