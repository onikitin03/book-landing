import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const GetStartedCTA = () => {
  return (
    <section id="get-started" className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 section">
      <div className="container-custom mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            Start Your Writing Journey Today
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Join thousands of authors who have transformed their creative process with AI Book Generator
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12 bg-primary-600">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Experience the Full Power of AI Book Generator
                  </h3>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Access to all writing and editing tools',
                      'Unlimited book projects',
                      'Advanced character development',
                      'Plot structure assistance',
                      'Genre-specific templates',
                      'Cover design generation',
                      'Personalized writing insights',
                      'Community access and feedback'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheck className="text-white mr-2 mt-1" />
                        <span className="text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-auto">
                  <p className="text-primary-100 mb-2">Get unlimited access today</p>
                  <p className="text-white font-bold mb-0">Start creating immediately</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 lg:p-12 bg-white flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Write Your Bestseller?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join our community of successful authors and start creating your book today.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-8">
                  <h4 className="font-bold text-gray-900 mb-2">What our users are saying:</h4>
                  <p className="text-gray-600 italic">
                    "I finished my first draft in just 3 weeks using AI Book Generator. The platform made the writing process enjoyable and efficient!"
                  </p>
                  <p className="text-gray-700 font-semibold mt-2">– Amanda K., Published Author</p>
                </div>
              </div>
              
              <motion.a
                href="#"
                className="btn btn-primary w-full flex items-center justify-center py-4"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Now
                <FiArrowRight className="ml-2" />
              </motion.a>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                Join thousands of authors transforming their writing process
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetStartedCTA; 