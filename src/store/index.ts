import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import categoriesReducer from './categoriesSlice';
import authReducer from './userSlice';
import cartReducer  from './cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
