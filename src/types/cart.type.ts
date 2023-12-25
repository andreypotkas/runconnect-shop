import { Product } from './product.type';

export type CartProduct = {
  product: Product;
  count: number;
  size: string;
};
