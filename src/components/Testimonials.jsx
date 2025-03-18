import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiEdit, FiBook, FiAward, FiBarChart, FiPenTool } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Add global styles to the component
const GlobalAnimationStyles = () => {
  useEffect(() => {
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes bookGlow {
        0%, 100% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25); }
        50% { box-shadow: 0 15px 50px rgba(79, 70, 229, 0.5); }
      }
      
      @keyframes bookFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-25px); }
      }
      
      @keyframes bookRotate {
        0% { transform: rotateY(-25deg) rotateX(-5deg); }
        50% { transform: rotateY(25deg) rotateX(-15deg); }
        100% { transform: rotateY(-25deg) rotateX(-5deg); }
      }
    `;
    
    // Add style to head
    document.head.appendChild(styleElement);
    
    // Clean up on unmount
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);
  
  return null;
};

// Add component-specific CSS to ensure book visibility
const bookStyles = `
  :root {
    --primary-600: #4f46e5;
    --primary-700: #4338ca;
    --secondary-600: #0ea5e9;
    --secondary-700: #0369a1;
  }
  
  .book-container {
    transform-style: preserve-3d !important;
    transform: perspective(1000px) rotateY(0deg) rotateX(-8deg) !important;
    backface-visibility: hidden;
    will-change: transform;
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2));
    transform-origin: center center;
  }
  
  .book-cover {
    background: linear-gradient(to bottom right, var(--primary-600), var(--secondary-600));
    transform-style: preserve-3d !important;
    transform: translateZ(15px) !important;
    opacity: 1 !important;
    visibility: visible !important;
    z-index: 10;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    animation: bookGlow 4s ease-in-out infinite;
  }
  
  .book-spine {
    background: linear-gradient(to bottom, var(--primary-700), var(--secondary-700));
    transform-style: preserve-3d !important;
    transform: rotateY(90deg) translateX(-3px) !important;
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.2);
  }
  
  .book-pages {
    background: white !important;
    transform-style: preserve-3d !important;
    transform: translateZ(12px) !important;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }
  
  /* Add hover effect styles */
  .book-container:hover {
    filter: drop-shadow(0 30px 40px rgba(0, 0, 0, 0.3));
  }
  
  .book-cover:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }
`;

// Preload image for book background (helps with initial rendering)
const preloadBookGradient = () => {
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%234f46e5"/><stop offset="100%" stop-color="%230ea5e9"/></linearGradient></defs><rect width="200" height="300" fill="url(%23grad)"/></svg>`;
  return img;
};

// Preload the gradient image
preloadBookGradient();

// Journey stages data
const journeyStages = [
  {
    id: 1,
    title: 'Ideation',
    description: 'Transform your initial concept into a structured book outline with AI assistance',
    icon: <FiEdit className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-300',
    animation: { rotate: [-5, 5], y: [-10, 10] }
  },
  {
    id: 2,
    title: 'Creation',
    description: 'Draft your manuscript with AI-powered writing tools that enhance your creativity',
    icon: <FiPenTool className="w-8 h-8" />,
    color: 'from-indigo-500 to-purple-400',
    animation: { rotate: [5, -5], y: [10, -10] }
  },
  {
    id: 3,
    title: 'Refinement',
    description: 'Polish your content with advanced AI editing and enhancement features',
    icon: <FiBook className="w-8 h-8" />,
    color: 'from-amber-400 to-orange-300',
    animation: { rotate: [-5, 5], y: [-10, 10] }
  },
  {
    id: 4,
    title: 'Publication',
    description: 'Prepare your book for publishing with AI-optimized formatting and design',
    icon: <FiAward className="w-8 h-8" />,
    color: 'from-emerald-400 to-green-300',
    animation: { rotate: [5, -5], y: [10, -10] }
  },
  {
    id: 5,
    title: 'Marketing',
    description: 'Promote your book with AI-generated marketing materials and optimization',
    icon: <FiBarChart className="w-8 h-8" />,
    color: 'from-rose-400 to-pink-300',
    animation: { rotate: [-5, 5], y: [-10, 10] }
  }
];

