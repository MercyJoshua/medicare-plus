import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/shared/ProductCard';
import { ProductCategory } from '@/types';

interface FeaturedProductsProps {
  selectedCategory: string | null;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ selectedCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [showFilters, setShowFilters] = useState(false);
  const [localCategory, setLocalCategory] = useState<string | null>(selectedCategory);

  const categories: { id: string; name: string }[] = [
    { id: 'all', name: 'All Products' },
    { id: 'pain-relief', name: 'Pain Relief' },
    { id: 'antibiotics', name: 'Antibiotics' },
    { id: 'vitamins', name: 'Vitamins' },
    { id: 'skincare', name: 'Skincare' },
    { id: 'first-aid', name: 'First Aid' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'baby-care', name: 'Baby Care' },
    { id: 'personal-care', name: 'Personal Care' },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    const activeCategory = selectedCategory || localCategory;
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
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

    return result;
  }, [searchQuery, sortBy, selectedCategory, localCategory]);

  return (
    <section id="products" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
            Our Products
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Featured Medications & Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our selection of quality medications and healthcare products. 
            All items are sourced from licensed manufacturers and verified for authenticity.
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-4 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                <Filter className="w-5 h-5 text-gray-500" />
                <span>Filters</span>
              </button>

              <div className="hidden lg:flex items-center space-x-2">
                <span className="text-sm text-gray-500">Category:</span>
                <select
                  value={localCategory || 'all'}
                  onChange={(e) => setLocalCategory(e.target.value === 'all' ? null : e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hidden lg:flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pt-4 border-t space-y-4"
            >
              <div>
                <label className="text-sm text-gray-500 block mb-2">Category</label>
                <select
                  value={localCategory || 'all'}
                  onChange={(e) => setLocalCategory(e.target.value === 'all' ? null : e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
            {(selectedCategory || localCategory) && selectedCategory !== 'all' && localCategory !== 'all' && (
              <span>
                {' '}in{' '}
                <span className="font-semibold text-teal-600">
                  {categories.find(c => c.id === (selectedCategory || localCategory))?.name}
                </span>
              </span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
