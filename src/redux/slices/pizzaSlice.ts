import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { SortType } from './filterSlice';

export type SearchPizzaParams = {
  categoryBy: string;
  //   sortBy: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: string;
};

type PizzaType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

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

interface PizzaSliceState {
  items: PizzaType[];
  status: Status;
  //   status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<PizzaType[]>) => {
      state.items = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  }
});

export const selectPizzaItems = (state: RootState) => state.pizzas.items;
export const selectPizzaStatus = (state: RootState) => state.pizzas.status;

// Action creators are generated for each case reducer function
export const { setItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;
