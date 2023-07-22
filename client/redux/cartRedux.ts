import { createSlice } from "@reduxjs/toolkit";

const cartSlice: any = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state: any, action: any) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    quantityPlus: (state: any, action: any) => {
      state.products.map((product: any) => {
        if (action.payload.id === product._id) {
          product.quantity += 1;
          state.total += product.price;
        }
      });
    },
    quantityMinus: (state: any, action: any) => {
      state.products.map((product: any) => {
        if (action.payload.id === product._id) {
          product.quantity -= 1;
          state.total -= product.price;
          if (product.quantity == 0) {
            let index = state.products.indexOf(product);
            state.products.splice(index, 1);
          }
        }
      });
    },
    resetCart: (state: any) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
} as any);

export const { addProduct, quantityPlus, quantityMinus, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