// 3D Journey Stage Card component
const JourneyStageCard = ({ stage, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    // 3D hover effect
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(card, {
        rotationY: x * 10,
        rotationX: -y * 10,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        ease: "power2.out",
        duration: 0.5
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="flex-1 min-w-[280px]"
    >
      <div 
        ref={cardRef}
        className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transform-gpu will-change-transform"
        style={{ 
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className={`h-3 bg-gradient-to-r ${stage.color}`}></div>
        <div className="p-8">
          <motion.div 
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 bg-gradient-to-r ${stage.color} text-white`}
            animate={{ 
              rotate: stage.animation.rotate,
              y: stage.animation.y
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 4,
              ease: "easeInOut"
            }}
          >
            {stage.icon}
          </motion.div>
          
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Stage {stage.id}: {stage.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {stage.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Animated connecting line component
const ConnectingLine = ({ index }) => {
  const lineRef = useRef(null);
  
  useEffect(() => {
    if (!lineRef.current) return;
    
    gsap.fromTo(
      lineRef.current,
      { height: 0 },
      {
        height: "100%",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);
  
  return (
    <div className="hidden md:block relative w-8 mx-8 my-4">
      <div 
        ref={lineRef} 
        className={`absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b ${journeyStages[index].color} rounded-full opacity-70`}
        style={{ top: 0, bottom: 0 }}
      ></div>
    </div>
  );
};

// 3D Book Model component
const AnimatedBookModel = () => {
  const bookRef = useRef(null);
  const bookContentRef = useRef(null);
  const animationsRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  // Initialize all animations on mount
  useEffect(() => {
    // Create a container for all our animations so we can kill them all at once
    animationsRef.current = {
      tl: gsap.timeline(),
      hover: null
    };
    
    // Make sure book exists
    if (!bookRef.current) return;
    
    // Kill any existing animations first
    gsap.killTweensOf(bookRef.current);
    
    // IMPORTANT: Set initial transform directly
    gsap.set(bookRef.current, {
      rotationY: 0,
      rotationX: -8,
      y: 0,
      transformPerspective: 1000,
      transformOrigin: "center center"
    });

    // Create primary animation timeline
    const tl = gsap.timeline({ repeat: -1 });
    
    // Floating animation
    tl.to(bookRef.current, {
      y: -20,
      duration: 1.5,
      ease: "sine.inOut"
    }).to(bookRef.current, {
      y: 0,
      duration: 1.5,
      ease: "sine.inOut"
    });
    
    // Add gentle rotation animation with increased range - oscillate from negative to positive
    gsap.to(bookRef.current, {
      rotationY: 25,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Add separate animation for negative rotation
    gsap.to(bookRef.current, {
      rotationY: -25,
      duration: 2.5,
      delay: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Add slight tilt animation with increased range
    gsap.to(bookRef.current, {
      rotationX: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });
    
    // Store animation references
    animationsRef.current.tl = tl;
    
    return () => {
      if (animationsRef.current) {
        // Kill all animations
        gsap.killTweensOf(bookRef.current);
        if (animationsRef.current.tl) {
          animationsRef.current.tl.kill();
        }
        if (animationsRef.current.hover) {
          animationsRef.current.hover.kill();
        }
      }
    };
  }, []);
  
  // Handle document-wide mouse movement for the parallax effect
  useEffect(() => {
    if (!bookRef.current || !containerRef.current) return;
    
    // Create the global mouse tracking animation
    const handleDocumentMouseMove = (e) => {
      if (isHovering) return; // Let the hover handler take over if directly on book
      
      // Get the center of the viewport
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      
      // Calculate mouse position relative to center of viewport (normalized -1 to 1)
      const mouseX = (e.clientX - viewportCenterX) / (window.innerWidth / 2);
      const mouseY = (e.clientY - viewportCenterY) / (window.innerHeight / 2);
      
      // Get book position
      const bookRect = bookRef.current.getBoundingClientRect();
      const bookCenterX = bookRect.left + bookRect.width / 2;
      const bookCenterY = bookRect.top + bookRect.height / 2;
      
      // Calculate distance from mouse to book center (normalized)
      const distanceX = (e.clientX - bookCenterX) / (window.innerWidth / 2);
      const distanceY = (e.clientY - bookCenterY) / (window.innerHeight / 2);
      
      // Apply balanced rotation based on mouse position with damping
      // Instead of adding to a base rotation, use a symmetrical formula
      gsap.to(bookRef.current, {
        rotationY: mouseX * 40, // Symmetrical rotation range of ±40 degrees
        rotationX: -mouseY * 20,
        duration: 0.8,
        ease: "power1.out",
        overwrite: "auto"
      });
    };
    
    // Add the document-wide event listener
    document.addEventListener('mousemove', handleDocumentMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
    };
  }, [isHovering]);
  
  // Mouse interaction handlers for direct hover
  const handleMouseEnter = () => {
    if (!bookRef.current) return;
    
    setIsHovering(true);
    
    // Pause the ongoing animations
    if (animationsRef.current && animationsRef.current.tl) {
      animationsRef.current.tl.pause();
    }
    
    // Kill any existing hover animations
    if (animationsRef.current.hover) {
      animationsRef.current.hover.kill();
    }
    
    // Create new hover animation - more pronounced when directly hovering
    animationsRef.current.hover = gsap.to(bookRef.current, {
      rotationY: 0,
      rotationX: 0, 
      y: -20,
      duration: 0.5,
      ease: "power2.out"
    });
  };
  
  const handleMouseMove = (e) => {
    if (!bookRef.current || !isHovering) return;
    
    // Get mouse position relative to element - more intense rotation when directly hovering
    const rect = bookRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    
    // Create new hover animation with more pronounced effect
    if (animationsRef.current.hover) {
      animationsRef.current.hover.kill();
    }
    
    animationsRef.current.hover = gsap.to(bookRef.current, {
      rotationY: mouseX * 45,
      rotationX: -mouseY * 30,
      y: -20 - (mouseY * 15),
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto"
    });
  };
  
  const handleMouseLeave = () => {
    if (!bookRef.current) return;
    
    setIsHovering(false);
    
    // Kill hover animation
    if (animationsRef.current.hover) {
      animationsRef.current.hover.kill();
    }
    
    // Return to the center position (0 degrees) rather than fixed 25 degrees
    animationsRef.current.hover = gsap.to(bookRef.current, {
      rotationY: 0,
      rotationX: -8,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // Resume the base animation
        if (animationsRef.current && animationsRef.current.tl) {
          animationsRef.current.tl.play();
        }
      }
    });
  };
  
  return (
    <div className="relative w-64 h-96 mx-auto" ref={containerRef}>
      <div 
        ref={bookRef} 
        className="absolute inset-0 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateY(0deg) rotateX(-8deg)',
          transformOrigin: 'center center',
          willChange: 'transform',
          transition: 'none'
        }}
      >
        {/* Book pages */}
        <div 
          className="absolute inset-0 rounded-r-md rounded-b-md"
          style={{ 
            background: 'white', 
            transform: 'translateZ(12px)',
            transformStyle: 'preserve-3d',
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)'
          }}
        />
        
        {/* Book spine */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-6 rounded-l-lg origin-left"
          style={{ 
            background: 'linear-gradient(to bottom, #4338ca, #0369a1)',
            transformStyle: 'preserve-3d',
            transform: 'rotateY(90deg) translateX(-3px)',
            boxShadow: '-5px 0 20px rgba(0, 0, 0, 0.2)'
          }}
        />
        
        {/* Book page shadow effect */}
        <div 
          className="absolute inset-y-0 right-0 w-6"
          style={{ 
            background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.1))',
            transform: 'translateZ(13px)'
          }}
        />
        
        {/* Book cover */}
        <div 
          ref={bookContentRef}
          className="absolute inset-0 rounded-r-lg rounded-b-lg shadow-2xl"
          style={{ 
            background: 'linear-gradient(to bottom right, #4f46e5, #0ea5e9)',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(15px)',
            zIndex: 10,
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
            animation: 'bookGlow 4s ease-in-out infinite'
          }}
        >
          <div className="absolute inset-4 border-2 border-white/20 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-sm uppercase tracking-wider">Your Story</div>
              <div className="text-2xl font-bold mt-2">THE NEXT</div>
              <div className="text-3xl font-bold">BESTSELLER</div>
              <div className="mt-4 text-xs">Written with AI Book Generator</div>
            </div>
          </div>
        </div>
        
        {/* Reflection effect */}
        <div 
          className="absolute inset-x-0 top-0 h-1/3 rounded-t-lg pointer-events-none"
          style={{ 
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)',
            transform: 'translateZ(16px)',
            opacity: 0.5 
          }}
        />
      </div>
    </div>
  );
};

// Ensure book appears correctly on first render by applying styles immediately
const BookModelWrapper = () => {
  useEffect(() => {
    // Force GSAP to update on mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="book-model-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes book-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        
        @keyframes book-rotate {
          0% { transform: perspective(1000px) rotateY(-25deg) rotateX(-5deg); }
          50% { transform: perspective(1000px) rotateY(25deg) rotateX(-15deg); }
          100% { transform: perspective(1000px) rotateY(-25deg) rotateX(-5deg); }
        }
        
        .book-model-wrapper {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
      `}} />
      <AnimatedBookModel />
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Check if element is in viewport initially
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Initialize fancy scroll animations
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    });
    
    timeline.from(".journey-title", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }).from(".journey-description", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");
    
    return () => {
      // Clean up scroll triggers and observer
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      observer.disconnect();
    };
  }, []);

  // Force GSAP to update on browser resize for better responsiveness
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="journey" 
      className="pb-20 pt-0 bg-gray-50 dark:bg-gray-900 overflow-hidden section"
    >
      <GlobalAnimationStyles />
      <div className="container-custom mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="journey-title text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Creation Journey
          </h2>
          <p className="journey-description text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transform your ideas into published books with our AI-powered process
          </p>
        </div>
        
        <motion.div 
          className="flex flex-col items-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <BookModelWrapper />
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-stretch gap-8 mb-8">
          {journeyStages.slice(0, 3).map((stage, index) => (
            <React.Fragment key={stage.id}>
              <JourneyStageCard stage={stage} index={index} />
              {index < 2 && <ConnectingLine index={index} />}
            </React.Fragment>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-stretch gap-8 mb-20">
          {journeyStages.slice(3).map((stage, index) => (
            <React.Fragment key={stage.id}>
              <JourneyStageCard stage={stage} index={index + 3} />
              {index < 1 && <ConnectingLine index={index + 3} />}
            </React.Fragment>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-primary-50 dark:bg-gray-800 rounded-xl p-6 md:p-10 max-w-4xl mx-auto transform-gpu hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Begin Your Author Journey Today
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Experience how AI can transform your writing process from concept to published book
            </p>
            <a 
              href="#pricing" 
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center hover:translate-y-[-2px] transform-gpu"
            >
              <span>Start Creating Now</span>
              <FiArrowRight className="ml-2" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 