import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ChangeEvent } from 'react';
import { Filters } from './Marketplace/Marketplace';
import { InputText } from 'primereact/inputtext';

const sortOptions = [
  { label: 'По убыванию', value: -1 },
  { label: 'По возрастанию', value: 1 },
];
const seedOptions = [
  { label: 'С косточкой', value: true },
  { label: 'Без косточки', value: false },
  { label: 'Все', value: 'all' },
];
const typeOptions = [
  { label: 'Виноград', value: 'виноград' },
  { label: 'Фундук', value: 'фундук' },
  { label: 'Грецкий орех', value: 'грецкий орех' },

  { label: 'Персик', value: 'персик' },
  { label: 'Все', value: 'all' },
];
const ripeningOptions = [
  { label: 'Ранний', value: 'ранний' },
  { label: 'Средний', value: 'средний' },
  { label: 'Поздний', value: 'поздний' },
  { label: 'Все', value: 'all' },
];
const colorOptions = [
  { label: 'Синий', value: 'синий' },
  { label: 'Янтарный', value: 'янтарный' },
  { label: 'Фиолетовый', value: 'фиолетовый' },
  { label: 'Красный', value: 'красный' },
  { label: 'Зеленый', value: 'зеленый' },
  { label: 'Белый', value: 'белый' },
  { label: 'Все', value: 'all' },
];

type Props = {
  filters: Filters;
  handleChangeFilter: (field: keyof Filters, e: DropdownChangeEvent) => void;
  handleChangeSearchValue: (e: ChangeEvent<HTMLInputElement>) => void;
};
export default function Header({ filters, handleChangeFilter, handleChangeSearchValue }: Props) {
  return (
    <div className="flex gap-3 align-items-center p-3 my-2 flex-wrap" style={{ background: 'white', margin: '0' }}>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText placeholder="Search" onInput={(e: ChangeEvent<HTMLInputElement>) => handleChangeSearchValue(e)} />
      </span>

      <Dropdown
        placeholder={'Тип саженца'}
        value={filters.type}
        options={typeOptions}
        onChange={(e: DropdownChangeEvent) => handleChangeFilter('type', e)}
      />

      <Dropdown
        placeholder={'Цена'}
        value={filters.price}
        options={sortOptions}
        onChange={(e: DropdownChangeEvent) => handleChangeFilter('price', e)}
      />

      <Dropdown
        placeholder={'Созревание'}
        value={filters.ripening}
        options={ripeningOptions}
        onChange={(e: DropdownChangeEvent) => handleChangeFilter('ripening', e)}
      />

      <Dropdown
        placeholder={'Цвет'}
        value={filters.color}
        options={colorOptions}
        onChange={(e: DropdownChangeEvent) => handleChangeFilter('color', e)}
      />

      <Dropdown
        placeholder={'Косточка'}
        value={filters.seed}
        options={seedOptions}
        onChange={(e: DropdownChangeEvent) => handleChangeFilter('seed', e)}
      />
    </div>
  );
}
