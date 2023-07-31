import { RootState } from '../store';

export const selectPizzaItems = (state: RootState) => state.pizzas.items;
export const selectPizzaStatus = (state: RootState) => state.pizzas.status;
