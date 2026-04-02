import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  MoreVertical,
  Search,
  Download,
  X,
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { prescriptions as initialPrescriptions } from '@/data/products';


const AdminPrescriptionsPageContent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ id: string; action: 'approve' | 'reject' } | null>(null);

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

  const handleViewDocument = (rx: any) => {
    setSelectedPrescription(rx);
    setViewDialogOpen(true);
  };

  const handleApprove = (id: string) => {
    setPendingAction({ id, action: 'approve' });
    setActionDialogOpen(true);
  };

  const handleReject = (id: string) => {
    setPendingAction({ id, action: 'reject' });
    setActionDialogOpen(true);
  };

  const confirmAction = () => {
    if (!pendingAction) return;

    const newStatus = pendingAction.action === 'approve' ? 'approved' : 'rejected';
    setPrescriptions(prev =>
      prev.map(rx =>
        rx.id === pendingAction.id
          ? { ...rx, status: newStatus }
          : rx
      )
    );
    setActionDialogOpen(false);
    setPendingAction(null);
  };

  const handleDownload = (rx: any) => {
    // Simulate download
    console.log('Downloading prescription:', rx.id);
    // In a real app, this would download the file
  };

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesSearch = rx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rx.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || rx.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'expired':
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'expired':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const pendingCount = prescriptions.filter(rx => rx.status === 'pending').length;
  const approvedCount = prescriptions.filter(rx => rx.status === 'approved').length;

  return (
    <DashboardLayout title="Prescriptions Management">
      <div className="max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Prescription Management</h2>
          <p className="text-gray-600">Review and manage customer prescription submissions</p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <p className="text-sm text-gray-600 mb-2">Total Prescriptions</p>
            <p className="text-3xl font-bold text-teal-600">{prescriptions.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <p className="text-sm text-gray-600 mb-2">Pending Review</p>
            <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <p className="text-sm text-gray-600 mb-2">Approved</p>
            <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
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
                  placeholder="Search by prescription ID or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </motion.div>

        {/* Prescriptions Table */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPrescriptions.map((rx) => (
                  <tr key={rx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{rx.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{rx.customer}</p>
                        <p className="text-xs text-gray-500">{rx.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{rx.medication}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{rx.doctor}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{rx.uploadDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rx.status)}`}>
                        {getStatusIcon(rx.status)}
                        <span className="ml-2 capitalize">{rx.status}</span>
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
                          <DropdownMenuItem onClick={() => handleViewDocument(rx)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Document
                          </DropdownMenuItem>
                          {rx.status === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => handleApprove(rx.id)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReject(rx.id)}>
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem onClick={() => handleDownload(rx)}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
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

        {/* View Document Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Prescription Document</DialogTitle>
              <DialogDescription>
                {selectedPrescription?.customer} - {selectedPrescription?.medication}
              </DialogDescription>
            </DialogHeader>
            <div className="bg-gray-100 rounded-lg p-8 min-h-96 flex flex-col items-center justify-center">
              <Eye className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 text-center">
                Prescription Document Preview
              </p>
              {selectedPrescription && (
                <div className="mt-4 text-sm text-gray-600 space-y-2">
                  <p><strong>ID:</strong> {selectedPrescription.id}</p>
                  <p><strong>Customer:</strong> {selectedPrescription.customer}</p>
                  <p><strong>Medication:</strong> {selectedPrescription.medication}</p>
                  <p><strong>Doctor:</strong> {selectedPrescription.doctor}</p>
                  <p><strong>Upload Date:</strong> {selectedPrescription.uploadDate}</p>
                  <p><strong>Status:</strong> <span className="capitalize">{selectedPrescription.status}</span></p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setViewDialogOpen(false)} variant="outline">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Approve/Reject Dialog */}
        <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {pendingAction?.action === 'approve' ? 'Approve Prescription' : 'Reject Prescription'}
              </DialogTitle>
              <DialogDescription>
                {pendingAction?.action === 'approve'
                  ? 'Are you sure you want to approve this prescription? The customer will be notified.'
                  : 'Are you sure you want to reject this prescription? The customer will be notified and can resubmit.'}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={confirmAction}
                className={
                  pendingAction?.action === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }
              >
                {pendingAction?.action === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

const AdminPrescriptionsPage: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AdminPrescriptionsPageContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default AdminPrescriptionsPage;
