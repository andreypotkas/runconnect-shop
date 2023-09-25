import CartProductCard from '../CartProductCard/CartProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { useState } from 'react';
import axios from 'axios';
import { clearCart } from '../../redux/products/productsSlice';
import { CartProduct } from '../../types/cart.type';
import ReactGA from 'react-ga4';

type Product = {
  name: string;
  price: number;
  count: number;
  age: number;
};

type OrderBody = {
  products: Product[];
  address: string;
  contact: string;
  totalCount: number;
  totalPrice: number;
};

type Props = {
  setVisibleRight: (val: boolean) => void;
  show: () => void;
};

export default function Cart({ show, setVisibleRight }: Props) {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state: RootState) => state.products);
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const totalPrice = cartProducts.reduce((acc, a) => acc + a.price * a.count, 0);
  const totalCount = cartProducts.reduce((acc, a) => acc + a.count, 0);

  const sendOrder = (body: OrderBody) => {
    ReactGA.event({
      category: 'User Interaction',
      action: 'Clicked My Button',
      label: 'Button Label',
    });
    return axios.post('https://grapes-backend-x7er.onrender.com/send-message', body);
  };

  const handleSendOrder = () => {
    const responseProducts = cartProducts
      ? cartProducts.map((item: CartProduct) => ({
          name:
            (item.product.type ? item.product.type : '') +
            ' ' +
            item.product.title +
            ' ' +
            (item.product.color ? item.product.color : ''),
          price: item.price,
          count: item.count,
          age: item.age,
        }))
      : [];
    sendOrder({ products: responseProducts, contact, address, totalCount, totalPrice });
    dispatch(clearCart());
    setVisibleRight(false);
    show();
  };

  return (
    <div className="flex flex-column gap-2 justify-content-between h-full">
      {cartProducts.length ? (
        <div className="overflow-scroll cart-scroll">
          <div className="flex flex-column gap-2 ">
            {cartProducts.map((item) => (
              <CartProductCard key={Math.random()} product={item} />
            ))}
          </div>
        </div>
      ) : (
        <Chip label={'Вы ещё не добавили товары в корзину.'} />
      )}

      <div className="flex flex-column justify-content-center gap-2 p-1" style={{ background: '#f0f0f0' }}>
        <span className="text-sm">
          После оформления заказа, мы свяжемся с вами для подтверждения заказа. Пожалуйста, укажите свой e-mail или
          телефон для связи, а также адрес доставки.
        </span>
        <InputText
          placeholder="Email или телефон"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
          }}
        />
        <InputText
          placeholder="Адрес доставки"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <Divider className="m-1" />
        <span>Общая стоимость: {totalPrice} руб.</span>
        <Button
          label="Оформить заказ"
          onClick={handleSendOrder}
          disabled={contact.length < 6 || cartProducts.length === 0}
        />
      </div>
    </div>
  );
}
