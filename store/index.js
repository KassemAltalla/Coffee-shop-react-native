import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoriteReducer from "./favoriteSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoriteReducer,
  },
});

console.log("====================================");
console.log(store.reducer);
console.log("====================================");

export default store;
