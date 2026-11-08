export interface Product {
  id: string;
  name: string;
  category: 'Kaban & Ceket' | 'Sweatshirt & Hoodie' | 'Triko & Kazak' | 'Pantolon' | 'Gömlek' | 'Aksesuar';
  gender: 'Unisex' | 'Erkek' | 'Kadın';
  price: number;
  originalPrice?: number;
  description: string;
  fabric: string;
  care: string;
  images: string[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  colors: {
    name: string;
    hex: string;
  }[];
  inStock: boolean;
  featured?: boolean;
  rating: number;
  reviewsCount: number;
  badge?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface OrderData {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'credit_card' | 'cod' | 'bank_transfer';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  date: string;
}
