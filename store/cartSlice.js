import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += parseFloat(newItem.price);
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: parseFloat(newItem.price),
          size: newItem.size,
          quantity: 1,
          totalPrice: parseFloat(newItem.price),
          imagelink_square: newItem.imagelink_square, // تأكد من إضافة الصورة
          currency: newItem.currency, // تأكد من إضافة العملة
        });
      }

      state.totalAmount += parseFloat(newItem.price);
    },
    removeFromCart(state, action) {
      const { id, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      );

      if (existingItem) {
        state.totalAmount -= parseFloat(existingItem.price);

        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.totalPrice -= parseFloat(existingItem.price);
        } else {
          state.items = state.items.filter(
            (item) => item.id !== id || item.size !== size
          );
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
