import { Button } from 'primereact/button';

import { useDispatch } from 'react-redux';
import { removeProductFromCart } from '../../redux/products/productsSlice';

import './CartProductCard.css';
import { CartProduct } from '../../types/cart.type';

import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';

export default function CartProductCard({ product }: { product: CartProduct }) {
  const dispatch = useDispatch();
  const handleRemoveProductFromCart = () => dispatch(removeProductFromCart(product.product));

  return (
    <div className="flex flex-column justify-content-between surface-ground px-2 pb-2 border-round">
      <div className="flex justify-content-between align-items-center">
        <div className="font-bold text-left">{product.product.title}</div>
        <Button icon={'pi pi-times'} text onClick={handleRemoveProductFromCart} />
      </div>

      <div className="flex justify-content-between align-items-center">
        <div className="flex gap-2 align-items-center">
          <Avatar image={product.product.images[0]} className="p-overlay-badge" icon="pi pi-user" size="xlarge">
            <Badge value={product.count} />
          </Avatar>
          <div className="flex flex-column p-1">{product.size} размер</div>
        </div>
        <div className="text-xl ">{product.product.price} р.</div>
      </div>
    </div>
  );
}
