import React from 'react';
import { motion } from 'framer-motion';
import { 
  Pill, 
  Shield, 
  Sparkles, 
  Droplet, 
  Cross, 
  Heart, 
  Baby, 
  User 
} from 'lucide-react';

interface CategoriesProps {
  onCategoryClick: (categoryId: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategoryClick }) => {
  const categories = [
    { id: 'pain-relief', name: 'Pain Relief', icon: Pill, color: 'bg-red-100 text-red-600' },
    { id: 'antibiotics', name: 'Antibiotics', icon: Shield, color: 'bg-blue-100 text-blue-600' },
    { id: 'vitamins', name: 'Vitamins', icon: Sparkles, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'skincare', name: 'Skincare', icon: Droplet, color: 'bg-pink-100 text-pink-600' },
    { id: 'first-aid', name: 'First Aid', icon: Cross, color: 'bg-green-100 text-green-600' },
    { id: 'wellness', name: 'Wellness', icon: Heart, color: 'bg-purple-100 text-purple-600' },
    { id: 'baby-care', name: 'Baby Care', icon: Baby, color: 'bg-cyan-100 text-cyan-600' },
    { id: 'personal-care', name: 'Personal Care', icon: User, color: 'bg-orange-100 text-orange-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="categories" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
            Browse By Category
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Shop by Health Needs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find exactly what you need from our wide range of healthcare categories. 
            All products are sourced from verified manufacturers.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategoryClick(category.id)}
              className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                {category.name}
              </h3>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
