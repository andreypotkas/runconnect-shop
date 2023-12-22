import { ChangeEvent, useState } from 'react';
import logo from '../../assets/logo.png';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import Cart from '../Cart/Cart';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-content-between align-items-center p-3 gap-2 surface-ground">
      <div className="flex align-items-center" onClick={() => navigate('/')}>
        <img src={logo} alt="logo" width={50} height={50} />
        <h2 className="m-0 text-center">RunConnect Shop</h2>
      </div>

      <span className="p-input-icon-left w-full max-w-30rem">
        <i className="pi pi-search" />
        <InputText
          className="w-full"
          placeholder="Поиск по названию"
          onInput={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
        />
      </span>

      <div className="cart">
        <Button className="h-3rem" outlined icon={'pi pi-shopping-cart'} onClick={() => setVisibleRight(true)}></Button>
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} className="w-22rem">
          <Cart />
        </Sidebar>
      </div>
    </div>
  );
}
