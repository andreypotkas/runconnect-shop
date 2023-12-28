import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Product } from '../../types/product.type';
import './ProductCard.scss';

import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  const renderNameAndPrice = (): string => {
    const label = (
      <div className="flex gap-2 align-items-center">
        <span className="white-space-nowrap overflow-hidden text-overflow-ellipsis max-w-13rem">{product.title}</span>
        <Chip
          style={{ background: 'var(--primary-color)', color: 'white' }}
          label={new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(product.price)}
        />
      </div>
    ) as unknown;

    return label as string;
  };

  const handleClickProductCard = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="col-12 md:col-4 lg:col-4 lx:col-3 p-2" style={{ minWidth: '320px', border: 'none' }}>
      <Card style={{ background: product.cardColor }} className="h-full" onClick={handleClickProductCard}>
        <div className="image-container">
          <img alt="Card" src={product.images[0]} />
        </div>
        <Chip
          className="absolute flex-shrink-0"
          style={{ bottom: '1rem', left: '1rem' }}
          label={renderNameAndPrice()}
        />
      </Card>
    </div>
  );
}
