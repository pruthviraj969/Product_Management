import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import toastReducer    from './slices/toastSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    toast:    toastReducer,
  },
});