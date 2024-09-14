import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      // إذا كانت موجودة بالفعل في المفضلة، قم بإزالتها، وإلا أضفها
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(
          (favoriteId) => favoriteId !== id
        );
      } else {
        state.favorites.push(id);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
