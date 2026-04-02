import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Package,
  FileText,
  Clock,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Truck,
  AlertCircle,
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';

const CustomerDashboardContent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

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

  const stats = [
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Orders', value: '2', icon: Package, color: 'bg-green-100 text-green-600' },
    { label: 'Prescriptions', value: '3', icon: FileText, color: 'bg-purple-100 text-purple-600' },
    { label: 'Pending', value: '1', icon: Clock, color: 'bg-orange-100 text-orange-600' },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2026-01-18',
      items: 3,
      total: 12500,
      status: 'delivered',
    },
    {
      id: 'ORD-002',
      date: '2026-01-15',
      items: 2,
      total: 8750,
      status: 'shipped',
    },
    {
      id: 'ORD-003',
      date: '2026-01-12',
      items: 5,
      total: 23000,
      status: 'processing',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'User'}!
        </h2>
        <p className="text-gray-600">
          Here's what's happening with your orders and prescriptions.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Button variant="ghost" size="sm" className="text-teal-600">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{order.items} items</span>
                  <span className="font-semibold text-gray-900">{formatPrice(order.total)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{order.date}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Need a Refill?</h3>
            <p className="text-teal-100 text-sm mb-4">
              Quickly reorder your previous medications with just one click.
            </p>
            <Button className="bg-white text-teal-600 hover:bg-teal-50">
              Reorder Medications
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/')}
                className="p-4 bg-gray-50 hover:bg-teal-50 rounded-xl text-left transition-colors"
              >
                <ShoppingBag className="w-6 h-6 text-teal-600 mb-2" />
                <p className="font-medium text-gray-900">Shop Now</p>
                <p className="text-xs text-gray-500">Browse products</p>
              </button>
              <button className="p-4 bg-gray-50 hover:bg-teal-50 rounded-xl text-left transition-colors">
                <FileText className="w-6 h-6 text-teal-600 mb-2" />
                <p className="font-medium text-gray-900">Upload Rx</p>
                <p className="text-xs text-gray-500">New prescription</p>
              </button>
              <button className="p-4 bg-gray-50 hover:bg-teal-50 rounded-xl text-left transition-colors">
                <Package className="w-6 h-6 text-teal-600 mb-2" />
                <p className="font-medium text-gray-900">Track Order</p>
                <p className="text-xs text-gray-500">Check status</p>
              </button>
              <button className="p-4 bg-gray-50 hover:bg-teal-50 rounded-xl text-left transition-colors">
                <TrendingUp className="w-6 h-6 text-teal-600 mb-2" />
                <p className="font-medium text-gray-900">Health Tips</p>
                <p className="text-xs text-gray-500">Read articles</p>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

const CustomerDashboard: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <CustomerDashboardContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default CustomerDashboard;
