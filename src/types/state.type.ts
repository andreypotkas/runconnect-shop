import { CartProduct } from './cart.type';
import { Product } from './product.type';

export type ProductsState = {
  products: Product[];
  cartProducts: CartProduct[];
  favoriteProducts: Product[];
};
