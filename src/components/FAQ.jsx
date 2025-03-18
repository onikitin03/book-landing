import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

// FAQ data
const faqData = [
  {
    question: "How does AI Book Generator work?",
    answer: "AI Book Generator uses advanced natural language processing models to help you plan, write, and edit your book. You start by defining your book's genre, target audience, and basic premise. The AI then assists with character development, plot structure, chapter organization, and narrative cohesion. You maintain full creative control while the AI provides suggestions, alternatives, and improvements."
  },
  {
    question: "Will my book be unique or will it sound AI-generated?",
    answer: "Your book will be completely unique and reflect your voice as an author. Our AI tools are designed to enhance your creativity, not replace it. The platform provides suggestions based on successful writing patterns, but you make all final decisions about content. Many bestselling authors use our platform, and readers never realize their books were created with AI assistance."
  },
  {
    question: "Do I need writing experience to use AI Book Generator?",
    answer: "Not at all! Our platform is designed for writers of all experience levels. Beginners receive more guidance with fundamentals like story structure and character development, while experienced authors can use the AI to overcome writer's block, refine their prose, or experiment with new narrative techniques. The platform adapts to your skill level."
  },
  {
    question: "Can I publish and sell books created with AI Book Generator?",
    answer: "Absolutely! You retain 100% ownership and copyright of all content created with our platform. You can publish your book through traditional publishers, self-publishing platforms like Amazon KDP, or any other publishing channel of your choice. Many of our users have created commercially successful books."
  },
  {
    question: "What genres does AI Book Generator support?",
    answer: "Our platform supports all major fiction and non-fiction genres, including but not limited to: Romance, Science Fiction, Fantasy, Mystery, Thriller, Horror, Historical Fiction, Literary Fiction, Self-Help, Business, Memoir, and more. The AI is trained on successful books across all these categories and can adapt to specific subgenres as well."
  },
  {
    question: "How long does it take to complete a book?",
    answer: "The timeframe varies depending on your book's length and complexity, as well as how much time you can dedicate to writing. That said, many authors report completing first drafts 2-3x faster with AI Book Generator than they could without it. The platform helps you maintain momentum by eliminating writer's block and providing immediate feedback and suggestions."
  }
];

const FAQItem = ({ item, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className="flex justify-between items-center w-full py-6 text-left"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
          {item.question}
        </h3>
        <span className="ml-6 flex-shrink-0 text-gray-500 dark:text-gray-400">
          {isOpen ? (
            <FiMinus className="h-6 w-6" />
          ) : (
            <FiPlus className="h-6 w-6" />
          )}
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-6">
              <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = useState(0);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-800 section">
      <div className="container-custom mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Everything you need to know about AI Book Generator
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {faqData.map((item, index) => (
            <FAQItem 
              key={index}
              item={item}
              isOpen={openId === index}
              toggleOpen={() => handleToggle(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 