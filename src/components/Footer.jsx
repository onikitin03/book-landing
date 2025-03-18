import React from 'react';
import { motion } from 'framer-motion';
import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-gray-900 text-white pt-16 pb-8 section">
      <div className="container-custom mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Company Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">AI Book Generator</h4>
            <p className="text-gray-400 mb-6">
              Revolutionizing book writing with advanced AI technology. Turn your ideas into bestsellers faster than ever before.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">Features</a>
              </li>
              <li>
                <a href="#technology" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">Technology</a>
              </li>
              <li>
                <a href="#journey" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">Creation Journey</a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">FAQ</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMail className="w-5 h-5 text-primary-500 mr-3 mt-1" />
                <span className="text-gray-400">support@aibookgenerator.com</span>
              </li>
              <li className="flex items-start">
                <FiPhone className="w-5 h-5 text-primary-500 mr-3 mt-1" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <FiMapPin className="w-5 h-5 text-primary-500 mr-3 mt-1" />
                <span className="text-gray-400">123 Writing Lane<br />San Francisco, CA 94107</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} AI Book Generator. All rights reserved.
          </p>
        </div>
        
        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary-500 text-white p-3 rounded-full shadow-lg z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiArrowUp className="w-5 h-5" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer; 