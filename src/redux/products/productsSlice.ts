// src/slices/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Grape } from '../../types/product.type';
import { ProductsState } from '../../types/state.type';
import data from '../../assets/data.json';
import { CartProduct } from '../../types/cart.type';

const initialState: ProductsState = {
  products: data.data as Grape[],
  cartProducts: [] as CartProduct[],
  likedProducts: [] as CartProduct[],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.cartProducts.push(action.payload);
    },
    removeProductFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter((item) => item.product.img !== action.payload.product.img);
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const { addProductToCart, removeProductFromCart, clearCart } = productsSlice.actions;
export default productsSlice.reducer;
