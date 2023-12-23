import React from 'react';
import { useParams } from 'react-router-dom';
import { Galleria } from 'primereact/galleria';
import { products } from '../../assets/data';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Product.scss';

function Product() {
  const { id } = useParams();
  const product = products[id ? +id - 1 : 1];

  const itemTemplate = (item: string) => {
    return <img src={item} alt={'image'} style={{ width: '100%' }} />;
  };

  const thumbnailTemplate = (item: string) => {
    return <img src={item} alt={'image'} width={'50px'} height={'50px'} />;
  };

  return (
    <div className="p-2 flex flex-column gap-2">
      <div className="flex gap-2 flex-wrap">
        <div className="surface-card p-2 flex-grow-1" style={{ flex: '1 0 48%' }}>
          <Galleria
            value={product.images}
            showItemNavigators
            circular
            numVisible={5}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
          />
        </div>
        <div className="surface-card p-2 gap-3 flex flex-column" style={{ flex: '1 0 50%' }}>
          <div className="text-3xl font-bold">{product.title}</div>
          <div className="text-4xl">{product.price} р.</div>

          <div className="text-xl">Размеры</div>

          <div className="flex gap-2">
            <Button label="40" outlined />
            <Button label="41" outlined />
            <Button label="42" outlined />
            <Button label="43" outlined />
            <Button label="44" outlined />
            <Button label="45" outlined />
          </div>

          <div className="gap-4 flex flex-column">
            <div className="flex align-items-center gap-2">
              <div className="font-bold">Количество</div>

              <span className="input-number-wrapper">
                <InputNumber
                  value={0}
                  showButtons
                  buttonLayout="horizontal"
                  style={{ width: '9rem', maxWidth: '9rem' }}
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                />
              </span>
            </div>
            <div className="flex gap-2">
              <Button className="flex-grow-1" label="Добавить в корзину" icon={'pi pi-shopping-cart '} />

              <Button icon={'pi pi-heart'} outlined />
            </div>
          </div>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="card surface-card flex gap-3 flex-column p-2">
        <h2>
          <p className="text-2xl">Похожие товары</p>
        </h2>
        <div className="flex justify-content-around flex-wrap">
          {products.slice(0, 3).map((item) => {
            return <ProductCard key={Math.random()} product={item} handleSetCurrentProduct={() => {}} />;
          })}
        </div>
      </div>
    </div>
  );
}

const MemoizedProduct = React.memo(Product);
export default MemoizedProduct;
