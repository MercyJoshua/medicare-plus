import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Lock,
  Bell,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NotificationSettings {
  emailOrders: boolean;
  emailPromotions: boolean;
  emailPrescriptions: boolean;
  pushNotifications: boolean;
  smsAlerts: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  dataCollection: boolean;
  analyticsSharing: boolean;
}

const SettingsPageContent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'security' | 'notifications' | 'privacy'>('security');

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailOrders: true,
    emailPromotions: false,
    emailPrescriptions: true,
    pushNotifications: true,
    smsAlerts: false,
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'private',
    dataCollection: true,
    analyticsSharing: false,
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

  const isAdmin = user?.role === 'admin';

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setChangePasswordSuccess(true);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setChangePasswordSuccess(false), 3000);
  };

  const handleNotificationSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePrivacySave = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
          <p className="text-gray-600">
            Manage your account security, notifications, and privacy preferences
          </p>
        </motion.div>

        {/* Success Messages */}
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">Settings saved successfully</span>
          </motion.div>
        )}

        {changePasswordSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">Password changed successfully</span>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'security'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'notifications'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bell className="w-4 h-4 inline mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'privacy'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Privacy
          </button>
        </div>

        {/* Security Settings */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Change Password */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>

              <div className="space-y-6">
                {/* Current Password */}
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter your current password"
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter new password (min 6 characters)"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))
                      }
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your new password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handlePasswordChange}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" className="border-teal-600 text-teal-600">
                  Enable 2FA
                </Button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Current Session</p>
                    <p className="text-sm text-gray-600">Lagos, Nigeria • Chrome on Windows</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Active Now
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>

              <div className="space-y-4">
                {/* Email Orders */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Order Updates</p>
                    <p className="text-sm text-gray-600">Receive email notifications for order status</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailOrders}
                      onChange={(e) =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          emailOrders: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 text-teal-600 rounded"
                    />
                  </label>
                </div>

                {/* Promotions */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Promotional Emails</p>
                    <p className="text-sm text-gray-600">Special offers and new product announcements</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailPromotions}
                      onChange={(e) =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          emailPromotions: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 text-teal-600 rounded"
                    />
                  </label>
                </div>

                {/* Prescriptions */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Prescription Alerts</p>
                    <p className="text-sm text-gray-600">
                      {isAdmin ? 'New prescription submissions and reviews' : 'Refill reminders and alerts'}
                    </p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailPrescriptions}
                      onChange={(e) =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          emailPrescriptions: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 text-teal-600 rounded"
                    />
                  </label>
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-600">Real-time alerts on your device</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          pushNotifications: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 text-teal-600 rounded"
                    />
                  </label>
                </div>

                {/* SMS Alerts */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">SMS Alerts</p>
                    <p className="text-sm text-gray-600">Important updates via SMS</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsAlerts}
                      onChange={(e) =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          smsAlerts: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 text-teal-600 rounded"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                <Button
                  onClick={handleNotificationSave}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Privacy Settings */}
        {activeTab === 'privacy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy Settings</h3>

              <div className="space-y-6">
                {/* Profile Visibility */}
                <div>
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <select
                    id="profileVisibility"
                    value={privacySettings.profileVisibility}
                    onChange={(e) =>
                      setPrivacySettings(prev => ({
                        ...prev,
                        profileVisibility: e.target.value as 'public' | 'private' | 'friends',
                      }))
                    }
                    className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="public">Public - Anyone can view</option>
                    <option value="private">Private - Only you can see</option>
                    <option value="friends">Friends Only</option>
                  </select>
                  <p className="text-sm text-gray-600 mt-2">
                    Control who can see your profile information
                  </p>
                </div>

                {/* Data Collection */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Data Collection</p>
                    <p className="text-sm text-gray-600">Allow us to collect usage data for improvements</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.dataCollection}
                      onChange={(e) =>
                        setPrivacySettings(prev => ({
                          ...prev,
                          dataCollection: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 text-teal-600 rounded"
                    />
                  </label>
                </div>

                {/* Analytics Sharing */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Analytics Sharing</p>
                    <p className="text-sm text-gray-600">Share anonymized analytics data with partners</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.analyticsSharing}
                      onChange={(e) =>
                        setPrivacySettings(prev => ({
                          ...prev,
                          analyticsSharing: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 text-teal-600 rounded"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                <Button
                  onClick={handlePrivacySave}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Privacy Settings
                </Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h3>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                    Delete Account
                  </Button>
                  <p className="text-sm text-gray-600 mt-3">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

const SettingsPage: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <SettingsPageContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default SettingsPage;
