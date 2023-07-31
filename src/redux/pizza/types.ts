export type SearchPizzaParams = {
    categoryBy: string;
    sortBy: string;
    order: string;
    search: string;
    currentPage: string;
  };
  
  export type PizzaType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    sizes: number[];
    rating: number;
  };
  
  export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
  }