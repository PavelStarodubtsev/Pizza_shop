import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizzaSlice from './slices/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizzas: pizzaSlice
  }
});
// тип для RootState - для типизиции селекторов
export type RootState = ReturnType<typeof store.getState>;
// тип для dispatch 
type AppDispatch = typeof store.dispatch;
// хук useAppDispatch - для асинхронного dispatch 
export const useAppDispatch = () => useDispatch<AppDispatch>();
