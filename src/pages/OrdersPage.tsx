import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  MessageSquare,
  MoreVertical,
  Search,
  Filter,
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

interface Order {
  id: string;
  date: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  products: string[];
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const OrdersPageContent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

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

  const orders: Order[] = [
    {
      id: 'ORD-001',
      date: '2026-01-20',
      items: 3,
      total: 12500,
      status: 'delivered',
      products: ['Amoxicillin 250mg', 'Vitamin C', 'Paracetamol 500mg'],
      trackingNumber: 'TRK-2026-001',
      estimatedDelivery: '2026-01-20',
    },
    {
      id: 'ORD-002',
      date: '2026-01-18',
      items: 2,
      total: 8750,
      status: 'shipped',
      products: ['Ibuprofen 400mg', 'Glucose Meter'],
      trackingNumber: 'TRK-2026-002',
      estimatedDelivery: '2026-01-22',
    },
    {
      id: 'ORD-003',
      date: '2026-01-15',
      items: 5,
      total: 23000,
      status: 'processing',
      products: ['Multivitamins', 'Aspirin', 'Blood Pressure Monitor', 'Thermometer', 'First Aid Kit'],
      estimatedDelivery: '2026-01-25',
    },
    {
      id: 'ORD-004',
      date: '2026-01-12',
      items: 1,
      total: 4500,
      status: 'delivered',
      products: ['Sanitizer 500ml'],
      trackingNumber: 'TRK-2026-004',
      estimatedDelivery: '2026-01-14',
    },
    {
      id: 'ORD-005',
      date: '2026-01-10',
      items: 2,
      total: 6200,
      status: 'cancelled',
      products: ['Cough Syrup', 'Lozenges'],
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
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
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
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
    <DashboardLayout title="My Orders">
      <div className="max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order History</h2>
          <p className="text-gray-600">View and manage all your orders</p>
        </motion.div>

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
                  placeholder="Search by order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
            >
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No orders found</p>
            </motion.div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-2 capitalize">{order.status}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Ordered on {order.date}</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      {(order.status === 'shipped' || order.status === 'processing') && (
                        <DropdownMenuItem>Track Order</DropdownMenuItem>
                      )}
                      {order.status === 'delivered' && (
                        <DropdownMenuItem>Reorder</DropdownMenuItem>
                      )}
                      <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Order Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Products ({order.items})</p>
                    <ul className="space-y-1">
                      {order.products.map((product, idx) => (
                        <li key={idx} className="text-sm text-gray-900">
                          • {product}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    {order.trackingNumber && (
                      <div>
                        <p className="text-sm text-gray-600">Tracking Number</p>
                        <p className="font-mono text-sm font-medium text-gray-900">{order.trackingNumber}</p>
                      </div>
                    )}
                    {order.estimatedDelivery && (
                      <div>
                        <p className="text-sm text-gray-600">
                          {order.status === 'delivered' ? 'Delivered on' : 'Estimated Delivery'}
                        </p>
                        <p className="text-sm font-medium text-gray-900">{order.estimatedDelivery}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <p className="text-lg font-semibold text-gray-900">
                    {formatPrice(order.total)}
                  </p>
                  <div className="flex gap-2">
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm" className="border-teal-600 text-teal-600">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Leave Review
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <Download className="w-4 h-4 mr-2" />
                      Invoice
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const OrdersPage: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <OrdersPageContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default OrdersPage;
