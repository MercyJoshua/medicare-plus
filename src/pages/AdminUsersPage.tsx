import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Edit2,
  MoreVertical,
  Search,
  Filter,
  Ban,
  User as UserIcon,
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

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: 'customer' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  totalOrders?: number;
  totalSpent?: number;
}

const AdminUsersPageContent: React.FC = () => {
  const { user: authUser, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
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

  const users: User[] = [
    {
      id: 'USR-001',
      name: 'Chioma Okonkwo',
      email: 'chioma@email.com',
      phone: '+234-901-234-5678',
      location: 'Lagos, Nigeria',
      role: 'customer',
      status: 'active',
      joinDate: '2025-08-15',
      totalOrders: 12,
      totalSpent: 125000,
    },
    {
      id: 'USR-002',
      name: 'Emeka Nwachukwu',
      email: 'emeka@email.com',
      phone: '+234-902-345-6789',
      location: 'Abuja, Nigeria',
      role: 'customer',
      status: 'active',
      joinDate: '2025-09-22',
      totalOrders: 8,
      totalSpent: 87500,
    },
    {
      id: 'USR-003',
      name: 'Aisha Mohammed',
      email: 'aisha@email.com',
      phone: '+234-903-456-7890',
      location: 'Kano, Nigeria',
      role: 'customer',
      status: 'active',
      joinDate: '2025-10-03',
      totalOrders: 15,
      totalSpent: 156200,
    },
    {
      id: 'USR-004',
      name: 'David Obi',
      email: 'david@email.com',
      phone: '+234-904-567-8901',
      location: 'Port Harcourt, Nigeria',
      role: 'customer',
      status: 'inactive',
      joinDate: '2025-06-12',
      totalOrders: 3,
      totalSpent: 28500,
    },
    {
      id: 'USR-005',
      name: 'Grace Eze',
      email: 'grace@email.com',
      phone: '+234-905-678-9012',
      location: 'Enugu, Nigeria',
      role: 'admin',
      status: 'active',
      joinDate: '2024-12-01',
    },
    {
      id: 'USR-006',
      name: 'Blessing Okonkwo',
      email: 'blessing@email.com',
      phone: '+234-906-789-0123',
      location: 'Ibadan, Nigeria',
      role: 'customer',
      status: 'suspended',
      joinDate: '2025-07-08',
      totalOrders: 5,
      totalSpent: 45000,
    },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'inactive':
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
      case 'suspended':
        return <Ban className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';
  };

  const totalCustomers = users.filter(u => u.role === 'customer').length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;

  const formatPrice = (price?: number) => {
    if (!price) return '-';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <DashboardLayout title="Users Management">
      <div className="max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
          <p className="text-gray-600">Manage all system users and their accounts</p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <p className="text-sm text-gray-600 mb-2">Total Users</p>
            <p className="text-3xl font-bold text-teal-600">{users.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <p className="text-sm text-gray-600 mb-2">Customers</p>
            <p className="text-3xl font-bold text-blue-600">{totalCustomers}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <p className="text-sm text-gray-600 mb-2">Admins</p>
            <p className="text-3xl font-bold text-purple-600">{totalAdmins}</p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Roles</option>
              <option value="customer">Customers</option>
              <option value="admin">Admins</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{user.email}</p>
                        <p className="text-xs text-gray-500">{user.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.location}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role === 'admin' ? 'Administrator' : 'Customer'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {getStatusIcon(user.status)}
                        <span className="ml-2 capitalize">{user.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.role === 'customer' ? `${user.totalOrders} orders` : '-'}
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
                            View Profile
                          </DropdownMenuItem>
                          {user.status === 'active' && (
                            <DropdownMenuItem>Suspend Account</DropdownMenuItem>
                          )}
                          {user.status === 'suspended' && (
                            <DropdownMenuItem>Reactivate</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="w-4 h-4 mr-2" />
                            Delete User
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

const AdminUsersPage: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AdminUsersPageContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default AdminUsersPage;
