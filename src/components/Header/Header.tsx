import { useState } from 'react';
import logo from '../../assets/logo.png';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Sidebar } from 'primereact/sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Cart from '../Cart/Cart';

export default function Header({ show }: { show: () => void }) {
  const { cartProducts } = useSelector((state: RootState) => state.products);
  const [visibleRight, setVisibleRight] = useState<boolean>(false);

  return (
    <div className="flex justify-content-between align-items-center px-2">
      <div className="flex gap-2 align-items-center">
        <img src={logo} alt="logo" width={50} height={50} />
        <div>
          <div className="flex align-items-left flex-column">
            <h2 style={{ color: 'var(--primary-color)' }} className="m-0 text-left">
              Виноградник
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
          <Cart show={show} setVisibleRight={setVisibleRight} />
        </Sidebar>
      </div>
    </div>
  );
}
