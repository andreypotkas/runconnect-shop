import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';

import { Grape } from '../../types/product.type';
import { useState } from 'react';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../redux/products/productsSlice';
import './ProductCard.css';
import { RootState } from '../../redux/store';

export default function ProductCard({
  product,
  handleSetCurrentProduct,
}: {
  product: Grape;
  handleSetCurrentProduct: (val: Grape) => void;
}) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(1);
  const age = product.type === 'виноград' ? 'Двухлетний ' : 'Трехлетний ';

  const { cartProducts } = useSelector((state: RootState) => state.products);
  const isInCart = cartProducts.find((item) => item.product.title === product.title);

  // const items: MenuItem[] = [
  //   {
  //     label: '1 Год',
  //     command: () => setAge('1 год'),
  //   },
  //   {
  //     label: '2 Года',
  //     command: () => setAge('2 года'),
  //   },
  // ];

  const handleAddProductToCart = () =>
    dispatch(
      addProductToCart({
        product,
        age: age,
        count: amount,
        price: product.secondPrice,
      }),
    );

  const header = (
    <div className="card-header ">
      {product.srcVideo && (
        <div className="relative">
          <Tag
            severity={'warning'}
            style={{ top: '0.5rem', left: '0rem' }}
            className="absolute"
            value={'Рекомендуем'}
          />
          <Tag severity={'danger'} style={{ top: '2.5rem', left: '0rem' }} className="absolute" value={'Акция'} />
        </div>
      )}
      {product.new && (
        <div className="relative">
          <Tag severity={'info'} style={{ top: '0.5rem', left: '0rem' }} className="absolute" value={'Новый'} />
        </div>
      )}
      <img alt="Card" src={'https://amped-x-music-uploaded-images.s3.eu-north-1.amazonaws.com/sorts/' + product.img} />
    </div>
  );

  const footer = (
    <div className="flex justify-content-between align-items-center gap-2 px-1 py-1">
      <div className="w-5rem">
        <InputNumber
          inputId="horizontal-buttons"
          value={amount}
          onValueChange={(e: InputNumberValueChangeEvent) => setAmount(e.value as number)}
          showButtons
          buttonLayout="horizontal"
          step={1}
          min={1}
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
        />
      </div>
      <div className="text-sm text-left  flex flex-column">
        <span className=" text-center">{age}</span>
        <span className=" text-center">саженец</span>
      </div>

      {/* <div className="flex gap-2 align-items-center">
        <SplitButton label={age} model={items} disabled />
      </div> */}
      <Button icon={'pi pi-shopping-cart'} disabled={!!isInCart} onClick={handleAddProductToCart} />
    </div>
  );

  return (
    <div className="card">
      <Card header={header} footer={footer}>
        <div className="flex align-items-center justify-content-between">
          <div className="flex flex-column p-1">
            <div className="font-bold text-left text-xl text-overflow-ellipsis overflow-hidden white-space-nowrap w-10rem">
              {product.title}
            </div>
            <div className="text-sm text-left">{product.type + ' ' + (product.color ?? '')}</div>
          </div>
          {product.srcVideo ? (
            <div className="font-bold text-xl p-1 white-space-nowrap">
              <span style={{ textDecorationLine: 'line-through' }}>{product.secondPrice + 2}</span>
              <span style={{ color: 'red' }}> {product.secondPrice} руб.</span>
            </div>
          ) : (
            <div className="font-bold text-xl p-1 white-space-nowrap">{product.secondPrice} руб.</div>
          )}
        </div>
        <div className="description-overlay text-overflow-ellipsis overflow-hidden justify-content-between flex flex-column">
          <div>
            <div className="text-left">Название: {product.title}</div>
            {product.type === 'виноград' && (
              <div>
                <div className="text-left">Цвет: {product.color}</div>
                <div className="text-left">Семечка: {product.seed ? 'есть' : 'нет'}</div>
                <div className="text-left">Созревание: {product.ripening}</div>
                <div className="text-left">Морозостойкость: {product.frostResistance}</div>
              </div>
            )}
            <div className="text-left">В наличии: {product.inStock ? 'есть' : 'нет'}</div>
            <Divider className="m-1" />
            <div className="text-left text-overflow-ellipsis overflow-hidden p-1">
              {product.description.slice(0, product.type === 'виноград' ? 150 : 240) + '..'}
            </div>
          </div>
          <Button
            className="flex-shrink-0"
            severity="success"
            label="Подробнее"
            onClick={() => handleSetCurrentProduct(product)}
          />
        </div>
      </Card>
    </div>
  );
}
