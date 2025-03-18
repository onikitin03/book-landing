import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FiBookOpen, FiUsers, FiLayout, FiEye, FiEdit, FiFileText, FiArrowRight } from 'react-icons/fi';

// Import images directly
import bookSetupImage from '../assets/book-setup.png';
import storyStructureImage from '../assets/story-structure.png';
import characterAnalysisImage from '../assets/character-analysis.png';
import chapterAnalysisImage from '../assets/chapter-analysis.png';
import coverDesignImage from '../assets/cover-design.png';
import documentPreviewImage from '../assets/document-preview.png';

// Tab Data
const techTabs = [
  {
    id: 'book-setup',
    icon: <FiLayout className="w-6 h-6" />,
    label: 'Book Setup',
    title: 'Start your project right',
    description: 'Set up your book project with all the essential elements, from genre and target audience to themes and writing style.',
    image: bookSetupImage,
    features: [
      'Genre selection and analysis',
      'Target audience definition',
      'Theme exploration',
      'Writing style customization',
      'Book length optimization'
    ],
    color: 'from-primary-500 to-secondary-500'
  },
  {
    id: 'story-structure',
    icon: <FiBookOpen className="w-6 h-6" />,
    label: 'Story Structure',
    title: 'Build perfect story arcs',
    description: 'Our AI analyzes successful book structures to generate compelling story arcs that keep readers engaged from start to finish.',
    image: storyStructureImage,
    features: [
      'Genre-specific story templates',
      'Plot point generation',
      'Rising and falling action balance',
      'Conflict and resolution mapping',
      'Story beat analysis'
    ],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'character-development',
    icon: <FiUsers className="w-6 h-6" />,
    label: 'Character Development',
    title: 'Create memorable characters',
    description: 'Develop multi-dimensional characters with rich backstories, clear motivations, and authentic dialogue that resonates with readers.',
    image: characterAnalysisImage,
    features: [
      'Character archetype templates',
      'Personality trait analysis',
      'Character relationship mapping',
      'Dialogue style customization',
      'Character arc development'
    ],
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'chapter-analysis',
    icon: <FiEye className="w-6 h-6" />,
    label: 'Chapter Analysis',
    title: 'Perfect your chapter structure',
    description: 'Analyze and optimize individual chapters for pacing, engagement, and narrative flow to keep readers turning pages.',
    image: chapterAnalysisImage,
    features: [
      'Chapter pacing analysis',
      'Scene structure optimization',
      'Tension and release balance',
      'Chapter hook suggestions',
      'Transition effectiveness scoring'
    ],
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 'cover-design',
    icon: <FiEdit className="w-6 h-6" />,
    label: 'Cover Design',
    title: 'Eye-catching cover designs',
    description: 'Generate professional book covers that stand out in the marketplace and attract your target readers.',
    image: coverDesignImage,
    features: [
      'Genre-appropriate visuals',
      'Typography optimization',
      'Color palette selection',
      'Market-tested designs',
      'Custom element integration'
    ],
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'document-preview',
    icon: <FiFileText className="w-6 h-6" />,
    label: 'Document Preview',
    title: 'Preview your finished book',
    description: 'See how your finished book will look with our interactive document preview feature, allowing you to experience your book as readers will.',
    image: documentPreviewImage,
    features: [
      'Interactive page turning',
      'Multiple format previews (PDF, ePub, Print)',
      'Font and layout visualization',
      'Mobile and desktop reading views',
      'Export-ready formatting check'
    ],
    color: 'from-yellow-500 to-amber-600'
  }
];

