import { CartItem } from '../redux/cart/types';

// ф-ция сумирует цену пицц отложенных в корзину и возвращает totalPrice
export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
