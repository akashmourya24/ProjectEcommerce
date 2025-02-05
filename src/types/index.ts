export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
  subcategories: string[];
}