const TechnologySection = () => {
  const [activeTab, setActiveTab] = useState(techTabs[0].id);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Create motion values for mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform motion values for background elements
  const bgX1 = useTransform(mouseX, value => value * -30);
  const bgY1 = useTransform(mouseY, value => value * -30);
  const bgX2 = useTransform(mouseX, value => value * 30);
  const bgY2 = useTransform(mouseY, value => value * 30);

  // Find active tab data
  const activeTabData = techTabs.find(tab => tab.id === activeTab);
  
  // Mouse movement effect
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

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section 
      id="technology" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background gradient elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-primary-100/30 to-primary-200/30 blur-3xl"
          animate={{ 
            opacity: isInView ? 0.6 : 0
          }}
          style={{
            x: bgX1,
            y: bgY1
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-secondary-100/30 to-secondary-200/30 blur-3xl"
          animate={{ 
            opacity: isInView ? 0.5 : 0
          }}
          style={{
            x: bgX2,
            y: bgY2
          }}
          transition={{ duration: 0.5 }}
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
              Advanced Technology
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="heading-lg mb-4"
          >
            <span className="gradient-text">AI-Powered Technology</span> For Book Creation
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover how our platform transforms the writing process with state-of-the-art AI
          </motion.p>
        </div>

        {isMobile ? (
          <MobileTechTabs 
            techTabs={techTabs} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        ) : (
          <DesktopTechTabs 
            techTabs={techTabs} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            activeTabData={activeTabData}
            mousePosition={mousePosition}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
            isInView={isInView}
          />
        )}
      </div>
    </section>
  );
};

// Mobile tabs component
const MobileTechTabs = ({ techTabs, activeTab, setActiveTab }) => {
  const tabsRef = useRef(null);
  const isInView = useInView(tabsRef, { once: false, amount: 0.2 });
  
  return (
    <motion.div
      ref={tabsRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Tabs navigation */}
      <div className="flex items-center justify-start overflow-x-auto pb-2 hide-scrollbar space-x-2">
        {techTabs.map(tab => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-3 rounded-xl whitespace-nowrap transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-white shadow-md'
                : 'bg-white/50 backdrop-blur-sm hover:bg-white/80'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`p-2 rounded-full bg-gradient-to-r ${tab.color} mb-2`}>
              <div className="text-white">
                {tab.icon}
              </div>
            </div>
            <span className={`text-sm font-medium ${
              activeTab === tab.id ? 'text-gray-900' : 'text-gray-600'
            }`}>
              {tab.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Active tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="h-48 overflow-hidden rounded-xl mb-6 relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${techTabs.find(t => t.id === activeTab).color} opacity-20`} />
            <img 
              src={techTabs.find(t => t.id === activeTab).image} 
              alt={techTabs.find(t => t.id === activeTab).label} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {techTabs.find(t => t.id === activeTab).title}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {techTabs.find(t => t.id === activeTab).description}
          </p>
          
          <ul className="space-y-2">
            {techTabs.find(t => t.id === activeTab).features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <motion.span 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${techTabs.find(t => t.id === activeTab).color} flex items-center justify-center text-white text-xs mr-2 mt-0.5`}
                >
                  ✓
                </motion.span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

// Desktop tabs component
const DesktopTechTabs = ({ 
  techTabs, 
  activeTab, 
  setActiveTab, 
  activeTabData,
  mousePosition,
  containerVariants,
  itemVariants,
  isInView
}) => {
  const imageRef = useRef(null);
  
  // Create motion values for mouse movement
  const mouseX = useMotionValue(mousePosition.x);
  const mouseY = useMotionValue(mousePosition.y);
  
  // Update motion values when mousePosition changes
  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition, mouseX, mouseY]);
  
  // Transform motion values for image
  const rotateY = useTransform(mouseX, value => value * 5);
  const rotateX = useTransform(mouseY, value => -value * 5);
  
  // Transform motion values for decorative elements
  const decorX1 = useTransform(mouseX, value => value * -15);
  const decorY1 = useTransform(mouseY, value => value * -15);
  const decorX2 = useTransform(mouseX, value => value * 15);
  const decorY2 = useTransform(mouseY, value => value * 15);
  
  return (
    <div>
      <div className="flex justify-center mb-8">
        <motion.div 
          className="inline-flex p-1 backdrop-blur-sm bg-white/40 rounded-full shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {techTabs.map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === tab.id && (
                <motion.div 
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${tab.color}`}
                  layoutId="activeTabBackground"
                  transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 25 }}
                />
              )}
              <span className="relative flex items-center space-x-2">
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content side */}
        <motion.div
          className="order-2 lg:order-1"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h3 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {activeTabData.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-6"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {activeTabData.description}
              </motion.p>
              
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3 mb-8"
              >
                {activeTabData.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                    className="flex items-start"
                  >
                    <motion.span 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${activeTabData.color} flex items-center justify-center text-white text-xs mr-3 mt-0.5`}
                    >
                      ✓
                    </motion.span>
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
              
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
              >
                <motion.a 
                  href="#pricing" 
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-2 hover:translate-y-[-2px] transform"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Get Started Today</span>
                  <FiArrowRight className="ml-2" />
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Image side */}
        <div className="order-1 lg:order-2 perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              ref={imageRef}
              className="relative perspective-1000"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d"
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={activeTabData.image} 
                  alt={activeTabData.label}
                  className="w-full h-auto"
                />
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className={`absolute -top-5 -right-5 p-3 rounded-lg bg-white shadow-lg z-10`}
                style={{
                  x: decorX1,
                  y: decorY1
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                <div className={`p-2 rounded-full bg-gradient-to-r ${activeTabData.color}`}>
                  <div className="text-white">
                    {activeTabData.icon}
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-3 -left-3 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg z-10"
                style={{
                  x: decorX2,
                  y: decorY2
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                <span className="text-sm font-bold">AI-Powered</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TechnologySection; 