import { MenuItem } from 'primereact/menuitem';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Menu } from 'primereact/menu';
import { Filters } from './Marketplace';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

type Props = {
  setFilters: Dispatch<SetStateAction<Filters>>;
  setSortOrder: Dispatch<SetStateAction<0 | 1 | -1 | null | undefined>>;
  setSortField: Dispatch<SetStateAction<string>>;
};

interface SortOption {
  label: string;
  value: string;
}

function MarketplaceMenu({ setFilters, setSortField, setSortOrder }: Props) {
  const [visible, setVisible] = useState<boolean>(false);

  const items: MenuItem[] = [
    {
      label: 'Каталог',
      items: [
        { label: 'Все', icon: 'pi pi-fw pi-list', command: () => setFilters({}) },
        { label: 'Избранное', icon: 'pi pi-heart', command: () => setFilters({ favorite: true }) },
      ],
    },
    {
      label: 'Фильтр по размеру',
      icon: 'pi pi-star',
      items: [
        { label: '40', command: () => setFilters({ size: '40' }) },
        { label: '41', command: () => setFilters({ size: '41' }) },
        { label: '42', command: () => setFilters({ size: '42' }) },
        { label: '43', command: () => setFilters({ size: '43' }) },
        { label: '44', command: () => setFilters({ size: '44' }) },
      ],
    },
  ];

  const [sortKey, setSortKey] = useState<string>('');

  const sortOptions: SortOption[] = [
    { label: 'Цена по возрастанию', value: 'price' },
    { label: 'Цена по убыванию', value: '!price' },
  ];

  const onSortChange = (event: DropdownChangeEvent) => {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  return (
    <div>
      <div id="marketplace-menu">
        <Dropdown
          options={sortOptions}
          value={sortKey}
          optionLabel="label"
          placeholder="Сортировка по цене"
          onChange={onSortChange}
          className="w-16rem"
        />
        <Menu model={items} className="surface-ground border-none" />
      </div>
      <div className="marketplace-menu-mob px-2">
        <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
      </div>
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <div className="w-full">
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Сортировка по цене"
            onChange={onSortChange}
            className="w-full m-1"
          />
          <Menu model={items} className="surface-ground border-none" />
        </div>
      </Sidebar>
    </div>
  );
}

const MemoizedMarketplaceMenu = React.memo(MarketplaceMenu);
export default MemoizedMarketplaceMenu;
