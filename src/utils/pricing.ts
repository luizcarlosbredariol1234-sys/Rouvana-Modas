import { Product } from '../types/catalog';

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function getProductPrice(
  product: Product,
  size?: string,
  colorName?: string
): number {
  if (colorName) {
    const matchedColor = product.colors.find((c) => c.name === colorName);
    if (matchedColor?.price !== undefined && matchedColor.price > 0) {
      return matchedColor.price;
    }
  }
  if (size && product.sizePrices && product.sizePrices[size] !== undefined) {
    return product.sizePrices[size];
  }
  if (product.price > 0) {
    return product.price;
  }
  if (product.colors.some((c) => (c.price ?? 0) > 0)) {
    const firstColorPrice = product.colors.find((c) => (c.price ?? 0) > 0)?.price;
    if (firstColorPrice !== undefined) return firstColorPrice;
  }
  if (product.sizePrices) {
    const first = Object.values(product.sizePrices).find((v) => v > 0);
    if (first !== undefined) return first;
  }
  return 0;
}

export function getProductPriceSummary(product: Product): {
  hasPrice: boolean;
  minPrice: number;
  maxPrice: number;
  isRange: boolean;
  formatted: string;
} {
  const candidates: number[] = [];

  for (const color of product.colors) {
    if (color.price !== undefined && color.price > 0) {
      candidates.push(color.price);
    }
  }
  if (product.sizePrices) {
    for (const val of Object.values(product.sizePrices)) {
      if (val > 0) candidates.push(val);
    }
  }
  if (candidates.length === 0 && product.price > 0) {
    candidates.push(product.price);
  }

  if (candidates.length === 0) {
    return {
      hasPrice: false,
      minPrice: 0,
      maxPrice: 0,
      isRange: false,
      formatted: '',
    };
  }

  const minPrice = Math.min(...candidates);
  const maxPrice = Math.max(...candidates);
  const isRange = minPrice !== maxPrice;

  return {
    hasPrice: true,
    minPrice,
    maxPrice,
    isRange,
    formatted: isRange
      ? `${formatBRL(minPrice)} – ${formatBRL(maxPrice)}`
      : formatBRL(minPrice),
  };
}
