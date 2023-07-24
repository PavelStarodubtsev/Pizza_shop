import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

const initialState = {
  categoryId: 0,
  sortType: {
    name: 'популярности (DESC)',
    sortProperty: 'rating'
  },
  searchValue: ''
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    getSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    clearSearchValue: (state) => {
      state.searchValue = '';
    }
  }
});

// Action creators are generated for each case reducer function
export const { setCategory, setSortType, getSearchValue, clearSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
