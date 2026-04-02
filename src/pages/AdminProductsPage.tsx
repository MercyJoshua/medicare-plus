import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  MoreVertical,
  AlertCircle,
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  reorderLevel: number;
  supplier: string;
  expiryDate: string;
  dosage?: string;
  description: string;
}

const AdminProductsPageContent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const products: Product[] = [
    {
      id: 'PROD-001',
      name: 'Amoxicillin 500mg',
      category: 'Antibiotics',
      price: 450,
      stock: 120,
      reorderLevel: 50,
      supplier: 'Pharmastar Pharmaceuticals',
      expiryDate: '2026-12-31',
      dosage: '500mg',
      description: 'Broad-spectrum antibiotic',
    },
    {
      id: 'PROD-002',
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: 250,
      stock: 8,
      reorderLevel: 50,
      supplier: 'HealthCare Solutions',
      expiryDate: '2026-11-30',
      dosage: '500mg',
      description: 'Fever and pain reliever',
    },
    {
      id: 'PROD-003',
      name: 'Vitamin C 1000mg',
      category: 'Vitamins',
      price: 800,
      stock: 200,
      reorderLevel: 100,
      supplier: 'NutriHealth Ltd',
      expiryDate: '2027-06-30',
      dosage: '1000mg',
      description: 'Immune system supplement',
    },
    {
      id: 'PROD-004',
      name: 'Ibuprofen 400mg',
      category: 'Pain Relief',
      price: 350,
      stock: 95,
      reorderLevel: 40,
      supplier: 'MediCare Pharma',
      expiryDate: '2026-09-30',
      dosage: '400mg',
      description: 'Anti-inflammatory pain reliever',
    },
    {
      id: 'PROD-005',
      name: 'Blood Pressure Monitor',
      category: 'Devices',
      price: 5500,
      stock: 15,
      reorderLevel: 10,
      supplier: 'Medical Devices Int\'l',
      expiryDate: '2028-01-31',
      description: 'Digital BP monitoring device',
    },
    {
      id: 'PROD-006',
      name: 'Multivitamin Tablet',
      category: 'Vitamins',
      price: 1200,
      stock: 75,
      reorderLevel: 50,
      supplier: 'VitaminPlus Co',
      expiryDate: '2027-03-31',
      description: 'Complete daily multivitamin',
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  const lowStockCount = products.filter(p => p.stock <= p.reorderLevel).length;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <DashboardLayout title="Products Management">
      <div className="max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Inventory</h2>
            <p className="text-gray-600">Manage pharmacy products and stock levels</p>
          </div>

          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </motion.div>

        {/* Low Stock Alert */}
        {lowStockCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center space-x-3"
          >
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-700 font-medium">{lowStockCount} product(s) running low on stock</span>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by product name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${product.stock <= product.reorderLevel ? 'text-red-600' : 'text-gray-900'}`}>
                          {product.stock}
                        </span>
                        {product.stock <= product.reorderLevel && (
                          <div title="Low stock">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.expiryDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.supplier}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          {product.stock <= product.reorderLevel && (
                            <DropdownMenuItem>
                              Reorder
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

const AdminProductsPage: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AdminProductsPageContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default AdminProductsPage;
