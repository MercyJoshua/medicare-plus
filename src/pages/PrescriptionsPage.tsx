import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Trash2,
  MoreVertical,
  Plus,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Prescription {
  id: string;
  uploadDate: string;
  medication: string;
  doctor: string;
  hospital: string;
  expiryDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  notes?: string;
  fileUrl?: string;
}

const PrescriptionsPageContent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const prescriptions: Prescription[] = [
    {
      id: 'RX-001',
      uploadDate: '2026-01-20',
      medication: 'Amoxicillin 500mg',
      doctor: 'Dr. Chioma Okonkwo',
      hospital: 'Lagos Medical Center',
      expiryDate: '2026-04-20',
      status: 'approved',
      notes: 'Take 3 times daily for 7 days',
    },
    {
      id: 'RX-002',
      uploadDate: '2026-01-18',
      medication: 'Metformin 1000mg, Lisinopril 10mg',
      doctor: 'Dr. Emeka Nwachukwu',
      hospital: 'Abuja Health Clinic',
      expiryDate: '2026-07-18',
      status: 'approved',
      notes: 'Chronic medication management',
    },
    {
      id: 'RX-003',
      uploadDate: '2026-01-15',
      medication: 'Cetirizine 10mg',
      doctor: 'Dr. Aisha Mohammed',
      hospital: 'Kano Hospital',
      expiryDate: '2026-03-15',
      status: 'pending',
      notes: 'For allergies, once daily before bed',
    },
    {
      id: 'RX-004',
      uploadDate: '2026-01-10',
      medication: 'Ibuprofen 400mg',
      doctor: 'Dr. David Obi',
      hospital: 'Port Harcourt Medical',
      expiryDate: '2025-12-10',
      status: 'expired',
      notes: 'As needed for pain',
    },
    {
      id: 'RX-005',
      uploadDate: '2026-01-08',
      medication: 'Omeprazole 20mg',
      doctor: 'Dr. Grace Eze',
      hospital: 'Enugu Central Hospital',
      expiryDate: '2026-06-08',
      status: 'rejected',
      notes: 'Insufficient clarity - please resubmit',
    },
  ];

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploadSuccess(true);
    setIsUploadOpen(false);
    setSelectedFile(null);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const approvedCount = prescriptions.filter(p => p.status === 'approved').length;
  const pendingCount = prescriptions.filter(p => p.status === 'pending').length;
  const expiredCount = prescriptions.filter(p => p.status === 'expired').length;

  return (
    <DashboardLayout title="Prescriptions">
      <div className="max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">My Prescriptions</h2>
            <p className="text-gray-600">Upload, view, and manage your medical prescriptions</p>
          </div>

          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Upload Prescription
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload New Prescription</DialogTitle>
                <DialogDescription>
                  Upload a clear photo or scan of your prescription. Supported formats: JPG, PNG, PDF
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">Select File</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
                    <input
                      id="file"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">
                        {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG or PDF (Max 10MB)</p>
                    </label>
                  </div>
                </div>

                <Button
                  onClick={handleUpload}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Upload Prescription
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Success Message */}
        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">Prescription uploaded successfully</span>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-100" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Review</p>
                <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
              </div>
              <Clock className="w-12 h-12 text-orange-100" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Expired</p>
                <p className="text-3xl font-bold text-gray-600">{expiredCount}</p>
              </div>
              <AlertCircle className="w-12 h-12 text-gray-100" />
            </div>
          </motion.div>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {prescriptions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
            >
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No prescriptions uploaded yet</p>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Upload Your First Prescription
              </Button>
            </motion.div>
          ) : (
            prescriptions.map((prescription, index) => (
              <motion.div
                key={prescription.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-6 h-6 text-teal-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{prescription.id}</h3>
                        <p className="text-sm text-gray-600">{prescription.medication}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(prescription.status)}`}>
                        {getStatusIcon(prescription.status)}
                        <span className="ml-2 capitalize">{prescription.status}</span>
                      </span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      {prescription.status === 'rejected' && (
                        <DropdownMenuItem>
                          <Upload className="w-4 h-4 mr-2" />
                          Reupload
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Prescription Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-4 pl-10">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Doctor</p>
                      <p className="font-medium text-gray-900">{prescription.doctor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hospital/Clinic</p>
                      <p className="font-medium text-gray-900">{prescription.hospital}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Upload Date</p>
                      <p className="font-medium text-gray-900">{prescription.uploadDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {prescription.status === 'expired' ? 'Expired' : 'Valid Until'}
                      </p>
                      <p className={`font-medium ${prescription.status === 'expired' ? 'text-red-600' : 'text-gray-900'}`}>
                        {prescription.expiryDate}
                      </p>
                    </div>
                  </div>
                </div>

                {prescription.notes && (
                  <div className="pl-10 mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-teal-500">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Notes:</span> {prescription.notes}
                    </p>
                  </div>
                )}

                {prescription.status === 'rejected' && (
                  <div className="flex justify-end pt-4 border-t border-gray-100 pl-10">
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      Resubmit Prescription
                    </Button>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const PrescriptionsPage: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <PrescriptionsPageContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default PrescriptionsPage;
