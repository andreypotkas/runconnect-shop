import { useState } from 'react';
import logo from '../../assets/logo.png';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Sidebar } from 'primereact/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CartProductCard from '../CartProductCard/CartProductCard';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { clearCart } from '../../redux/products/productsSlice';

export default function Header({ show }: { show: () => void }) {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state: RootState) => state.products);
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const [contact, setContact] = useState('');

  const total = cartProducts.reduce((acc, a) => acc + a.price * a.count, 0);

  const orderEmail = () => {
    let container = '';

    {
      cartProducts.forEach(
        (product) =>
          (container += `
            <div style="display:flex; gap: 30px; border: 2px solid #ccc; padding: 20px; margin-bottom: 20px; border-radius: 10px">
            <img src="${
              'https://amped-x-music-uploaded-images.s3.eu-north-1.amazonaws.com/sorts/' + product.product.img
            }" alt=${product.product.title} width="100" height="100px" style="border-radius:10px"/>  
            <div style="padding-left: 20px">
                <h2 style="margin:0px"> ${product.product.title}</h2>
                <div>Цена: ${product.product.price} руб.</div>
                <div>Тип: ${product.product.type}</div>
                <div>Количество: ${product.count}</div>
              </div>
              
            </div>
          `),
      );
    }
    container += `<h2>Общая сумма заказа: ${total} руб.</h2>`;

    return container;
  };

  const sendEmail = (body: string, tel: string) => {
    return axios.post('https://grapes-backend-x7er.onrender.com/sendmail', {
      body: body,
      name: '',
      tel: tel,
    });
  };

  const handleSendOrder = () => {
    const mail = orderEmail();
    sendEmail(mail, contact);
    dispatch(clearCart());
    setVisibleRight(false);
    show();
  };
  return (
    <div className="flex justify-content-between align-items-center px-2">
      <div className="flex gap-2 align-items-center">
        <img src={logo} alt="logo" width={50} height={50} />
        <div>
          <div className="flex align-items-left flex-column">
            <h2 style={{ color: 'var(--primary-color)' }} className="m-0 text-left">
              Test name
            </h2>
            <a style={{ textDecoration: 'none', color: 'black' }} className="font-bold" href="tel:+375445914151">
              <i className="pi pi-phone"></i>
              <span>+375 44 591-41-51</span>
            </a>
          </div>
        </div>
      </div>

      <div className="cart">
        <div className="flex flex-column justify-content-center align-items-center">
          <Button
            label={window.innerWidth > 520 ? 'Корзина' : ''}
            icon={window.innerWidth > 520 ? '' : 'pi pi-shopping-cart'}
            onClick={() => setVisibleRight(true)}
          >
            <Badge value={cartProducts.length} severity="danger"></Badge>
          </Button>
        </div>
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} className="w-22rem">
          <div className="flex flex-column gap-2 justify-content-between h-full">
            <div className="overflow-scroll cart-scroll">
              <div className="flex flex-column gap-2 ">
                {cartProducts.map((item) => (
                  <CartProductCard key={Math.random()} product={item} />
                ))}
              </div>
            </div>

            <div className="flex flex-column justify-content-center gap-2 p-1" style={{ background: '#f0f0f0' }}>
              <span className="text-sm">
                После оформления заказа, мы свяжемся с вами для подтверждения. Пожалуйста, укажите свой e-mail или
                телефон для связи.
              </span>
              <InputText
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              />
              <Divider className="m-1" />
              <span>Общая стоимость: {total} руб.</span>
              <Button
                label="Оформить заказ"
                onClick={handleSendOrder}
                disabled={contact.length < 6 || cartProducts.length === 0}
              />
            </div>
          </div>
        </Sidebar>
      </div>
    </div>
  );
}
