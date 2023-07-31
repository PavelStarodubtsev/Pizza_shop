import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PizzaType, Status } from './types';
import { fetchPizzas } from './asyncActions';

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

// Action creators are generated for each case reducer function
export const { setItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;
