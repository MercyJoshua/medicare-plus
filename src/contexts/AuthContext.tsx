import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Check for stored auth on mount
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      setState({
        user: JSON.parse(storedUser),
        token: storedToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulated API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage to get their stored role
      const storedUsers = JSON.parse(localStorage.getItem('auth_users') || '{}');
      const storedUserData = storedUsers[email];
      
      // If user doesn't exist in registration database, reject login
      if (!storedUserData) {
        throw new Error('User not found. Please register first.');
      }
      
      // Mock successful login - use stored user data to preserve role
      const mockUser: User = {
        id: storedUserData.id,
        email: storedUserData.email,
        name: storedUserData.name,
        role: storedUserData.role,
        createdAt: storedUserData.createdAt,
        location: storedUserData.location || '',
        dateOfBirth: storedUserData.dateOfBirth || '',
        licenseNumber: storedUserData.licenseNumber || '',
        pharmacyName: storedUserData.pharmacyName || '',
        licenseExpiry: storedUserData.licenseExpiry || '',
      };
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      
      setState({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role: string = 'customer') => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulated API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: role as User['role'],
        createdAt: new Date().toISOString(),
        location: '',
        dateOfBirth: '',
        licenseNumber: '',
        pharmacyName: '',
        licenseExpiry: '',
      };
      
      // Store user data for login retrieval
      const storedUsers = JSON.parse(localStorage.getItem('auth_users') || '{}');
      storedUsers[email] = mockUser;
      localStorage.setItem('auth_users', JSON.stringify(storedUsers));
      
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      
      setState({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setState(prev => {
      if (!prev.user) return prev;
      const updatedUser = { ...prev.user, ...updates };
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      return { ...prev, user: updatedUser };
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
