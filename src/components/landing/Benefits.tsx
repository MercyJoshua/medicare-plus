import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  CreditCard, 
  Truck, 
  Shield, 
  Clock, 
  HeadphonesIcon,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Upload,
      title: 'Easy Prescription Upload',
      description: 'Simply upload your prescription and our licensed pharmacists will verify and process your order quickly.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Multiple payment options including card, bank transfer, and cash on delivery. All transactions are encrypted.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Same-day delivery in Lagos. Nationwide delivery within 2-5 business days to all 36 states.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Shield,
      title: '100% Genuine Products',
      description: 'All medications are sourced directly from verified manufacturers. NAFDAC approved products only.',
      color: 'bg-teal-100 text-teal-600',
    },
    {
      icon: Clock,
      title: 'Auto-Refill Service',
      description: 'Never run out of your regular medications. Set up automatic refills for chronic conditions.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Pharmacist Support',
      description: 'Our team of licensed pharmacists is available round the clock to answer your health questions.',
      color: 'bg-pink-100 text-pink-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Healthcare Made Simple
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're solving the challenges Nigerians face in accessing quality healthcare. 
            No more long queues, stock limitations, or traveling far distances.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 ${benefit.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-3xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Have a Prescription?
              </h3>
              <p className="text-teal-100 mb-6">
                Upload your prescription and let our licensed pharmacists handle the rest. 
                We'll verify, process, and deliver your medications safely.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Verified by licensed pharmacists',
                  'Secure and confidential handling',
                  'Fast processing within 2 hours',
                  'Delivery tracking available',
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-300" />
                    <span className="text-teal-50">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-teal-50 rounded-full px-8"
              >
                Upload Prescription
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-white">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Upload Prescription</p>
                      <p className="text-sm text-teal-100">JPG, PNG, or PDF</p>
                    </div>
                  </div>
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center">
                    <Upload className="w-10 h-10 mx-auto mb-3 opacity-60" />
                    <p className="text-sm opacity-80">
                      Drag & drop your prescription here
                    </p>
                    <p className="text-xs opacity-60 mt-1">
                      or click to browse
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
