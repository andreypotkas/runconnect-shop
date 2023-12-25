import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Galleria } from 'primereact/galleria';
import { products } from '../../assets/data';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import ProductCard from '../../components/ProductCard/ProductCard';
import { addProductToCart, addToFavorite, removeProductFromCart } from '../../redux/products/productsSlice';
import './Product.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Divider } from 'primereact/divider';

function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = products[id ? +id - 1 : 1];
  const { favoriteProducts, cartProducts } = useSelector((state: RootState) => state.products);

  const isFavorite = favoriteProducts.find((item) => item.id === product.id);
  const isInCart = cartProducts.find((item) => item.product.id === product.id);

  const [count, setCount] = useState(1);
  const [size, setSize] = useState('40');

  const itemTemplate = (item: string) => {
    return <img src={item} alt={'image'} style={{ width: '100%', maxHeight: '30rem' }} />;
  };

  const thumbnailTemplate = (item: string) => {
    return <img src={item} alt={'image'} width={'50px'} height={'50px'} />;
  };

  const handleAddProductToCart = () => {
    dispatch(addProductToCart({ product: product, size, count }));
  };

  const handleRemoveProductToCart = () => {
    dispatch(removeProductFromCart(product));
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
          <div className="border-round surface-ground p-3 h-full flex flex-grow-1 flex-column">
            <div className="text-2xl font-bold">{product.title}</div>

            <div className="text-6xl">{product.price} р.</div>
            <Divider />

            <div className="flex flex-column gap-3 mb-3">
              <div className="text-xl">Выберите размер</div>

              <div className="flex gap-2">
                {['40', '41', '42', '43', '44', '45'].map((item) => {
                  return (
                    <Button
                      className="p-2"
                      key={item}
                      label={item}
                      onClick={() => setSize(item)}
                      outlined={size !== item}
                    />
                  );
                })}
              </div>
            </div>
            <Divider />

            <div className="justify-content-between h-full flex flex-column flex-grow-1">
              <div className="flex flex-column gap-3">
                <div className="text-xl">Выберите количество</div>

                <span className="input-number-wrapper">
                  <InputNumber
                    min={1}
                    value={1}
                    showButtons
                    buttonLayout="horizontal"
                    style={{ width: '9rem' }}
                    incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus"
                    onChange={(e) => setCount(e.value!)}
                  />
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {isInCart ? (
                <Button
                  severity="warning"
                  className="flex-grow-1"
                  label="Удалить из корзины"
                  icon={'pi pi-shopping-cart '}
                  onClick={handleRemoveProductToCart}
                />
              ) : (
                <Button
                  className="flex-grow-1"
                  label="Добавить в корзину"
                  icon={'pi pi-shopping-cart '}
                  onClick={handleAddProductToCart}
                />
              )}

              <Button icon={'pi pi-heart'} outlined={!isFavorite} onClick={() => addToFavorite(product)} />
            </div>
          </div>
        </div>
        <div className="border-round p-2 surface-card">
          <h2>Описание</h2>
          <span>{product.description}</span>
        </div>
      </div>

      <div className="card surface-card flex gap-3 flex-column p-2">
        <h2>Похожие товары</h2>
        <div className="flex justify-content-around flex-wrap gap-2">
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
