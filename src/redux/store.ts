import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cart from './cart/slice';
import filter from './filter/slice';
import pizzas from './pizza/slice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas
  }
});
// тип для RootState - для типизиции селекторов
export type RootState = ReturnType<typeof store.getState>;
// тип для dispatch
type AppDispatch = typeof store.dispatch;
// хук useAppDispatch - для асинхронного dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
