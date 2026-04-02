import { useState, useEffect, useCallback } from 'react';
import { Product, ProductCategory } from '@/types';
import { products as mockProducts } from '@/data/products';

interface UseProductsOptions {
  category?: ProductCategory | null;
  search?: string;
  sortBy?: 'name' | 'price-low' | 'price-high';
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProducts = (options: UseProductsOptions = {}): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { category, search, sortBy = 'name' } = options;

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      let result = [...mockProducts];

      // Filter by category
      if (category) {
        result = result.filter(p => p.category === category);
      }

      // Filter by search query
      if (search) {
        const query = search.toLowerCase();
        result = result.filter(
          p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.manufacturer.toLowerCase().includes(query)
        );
      }

      // Sort
      switch (sortBy) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'name':
        default:
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }

      setProducts(result);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  }, [category, search, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const found = mockProducts.find(p => p.id === id);
        if (found) {
          setProduct(found);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, isLoading, error };
};
