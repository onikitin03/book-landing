import { motion, useTransform, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
// Import the image directly
import bookSetupImage from '../assets/book-setup.png';

const Hero = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Create motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const bookRotation = useTransform(smoothProgress, [0, 0.3], [0, 15]);
  const bookScale = useTransform(smoothProgress, [0, 0.3], [1, 1.1]);
  const textOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.2], [0, -50]);
  
  // Transform motion values for background elements
  const bgX1 = useTransform(mouseX, value => value * -30);
  const bgY1 = useTransform(mouseY, value => value * -30);
  const bgX2 = useTransform(mouseX, value => value * 30);
  const bgY2 = useTransform(mouseY, value => value * 30);
  
  // Transform values for the 3D book
  const bookX = useTransform(mouseX, value => value * 20);
  const bookY = useTransform(mouseY, value => value * 10);
  const rotateY = useTransform(mouseX, value => value * 5);
  const rotateX = useTransform(mouseY, value => -value * 5);
  
  // Transform values for floating elements
  const float1X = useTransform(mouseX, value => value * -30);
  const float1Y = useTransform(mouseY, value => value * -15);
  const float2X = useTransform(mouseX, value => value * 30);
  const float2Y = useTransform(mouseY, value => value * 15);
  
  // Parallax effect based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse position (-1 to 1)
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary-200/30 to-primary-300/30 blur-3xl"
          style={{ 
            x: bgX1,
            y: bgY1,
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-secondary-200/30 to-secondary-300/30 blur-3xl"
          style={{ 
            x: bgX2,
            y: bgY2,
          }}
        />
      </div>

      <div className="container-custom relative pt-40 pb-20 md:pt-40 md:pb-32">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left side with text */}
          <motion.div 
            className="lg:w-1/2 mb-16 lg:mb-0 lg:pr-8"
            style={{ 
              opacity: textOpacity,
              y: textY
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 mb-4 text-sm bg-primary-100 text-primary-700 font-medium rounded-md backdrop-blur-sm">
                Revolutionary AI Book Creation
              </span>
            </motion.div>
            <motion.h1 
              className="heading-xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="gradient-text">Your Million-Dollar Bestseller</span> Is Now Within Reach
            </motion.h1>
            <motion.p 
              className="text-lg mb-8 text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              What if you could create a professional, publish-ready book in less time than it takes to watch a movie? 
              Our revolutionary macOS application harnesses bleeding-edge artificial intelligence that top publishers are 
              desperately trying to keep secret.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.a
                href="#" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
                <FiArrowRight className="ml-2" />
              </motion.a>
              <motion.a
                href="#technology" 
                className="btn btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See How It Works
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Right side with 3D book mockup */}
          <motion.div 
            className="lg:w-1/2 perspective-1000 relative"
            style={{
              x: bookX,
              y: bookY,
            }}
          >
            <motion.div
              className="relative w-full h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ 
                rotateY,
                rotateX,
                scale: bookScale,
              }}
            >
              <div className="relative w-full">
                {/* Main 3D book */}
                <div className="book-mockup">
                  <img 
                    src={bookSetupImage} 
                    alt="AI Book Generator Interface" 
                    className="rounded-xl shadow-2xl relative z-10"
                  />
                </div>
              </div>
              
              {/* Floating UI elements - completely outside the book-mockup hierarchy */}
              <motion.div 
                className="absolute top-1/4 -right-12 bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-xl z-30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ y: -5, scale: 1.05 }}
                style={{ 
                  x: float1X,
                  y: float1Y,
                }}
              >
                <span className="text-lg font-bold text-primary-600">100%</span>
                <p className="text-sm">Ready to Publish</p>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-1/4 -left-12 bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-xl z-30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ y: -5, scale: 1.05 }}
                style={{ 
                  x: float2X,
                  y: float2Y,
                }}
              >
                <span className="text-lg font-bold text-secondary-600">24h</span>
                <p className="text-sm">From Zero to Author</p>
              </motion.div>

              {/* Glowing animated star decoration */}
              <div className="absolute -top-4 -right-4 w-20 h-20 pointer-events-none z-40">
                <motion.div 
                  className="w-full h-full"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <motion.path
                      d="M50 0 L61.8 38.2 L100 50 L61.8 61.8 L50 100 L38.2 61.8 L0 50 L38.2 38.2 Z"
                      fill="url(#gradient)"
                      animate={{ 
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.7)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.7)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="text-sm text-gray-500 mb-2">Scroll to explore</p>
        <motion.div 
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div className="w-1 h-2 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 