import { RootState } from '../store';

// селектор
export const selectFilterSort = (state: RootState) => state.filter.sort;
export const selectFilterCategory = (state: RootState) => state.filter.categoryId;
export const selectFilter = (state: RootState) => state.filter;
