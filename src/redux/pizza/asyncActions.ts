import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaType, SearchPizzaParams } from './types';

// <PizzaType[], SearchPizzaParams> 1.Что возвращает ф-ция / 2. Что получает ф-ция
export const fetchPizzas = createAsyncThunk<PizzaType[], SearchPizzaParams>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { categoryBy, sortBy, order, search, currentPage } = params;
    // axios.get - вернет массив PizzaType[]
    const res = await axios.get<PizzaType[]>(
      `https://64b80d1321b9aa6eb0797c27.mockapi.io/items?page=${currentPage}&limit=4&${categoryBy}&sortBy=${sortBy}&order=${order}${search}`
    );
    return res.data;
  }
);
