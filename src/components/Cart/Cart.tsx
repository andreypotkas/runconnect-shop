import CartProductCard from '../CartProductCard/CartProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { CartProduct } from '../../types/cart.type';
import { clearCart } from '../../redux/products/productsSlice';

type ResponseProduct = {
  name: string;
  price: string;
  count: string;
  size: string;
};

type OrderBody = {
  products: ResponseProduct[];
  contactType: string;
  contact: string;
};

export default function Cart() {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state: RootState) => state.products);
  const [contactType, setContactType] = useState<string | null>(null);
  const [contact, setContact] = useState<string>('');
  const [isOrdered, setIsOrdered] = useState(false);

  const wayToContactTemplate = (option: { name: string; code: string }) => {
    if (option) {
      return (
        <div className="flex align-items-center gap-2">
          <i className={'pi ' + option.code}></i>

          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{'Выберите способ для связи'}</span>;
  };

  const contactTypes = [
    { name: 'Email', code: 'pi pi-envelope' },
    { name: 'Telegram', code: 'pi pi-telegram' },
    { name: 'Instagram', code: 'pi-instagram' },
  ];

  const sendOrder = (body: OrderBody) => {
    return axios.post('http://54.155.135.247:4000/api/v1/shop/send-message', body);
  };

  const handleCheckout = () => {
    const responseProducts = cartProducts
      ? cartProducts.map((item: CartProduct) => ({
          name: item.product.title,
          price: `${item.product.price}`,
          count: `${item.count}`,
          size: item.size,
        }))
      : [];
    setIsOrdered(true);
    sendOrder({ products: responseProducts, contact, contactType: contactType! });
    dispatch(clearCart());
    // setVisibleRight(false);
    // show();
  };

  return (
    <div className="flex flex-column flex-grow-1 justify-content-between h-full">
      <div>
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
      </div>

      {isOrdered ? (
        <div className=" surface-ground p-2 border-radius flex gap-2 align-items-center">
          <i className="pi pi-check-circle" style={{ fontSize: '4rem', color: 'green' }}></i>
          <div className="text-center">
            <div className="text-3xl text-center">Спасибо за заказ!</div>

            <div> Мы скоро с вами свяжемся.</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-column gap-2 surface-ground border-round p-2">
          <div className="text-center"> Выберите и введите контакт для связи</div>
          <Dropdown
            value={contactType}
            onChange={(e) => setContactType(e.value)}
            options={contactTypes}
            optionLabel="name"
            optionValue="name"
            valueTemplate={wayToContactTemplate}
            itemTemplate={wayToContactTemplate}
            className="w-full"
            placeholder="Выберите способ для связи"
          />
          <InputText value={contact} onChange={(e) => setContact(e.target.value)} />
          <Button
            label="Оформить заказ"
            onClick={handleCheckout}
            disabled={cartProducts.length === 0 || !contactType || contact.length < 3}
          />
        </div>
      )}
    </div>
  );
}
