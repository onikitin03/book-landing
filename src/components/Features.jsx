import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { FiBook, FiUsers, FiTrendingUp, FiTarget, FiCpu, FiLayers } from 'react-icons/fi';

const featureData = [
  {
    icon: <FiBook className="w-10 h-10 text-primary-500" />,
    title: "Plot Generation",
    description: "Create compelling narratives with AI-driven plot structures tailored to your genre and target audience."
  },
  {
    icon: <FiUsers className="w-10 h-10 text-primary-500" />,
    title: "Character Development",
    description: "Craft multidimensional characters with rich backstories, motivations, and authentic dialogue."
  },
  {
    icon: <FiTrendingUp className="w-10 h-10 text-primary-500" />,
    title: "Bestseller Formulas",
    description: "Leverage data-driven insights from thousands of bestsellers to optimize your story's market appeal."
  },
  {
    icon: <FiTarget className="w-10 h-10 text-primary-500" />,
    title: "Chapter Structure",
    description: "Optimize your narrative flow with intelligent chapter analysis that enhances pacing and reader engagement."
  },
  {
    icon: <FiCpu className="w-10 h-10 text-primary-500" />,
    title: "AI-Powered Editing",
    description: "Polish your manuscript with advanced AI suggestions for grammar, style, and narrative cohesion."
  },
  {
    icon: <FiLayers className="w-10 h-10 text-primary-500" />,
    title: "Cover Design",
    description: "Generate eye-catching book covers tailored to your genre and story elements that capture readers' attention."
  }
];

const FeatureCard = ({ icon, title, description, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  
  // Values for 3D rotation effect
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    
    // Calculate the center of the card
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center (from -1 to 1)
    const relativeX = (e.clientX - centerX) / (rect.width / 2);
    const relativeY = (e.clientY - centerY) / (rect.height / 2);
    
    // Apply rotation (limited to a moderate amount)
    setRotateX(-relativeY * 5); // Invert Y axis for natural rotation
    setRotateY(relativeX * 5);
  };
  
  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotateX(0);
    setRotateY(0);
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1
      }
    }
  };
  
  const iconBackgroundVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2 + index * 0.1
      }
    }
  };
  
  const iconHoverAnimations = {
    rotate: [0, 3, -3, 0],
    transition: {
      rotate: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2
      }
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="perspective-1000"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -10 }}
    >
      <motion.div
        className="glass-card p-8 rounded-xl h-full"
        style={{ 
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col space-y-4 z-10">
          <motion.div 
            className="gradient-border"
            variants={iconBackgroundVariants}
            whileHover={iconHoverAnimations}
            style={{
              background: "linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(59, 130, 246, 0.1))",
              borderRadius: "12px",
              padding: "3px",
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.15)"
            }}
          >
            <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          </motion.div>
          
          <motion.h3 
            className="text-xl font-bold text-gray-900"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Mouse position for background elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform motion values for background elements
  const bgX1 = useTransform(mouseX, value => value * -20);
  const bgY1 = useTransform(mouseY, value => value * -20);
  const bgX2 = useTransform(mouseX, value => value * 20);
  const bgY2 = useTransform(mouseY, value => value * 20);
  
  // Monitor mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-primary-100/30 blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            x: bgX1,
            y: bgY1
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary-100/30 blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            x: bgX2,
            y: bgY2
          }}
        />
      </div>
      
      <div className="container-custom mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 mb-4 text-sm bg-primary-100 text-primary-700 font-medium rounded-md backdrop-blur-sm">
              AI-Powered Features
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="heading-lg mb-4 text-gray-900"
          >
            <span className="gradient-text">Revolutionary Tools</span> For Modern Authors
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Turn your book idea into a polished bestseller with our comprehensive suite of AI-powered tools
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {featureData.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.a 
            href="#technology" 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See How It Works
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 