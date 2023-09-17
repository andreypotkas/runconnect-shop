export type Grape = {
  title: string;
  color: string | null;
  seed: boolean | null;
  ripening?: string | null;
  frostResistance?: number | null;
  price: number;
  secondPrice: number;
  img: string;
  description: string;
  count?: number;
  srcVideo?: string;
  inStock: boolean;
  oneYear: boolean | null;
  twoYear: boolean | null;
  currentYear?: number;
  type?: string;
  new?: boolean;
  additionalImages?: string[];
};
