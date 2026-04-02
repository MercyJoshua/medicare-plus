import React, { useState, useCallback } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import CartDrawer from '@/components/shared/CartDrawer';
import AuthModal from '@/components/shared/AuthModal';
import Hero from '@/components/landing/Hero';
import Categories from '@/components/landing/Categories';
import FeaturedProducts from '@/components/landing/FeaturedProducts';
import Benefits from '@/components/landing/Benefits';
import Testimonials from '@/components/landing/Testimonials';
import Contact from '@/components/landing/Contact';

const LandingPage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleBrowseClick = useCallback(() => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        onAuthClick={() => setIsAuthOpen(true)} 
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero onBrowseClick={handleBrowseClick} />

        {/* Categories Section */}
        <Categories onCategoryClick={handleCategoryClick} />

        {/* Featured Products Section */}
        <FeaturedProducts selectedCategory={selectedCategory} />

        {/* Benefits Section */}
        <Benefits />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default LandingPage;
