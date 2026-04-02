import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onBrowseClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBrowseClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const features = [
    { icon: Shield, text: 'Licensed Pharmacy' },
    { icon: Truck, text: 'Free Delivery' },
    { icon: Clock, text: '24/7 Support' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-emerald-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Nigeria's Trusted Online Pharmacy
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Your Health,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Delivered
              </span>{' '}
              to Your Doorstep
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Skip the queues and long distances. Order medications, healthcare products, 
              and essentials online with secure payments and fast delivery across Nigeria.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <Button
                onClick={onBrowseClick}
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg rounded-full group"
              >
                Browse Medications
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-6 text-lg rounded-full"
              >
                Upload Prescription
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-6"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600">
                  <feature.icon className="w-5 h-5 text-teal-600" />
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/696f6dfbce9266547492fbf4_1768910501597_7ba274b5.png"
                  alt="Online Pharmacy Delivery"
                  className="w-full h-auto"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent" />
              </div>

              {/* Floating Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Order Delivered</p>
                  <p className="text-sm text-gray-500">Within 24 hours</p>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-teal-600" />
                  <span className="font-semibold text-gray-900">100% Genuine</span>
                </div>
                <p className="text-sm text-gray-500">All products verified</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '50K+', label: 'Happy Customers' },
            { value: '5000+', label: 'Products Available' },
            { value: '36', label: 'States Covered' },
            { value: '24/7', label: 'Customer Support' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-teal-600">{stat.value}</p>
              <p className="text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
