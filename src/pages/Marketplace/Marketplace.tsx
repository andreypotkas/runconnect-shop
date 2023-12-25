import { DataView } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';

import ProductCard from '../../components/ProductCard/ProductCard';
import { useMemo, useState } from 'react';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import { Product } from '../../types/product.type';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import MemoizedMarketplaceMenu from './MarketplaceMenu';
import './Marketplace.scss';

export type Filters = {
  size?: string;
  favorite?: boolean;
};

export default function Marketplace() {
  const { products, favoriteProducts } = useSelector((state: RootState) => state.products);
  const [visible, setVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<Filters>({} as Filters);
  const [sortOrder, setSortOrder] = useState<1 | 0 | -1 | null | undefined>(0);
  const [sortField, setSortField] = useState<string>('');

  const handleSetCurrentProduct = (product: Product) => {
    setVisible(true);
    setCurrentProduct(product);
  };

  const filteredProducts = useMemo(() => {
    if (filters.favorite) return favoriteProducts;

    if (filters.size) {
      return products.filter((item) => item.sizes.includes(filters.size!));
    }

    return products;
  }, [products, filters, favoriteProducts]);

  const renderEmptyMessage = (): unknown => {
    return <h4 className="text-center">Нет товаров соответствующих парамтрам поиска.</h4>;
  };

  return (
    <div>
      <div className="marketplace-container">
        <MemoizedMarketplaceMenu setSortField={setSortField} setSortOrder={setSortOrder} setFilters={setFilters} />
        {/* <Divider className="hidden lg:block" layout="vertical" /> */}
        <DataView
          sortField={sortField}
          sortOrder={sortOrder}
          className="w-full grid grid-nogutter"
          rows={12}
          emptyMessage={renderEmptyMessage() as string}
          value={filteredProducts}
          itemTemplate={(item: Product) => (
            <ProductCard product={item} handleSetCurrentProduct={handleSetCurrentProduct} />
          )}
        />
      </div>
      <Dialog header={currentProduct?.title} visible={visible} position={'left'} onHide={() => setVisible(false)}>
        {currentProduct && <ProductInfo product={currentProduct} />}
      </Dialog>
    </div>
  );
}
