import { Product } from './product.type';

export type ProductsState = {
  products: Product[];
  cartProducts: Product[];
  favoriteProducts: Product[];
};
