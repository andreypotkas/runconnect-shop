import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './products/productsSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
