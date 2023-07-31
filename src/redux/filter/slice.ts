import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterSliceState, SortPropertyEnum, SortType } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'популярности (DESC)',
    sortProperty: SortPropertyEnum.RATING_DESC
  },
  currentPage: 1
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: SortPropertyEnum.RATING_DESC
        };
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { setCategory, setSortType, setSearchValue, setFilters, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
