import { Button } from 'primereact/button';

import { useDispatch } from 'react-redux';
import { removeProductFromCart } from '../../redux/products/productsSlice';

import './CartProductCard.css';
import { Product } from '../../types/product.type';

export default function CartProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const handleRemoveProductFromCart = () => dispatch(removeProductFromCart(product));

  return (
    <div className="flex gap-2 justify-content-between surface-ground">
      <div className="flex gap-2 align-items-center">
        <img alt="Card" width={60} height={60} style={{ borderRadius: '1rem' }} src={product.images[0]} />
        <div className="flex flex-column p-1">
          <div className="font-bold text-left text-sm">{product.title}</div>
        </div>
      </div>
      <div className="flex flex-column align-items-end">
        <Button icon={'pi pi-times'} text onClick={handleRemoveProductFromCart} />
        <div className="font-bold text-xl p-1 white-space-nowrap">{product.price} руб.</div>
      </div>
    </div>
  );
}
