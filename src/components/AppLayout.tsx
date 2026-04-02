import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import LandingPage from '@/pages/LandingPage';

const AppLayout: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <LandingPage />
      </CartProvider>
    </AuthProvider>
  );
};

export default AppLayout;
