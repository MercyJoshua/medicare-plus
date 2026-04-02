import { Product, Order, User, Prescription, ApiResponse, PaginatedResponse } from '@/types';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Create headers with auth token
const createHeaders = (includeAuth: boolean = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...createHeaders(),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    return fetchApi<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (name: string, email: string, password: string, role: string = 'customer') => {
    return fetchApi<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  },

  logout: async () => {
    return fetchApi<null>('/auth/logout', {
      method: 'POST',
    });
  },

  getProfile: async () => {
    return fetchApi<User>('/auth/profile');
  },

  updateProfile: async (data: Partial<User>) => {
    return fetchApi<User>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Products API
export const productsApi = {
  getAll: async (params?: {
    page?: number;
    perPage?: number;
    category?: string;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.perPage) queryParams.append('per_page', params.perPage.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);

    return fetchApi<PaginatedResponse<Product>>(`/products?${queryParams.toString()}`);
  },

  getById: async (id: string) => {
    return fetchApi<Product>(`/products/${id}`);
  },

  create: async (product: Omit<Product, 'id' | 'createdAt'>) => {
    return fetchApi<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },

  update: async (id: string, product: Partial<Product>) => {
    return fetchApi<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  },

  delete: async (id: string) => {
    return fetchApi<null>(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersApi = {
  getAll: async (params?: { page?: number; status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.status) queryParams.append('status', params.status);

    return fetchApi<PaginatedResponse<Order>>(`/orders?${queryParams.toString()}`);
  },

  getById: async (id: string) => {
    return fetchApi<Order>(`/orders/${id}`);
  },

  create: async (order: {
    items: { productId: string; quantity: number }[];
    shippingAddress: string;
    paymentMethod: string;
    prescriptionId?: string;
  }) => {
    return fetchApi<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  },

  updateStatus: async (id: string, status: string) => {
    return fetchApi<Order>(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  cancel: async (id: string) => {
    return fetchApi<Order>(`/orders/${id}/cancel`, {
      method: 'POST',
    });
  },
};

// Prescriptions API
export const prescriptionsApi = {
  getAll: async (params?: { page?: number; status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.status) queryParams.append('status', params.status);

    return fetchApi<PaginatedResponse<Prescription>>(`/prescriptions?${queryParams.toString()}`);
  },

  getById: async (id: string) => {
    return fetchApi<Prescription>(`/prescriptions/${id}`);
  },

  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('prescription', file);

    const token = getAuthToken();
    const headers: HeadersInit = {
      'Accept': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/prescriptions`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload prescription');
    }
    return data as ApiResponse<Prescription>;
  },

  updateStatus: async (id: string, status: string, notes?: string) => {
    return fetchApi<Prescription>(`/prescriptions/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes }),
    });
  },
};

// Users API (Admin only)
export const usersApi = {
  getAll: async (params?: { page?: number; role?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.role) queryParams.append('role', params.role);

    return fetchApi<PaginatedResponse<User>>(`/users?${queryParams.toString()}`);
  },

  getById: async (id: string) => {
    return fetchApi<User>(`/users/${id}`);
  },

  update: async (id: string, data: Partial<User>) => {
    return fetchApi<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return fetchApi<null>(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

export default {
  auth: authApi,
  products: productsApi,
  orders: ordersApi,
  prescriptions: prescriptionsApi,
  users: usersApi,
};
