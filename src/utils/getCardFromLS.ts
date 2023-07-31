// ф-ция проверяет если в data есть данные,
//то парсит их в строку или вернет пустой массив
// экспортируем ее в cartSlice, получается стейт корзины
// будет получать пиццы из корзины из localStorage

import { CartItem } from '../redux/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

// и при перезагрузки они не будут исчезать и стейт не будет обнулятся
export const getCardFromLS = () => {
  const data = localStorage.getItem('pizzaCart');
  const items = data ? (JSON.parse(data) as CartItem[]) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice
  };
};
