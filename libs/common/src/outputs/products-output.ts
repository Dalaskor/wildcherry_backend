import { Product } from '@app/database';

export interface ProductsOutput {
  products: Product[];
  count: number;
  priceMax: number;
}
