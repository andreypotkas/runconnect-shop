import { CartProduct } from './cart.type';
import { Grape } from './product.type';

export type ProductsState = {
  products: Grape[];
  cartProducts: CartProduct[];
  likedProducts: CartProduct[];
};
