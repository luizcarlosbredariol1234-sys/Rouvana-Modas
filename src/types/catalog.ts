export type ProductCategory = 'todos' | 'plus_size' | 'vestidos' | 'blusas' | 'camisas' | 'calcas' | 'jaquetas';

export interface ProductColor {
  name: string;
  hex: string;
  border?: boolean;
}

export interface SizeMeasurement {
  size: string;
  busto: string;
  cintura: string;
  quadril: string;
  comprimento: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  fiberHighlight: string;
  composition: string;
  weave?: string;
  weight?: string;
  fit?: string;
  touch?: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  reviewsCount: number;
  installments: string;
  shortDescription: string;
  fullDescription: string;
  sizes: string[];
  colors: ProductColor[];
  sustainableDetails: string[];
  careGuide: string[];
  measurements: SizeMeasurement[];
  badge?: string;
  tag?: 'bestseller' | 'new' | 'top_rated';
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}
