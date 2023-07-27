import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const { categoryBy, sortBy, order, searchInput, currentPage } = params;
  const res = await axios.get(
    `https://64b80d1321b9aa6eb0797c27.mockapi.io/items?page=${currentPage}&limit=4&${categoryBy}&sortBy=${sortBy}&order=${order}${searchInput}`
  );
  return res.data;
});

const initialState = {
  items: [],
  status: 'loading' // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.items = action.payload;
    }
  },

  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
    //   state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    }
  }
});

// Action creators are generated for each case reducer function
export const { setItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;
