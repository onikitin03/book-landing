import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Technology', href: '#technology' },
    { name: 'Creation Journey', href: '#journey' },
    { name: 'FAQ', href: '#faq' },
  ];

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? 'bg-white/95 shadow-md backdrop-blur-sm py-2'
      : 'bg-transparent py-4'
  }`;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={navbarClasses}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-bold font-heading text-gray-900">
              AI <span className="text-primary-600">Book</span> Generator
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ul className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <a
                    href={item.href}
                    className="font-medium text-gray-700 hover:text-primary-600 transition-all duration-300"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="#"
              className="btn btn-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom py-4">
              <ul className="flex flex-col space-y-4 pb-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="block font-medium text-gray-700 hover:text-primary-600 transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                <li className="pt-4">
                  <a
                    href="#"
                    className="btn btn-primary w-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 