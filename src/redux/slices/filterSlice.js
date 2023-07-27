import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

const initialState = {
  searchValue: '',
  categoryId: 0,
  sortType: {
    name: 'популярности (DESC)',
    sortProperty: 'rating'
  },
  searchValue: '',
  currentPage: 1
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
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.sortType = action.payload.sort;

      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    }
  }
});

// селектор
export const selectFilterSort = (state) => state.filter.sortType;
export const selectFilterCategory = (state) => state.filter.categoryId;
export const selectFilter = (state) => state.filter;

// Action creators are generated for each case reducer function
export const {
  setCategory,
  setSortType,
  setSearchValue,
  setFilters,
  setCurrentPage
} = filterSlice.actions;

export default filterSlice.reducer;
