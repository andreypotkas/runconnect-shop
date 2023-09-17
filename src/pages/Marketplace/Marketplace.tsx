import data from '../../assets/data.json';
import { DataView } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';

import ProductCard from '../../components/ProductCard/ProductCard';
import { Grape } from '../../types/product.type';
import { ChangeEvent, useEffect, useState } from 'react';
import Header from '../Header';
import { DropdownChangeEvent } from 'primereact/dropdown';
import ProductInfo from '../../components/ProductInfo/ProductInfo';

export type Age = 'oneYear' | 'twoYear' | 'all';
export type Ripening = 'ранний' | 'поздний' | 'средний' | 'all';
export type Colors = 'синий' | 'янтарный' | 'фиолетовый' | 'красный' | 'зеленый' | 'белый' | 'all';
export type Type = 'виноград' | 'персик' | 'грецкий орех' | 'фундук';

export type Filters = {
  age?: Age;
  seed?: string;
  ripening?: string;
  type?: string;
  color?: string;
  price?: number;
  searchValue?: string;
};

export default function Marketplace() {
  const [products, setProducts] = useState<Grape[]>(data.data);
  const [filters, setFilters] = useState<Filters>({});
  const [visible, setVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Grape | null>(null);

  const handleChangeFilter = (field: keyof typeof filters, e: DropdownChangeEvent) => {
    setFilters({
      ...filters,
      [field]: e.value,
    });
  };
  const handleSetCurrentProduct = (product: Grape) => {
    setVisible(true);
    setCurrentProduct(product);
  };

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      searchValue: e.target.value.toLowerCase(),
    });
  };
  useEffect(() => {
    const filteredProducts = data.data.filter((item) => {
      // const ageCondition = filters.age && item.y !== null &&  filters.age !== 'all' ? item[filters.age] : true;
      const ripeningCondition =
        filters.ripening && item.ripening !== null && filters.ripening !== 'all'
          ? item.ripening === filters.ripening
          : true;
      const colorCondition = filters.color && filters.color !== 'all' ? item.color === filters.color : true;

      const seedCondition = filters.seed && filters.seed !== 'all' ? item.seed : true;
      const nameCondition = filters.searchValue ? item.title.toLowerCase().includes(filters.searchValue) : true;
      const typeCondition = filters.type && filters.type !== 'all' ? item.type === filters.type : true;
      // Return true if all conditions are met, otherwise return false
      return typeCondition && colorCondition && ripeningCondition && seedCondition && nameCondition;
    });

    filters.price
      ? filters.price === 1
        ? filteredProducts.sort((a, b) => a.secondPrice - b.secondPrice)
        : filteredProducts.sort((a, b) => b.secondPrice - a.secondPrice)
      : filteredProducts;
    setProducts(filteredProducts);
  }, [filters]);

  return (
    <div className="p-2" style={{ background: '#f0f0f0' }}>
      <Header
        filters={filters}
        handleChangeFilter={handleChangeFilter}
        handleChangeSearchValue={handleChangeSearchValue}
      />
      <DataView
        paginator
        rows={12}
        value={products}
        itemTemplate={(item: Grape) => <ProductCard product={item} handleSetCurrentProduct={handleSetCurrentProduct} />}
      />
      <Dialog header={currentProduct?.title} visible={visible} position={'left'} onHide={() => setVisible(false)}>
        {currentProduct && <ProductInfo product={currentProduct} />}
      </Dialog>
    </div>
  );
}
