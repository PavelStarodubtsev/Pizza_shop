import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

const initialState = {
  items: [],
  totalPrice: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count - sum;
      }, 0);
    },
    clearItem: (state) => {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

// селекторы
export const selectCart = (state) => state.cart;
// сделали селектор , он принимает еще одну ф-цию в которую прокидываем id - пиццы
// из PizzaBlock вызываем этот селектор ,как ф-цию и передаем в нее id - пиццы
// получается что сперва ф-ция (id) => вызывает др. ф-цию (state) => state.cart.items.find((obj) => obj.id === id)
// и возвращает нам одну пиццу по id
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
