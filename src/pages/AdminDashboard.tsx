import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  FileText,
  AlertTriangle,
  MoreVertical,
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AdminDashboardContent: React.FC = () => {
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
    { 
      label: 'Total Revenue', 
      value: '₦2.4M', 
      change: '+12.5%', 
      trend: 'up',
      icon: DollarSign, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      label: 'Total Orders', 
      value: '1,234', 
      change: '+8.2%', 
      trend: 'up',
      icon: ShoppingBag, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      label: 'Active Users', 
      value: '5,678', 
      change: '+15.3%', 
      trend: 'up',
      icon: Users, 
      color: 'bg-purple-100 text-purple-600' 
    },
    { 
      label: 'Products', 
      value: '456', 
      change: '-2.1%', 
      trend: 'down',
      icon: Package, 
      color: 'bg-orange-100 text-orange-600' 
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-1234',
      customer: 'Chioma Okonkwo',
      email: 'chioma@email.com',
      items: 3,
      total: 15500,
      status: 'pending',
      date: '2026-01-20',
    },
    {
      id: 'ORD-1233',
      customer: 'Emeka Nwachukwu',
      email: 'emeka@email.com',
      items: 2,
      total: 8750,
      status: 'processing',
      date: '2026-01-20',
    },
    {
      id: 'ORD-1232',
      customer: 'Aisha Mohammed',
      email: 'aisha@email.com',
      items: 5,
      total: 32000,
      status: 'shipped',
      date: '2026-01-19',
    },
    {
      id: 'ORD-1231',
      customer: 'David Obi',
      email: 'david@email.com',
      items: 1,
      total: 4500,
      status: 'delivered',
      date: '2026-01-19',
    },
  ];

  const pendingPrescriptions = [
    {
      id: 'RX-001',
      customer: 'John Adeyemi',
      uploadedAt: '2 hours ago',
      status: 'pending',
    },
    {
      id: 'RX-002',
      customer: 'Grace Eze',
      uploadedAt: '4 hours ago',
      status: 'under-review',
    },
    {
      id: 'RX-003',
      customer: 'Michael Okafor',
      uploadedAt: '6 hours ago',
      status: 'pending',
    },
  ];

  const lowStockProducts = [
    { name: 'Amoxicillin 250mg', stock: 15, threshold: 20 },
    { name: 'Paracetamol 500mg', stock: 8, threshold: 50 },
    { name: 'Vitamin C 1000mg', stock: 12, threshold: 30 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'pending':
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
    <DashboardLayout title="Admin Dashboard">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, Admin!
        </h2>
        <p className="text-gray-600">
          Here's an overview of your pharmacy's performance today.
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
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`flex items-center text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Button variant="ghost" size="sm" className="text-teal-600">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{order.id}</span>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{order.customer}</span>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Prescriptions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Pending Prescriptions</h3>
              <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                {pendingPrescriptions.length}
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {pendingPrescriptions.map((rx) => (
                <div key={rx.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{rx.id}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      rx.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {rx.status === 'pending' ? 'Pending' : 'Under Review'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{rx.customer}</p>
                  <p className="text-xs text-gray-400">{rx.uploadedAt}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <Button variant="outline" className="w-full" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Review All
              </Button>
            </div>
          </motion.div>

          {/* Low Stock Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="p-4 border-b border-gray-100 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-900">Low Stock Alert</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="p-4">
                  <p className="font-medium text-gray-900 mb-1">{product.name}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-600 font-medium">{product.stock} left</span>
                    <span className="text-gray-400">Min: {product.threshold}</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${(product.stock / product.threshold) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <Button variant="outline" className="w-full" size="sm">
                <Package className="w-4 h-4 mr-2" />
                Manage Inventory
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AdminDashboardContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default AdminDashboard;
