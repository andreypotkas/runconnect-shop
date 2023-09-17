import { Button } from 'primereact/button';

import { useDispatch } from 'react-redux';
import { removeProductFromCart } from '../../redux/products/productsSlice';
import { CartProduct } from '../../types/cart.type';

import './CartProductCard.css';

export default function CartProductCard({ product }: { product: CartProduct }) {
  const dispatch = useDispatch();
  const handleRemoveProductFromCart = () => dispatch(removeProductFromCart(product));

  return (
    <div className="flex gap-2 justify-content-between" style={{ background: '#f0f0f0', borderRadius: '0.2rem' }}>
      <div className="flex gap-2 align-items-center p-2">
        <img
          alt="Card"
          width={50}
          height={50}
          style={{ borderRadius: '1rem' }}
          src={'https://amped-x-music-uploaded-images.s3.eu-north-1.amazonaws.com/sorts/' + product.product.img}
        />
        <div className="flex flex-column p-1">
          <div className="font-bold text-left text-xl   w-6rem">{product.product.title}</div>
          <div className="text-sm text-left"> {product.product.type}</div>
          <div className="text-sm text-left">Количество: {product.count}</div>
          <div className="text-sm text-left">Возраст: {product.age}</div>
        </div>
      </div>
      <div className="flex flex-column align-items-end">
        <Button icon={'pi pi-times'} text onClick={handleRemoveProductFromCart} />
        <div className="font-bold text-xl p-1 white-space-nowrap">{product.product.price} руб.</div>
      </div>
    </div>
  );
}
