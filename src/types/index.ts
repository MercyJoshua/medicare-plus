// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin' | 'pharmacist';
  phone?: string;
  address?: string;
  createdAt: string;
  location: string;
    dateOfBirth: string;
    licenseNumber: string; 
    pharmacyName: string; 
    licenseExpiry: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  stock: number;
  requiresPrescription: boolean;
  manufacturer: string;
  dosage?: string;
  sideEffects?: string[];
  createdAt: string;
}

export type ProductCategory = 
  | 'pain-relief'
  | 'antibiotics'
  | 'vitamins'
  | 'skincare'
  | 'first-aid'
  | 'wellness'
  | 'baby-care'
  | 'personal-care';

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  prescriptionId?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 
  | 'card'
  | 'bank-transfer'
  | 'cash-on-delivery';

// Prescription Types
export interface Prescription {
  id: string;
  userId: string;
  imageUrl: string;
  status: PrescriptionStatus;
  notes?: string;
  pharmacistId?: string;
  createdAt: string;
  updatedAt: string;
  customer: string;
  email: string;
  medication: string;
  doctor: string;
  uploadDate: string;
  expiryDate: string;
}

export type PrescriptionStatus = 
  | 'pending'
  | 'under-review'
  | 'approved'
  | 'rejected'
  | 'expired';

// Testimonial Type
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
