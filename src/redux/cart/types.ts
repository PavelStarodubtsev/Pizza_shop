export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  count: number;
  types: string;
  sizes: number;
  price: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
