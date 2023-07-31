import { RootState } from '../store';
import { CartItem } from './types';

// селекторы
export const selectCart = (state: RootState) => state.cart;
// сделали селектор , он принимает еще одну ф-цию в которую прокидываем id - пиццы
// из PizzaBlock вызываем этот селектор ,как ф-цию и передаем в нее id - пиццы
// получается что сперва ф-ция (id) => вызывает др. ф-цию (state) => state.cart.items.find((obj) => obj.id === id)
// и возвращает нам одну пиццу по id
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: CartItem) => obj.id === id);
