import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Button } from 'primereact/button';
import { Product } from '../../types/product.type';
import './ProductCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addToFavorite, removeFromFavorite } from '../../redux/products/productsSlice';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({
  product,
}: {
  product: Product;
  handleSetCurrentProduct: (val: Product) => void;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favoriteProducts } = useSelector((state: RootState) => state.products);

  const isFavorite = favoriteProducts.find((item) => item.id === product.id);
  const renderNameAndPrice = (): string => {
    const label = (
      <div className="flex gap-2 align-items-center">
        <span className="white-space-nowrap overflow-hidden text-overflow-ellipsis max-w-13rem">{product.title}</span>
        <Chip style={{ background: 'var(--primary-color)', color: 'white' }} label={product.price + ' р.'} />
      </div>
    ) as unknown;

    return label as string;
  };

  const handleClickFavoriteBtn = () => {
    isFavorite ? dispatch(removeFromFavorite(product)) : dispatch(addToFavorite(product));
  };

  const handleClickProductCard = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card className="product-card" style={{ background: product.cardColor }} onClick={handleClickProductCard}>
      <div className="image-container">
        <img alt="Card" src={product.images[0]} />
      </div>
      <Chip className="absolute" style={{ bottom: '1rem', left: '1rem' }} label={renderNameAndPrice()} />
      <Button
        icon={isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'}
        className="absolute"
        outlined={!isFavorite}
        style={{ top: '1rem', right: '1rem' }}
        onClick={handleClickFavoriteBtn}
      />
    </Card>
  );
}
