import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Edit2,
  Save,
  X,
  CheckCircle,
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfilePageContent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+234-800-000-0000',
    location: user?.location || 'Lagos, Nigeria',
    dateOfBirth: user?.dateOfBirth || '1990-01-01',
    licenseNumber: user?.licenseNumber || '', 
    pharmacyName: user?.pharmacyName || '', 
    licenseExpiry: user?.licenseExpiry || '',
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <DashboardLayout title="Profile">
      <div className="max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isAdmin ? 'Pharmacy Profile' : 'My Profile'}
          </h2>
          <p className="text-gray-600">
            {isAdmin
              ? 'Manage your pharmacy business information and credentials'
              : 'Manage your personal information and account details'}
          </p>
        </motion.div>

        {/* Success Message */}
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">Profile updated successfully</span>
          </motion.div>
        )}

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8"
        >
          {/* Profile Picture Section */}
          <div className="mb-8 flex items-end space-x-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-4xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              {isEditing && (
                <button className="absolute bottom-2 right-2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50">
                  <Camera className="w-5 h-5 text-teal-600" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h3>
              <p className="text-teal-600 font-medium">
                {isAdmin ? 'Pharmacy Administrator' : 'Customer'}
              </p>
              {user?.email && (
                <p className="text-gray-600 text-sm">{user.email}</p>
              )}
            </div>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative mt-2">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="disabled:bg-gray-50 disabled:cursor-not-allowed pl-10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="disabled:bg-gray-50 disabled:cursor-not-allowed pl-10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="disabled:bg-gray-50 disabled:cursor-not-allowed pl-10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="disabled:bg-gray-50 disabled:cursor-not-allowed pl-10"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <div className="relative mt-2">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="disabled:bg-gray-50 disabled:cursor-not-allowed pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Only Fields */}
            {isAdmin && (
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Pharmacy Information</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pharmacy Name */}
                  <div>
                    <Label htmlFor="pharmacyName">Pharmacy Name</Label>
                    <div className="relative mt-2">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="pharmacyName"
                        name="pharmacyName"
                        value={formData.pharmacyName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Your pharmacy name"
                        className="disabled:bg-gray-50 disabled:cursor-not-allowed pl-10"
                      />
                    </div>
                  </div>

                  {/* License Number */}
                  <div>
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Your pharmacy license number"
                      className="mt-2 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* License Expiry */}
                  <div>
                    <Label htmlFor="licenseExpiry">License Expiry Date</Label>
                    <div className="relative mt-2">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="licenseExpiry"
                        name="licenseExpiry"
                        type="date"
                        value={formData.licenseExpiry}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="disabled:bg-gray-50 disabled:cursor-not-allowed pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="border-gray-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h4 className="font-semibold text-gray-900 mb-4">Account Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Account Status</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">January 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Account Type</span>
                <span className="font-medium text-gray-900">
                  {isAdmin ? 'Admin' : 'Customer'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Verification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h4 className="font-semibold text-gray-900 mb-4">Verification</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email Verified</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Yes
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Phone Verified</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Yes
                </span>
              </div>
              {isAdmin && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">License Verified</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Yes
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const ProfilePage: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ProfilePageContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default ProfilePage;
