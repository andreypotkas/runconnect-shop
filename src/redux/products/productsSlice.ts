import { createSlice } from '@reduxjs/toolkit';
import { ProductsState } from '../../types/state.type';
import { products } from '../../assets/data';

const initialState: ProductsState = {
  products: products,
  cartProducts: [],
  favoriteProducts: JSON.parse(localStorage.getItem('favoriteProducts')!) ?? [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.favoriteProducts.push(action.payload);
      localStorage.setItem('favoriteProducts', JSON.stringify(state.favoriteProducts));
      console.log(state.favoriteProducts);
    },
    removeFromFavorite: (state, action) => {
      state.favoriteProducts = state.favoriteProducts.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('favoriteProducts', JSON.stringify(state.favoriteProducts));
    },
    addProductToCart: (state, action) => {
      state.cartProducts.push(action.payload);
    },
    removeProductFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter((item) => item.product.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const { addProductToCart, removeProductFromCart, removeFromFavorite, clearCart, addToFavorite } =
  productsSlice.actions;
export default productsSlice.reducer;
