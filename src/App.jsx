import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TechnologySection from './components/TechnologySection';
import Testimonials from './components/Testimonials';
import GetStartedCTA from './components/GetStartedCTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <TechnologySection />
      <Testimonials />
      <GetStartedCTA />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
