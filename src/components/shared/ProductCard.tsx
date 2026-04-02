import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, FileText, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    setQuantity(1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const inCart = isInCart(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Prescription Badge */}
        {product.requiresPrescription && (
          <div className="absolute top-3 left-3 flex items-center space-x-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
            <FileText className="w-3 h-3" />
            <span>Rx Required</span>
          </div>
        )}

        {/* Stock Badge */}
        {product.stock < 20 && (
          <div className="absolute top-3 right-3 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
            Low Stock
          </div>
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={product.requiresPrescription}
            className={`px-6 py-3 rounded-full font-medium flex items-center space-x-2 ${
              product.requiresPrescription
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-white text-teal-600 hover:bg-teal-50'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-5 h-5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Quick Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-teal-600 font-medium uppercase tracking-wide mb-1">
          {product.category.replace('-', ' ')}
        </p>

        {/* Name */}
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-teal-600 transition-colors">
          {product.name}
        </h3>

        {/* Manufacturer */}
        <p className="text-sm text-gray-500 mb-2">{product.manufacturer}</p>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {inCart && (
            <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full">
              In Cart
            </span>
          )}
        </div>

        {/* Quantity & Add to Cart */}
        {!product.requiresPrescription ? (
          <div className="flex items-center space-x-2">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
            >
              {isAdded ? (
                <span className="flex items-center space-x-1">
                  <Check className="w-4 h-4" />
                  <span>Added</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add</span>
                </span>
              )}
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <FileText className="w-4 h-4 mr-2" />
            Upload Prescription
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
