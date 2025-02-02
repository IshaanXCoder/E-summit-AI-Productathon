

"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Code2, Rocket, Timer, Layout } from 'lucide-react';

const techExpertiseOptions = [
  'Frontend Development',
  'Backend Development', 
  'Full-Stack Development',
  'Machine Learning',
  'DevOps',
  'Mobile Development',
  'Data Science',
  'Cybersecurity',
  'Cloud Computing'
];

const HackathonSetupPage = () => {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [formData, setFormData] = useState({
    hackathonName: '',
    duration: '',
    type: '',
    techExpertise: ''
  });

  useEffect(() => {

      const updateMousePosition = (ev) => {
        setMousePosition({ 
          x: ev.clientX,  // changed from clientX
          y: ev.clientY   // changed from clientY
        });
      };
      window.addEventListener("mousemove", updateMousePosition);
      return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('hackathonDetails', JSON.stringify(formData));
    router.push('/hackPage');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-black opacity-50"
          style={{ y: backgroundY }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20" />
      </div>

      {/* Enhanced Glowing Orb */}
      <motion.div
  className="fixed w-64 h-64 rounded-full bg-blue-500 filter blur-3xl opacity-20 pointer-events-none"
  animate={{
    x: mousePosition.x - 32,
    y: mousePosition.y - 32,
  }}
  transition={{
    type: "spring",
    stiffness: 50,
    damping: 20,
  }}
/>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 w-full max-w-xl shadow-2xl mx-4"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>
        
        <motion.h1 
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hackathon Setup
        </motion.h1>
        
        <p className="text-gray-400 text-center mb-8">Configure your next breakthrough</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="group"
          >
            <label className="block text-gray-300 mb-2 flex items-center gap-2">
              <Rocket className="w-4 h-4 text-blue-400" />
              Hackathon Name
            </label>
            <input 
              type="text" 
              value={formData.hackathonName}
              onChange={(e) => setFormData({...formData, hackathonName: e.target.value})}
              required
              className="w-full px-4 py-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all placeholder-gray-500 group-hover:border-white/20"
              placeholder="Enter hackathon name"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="group"
          >
            <label className="block text-gray-300 mb-2 flex items-center gap-2">
              <Timer className="w-4 h-4 text-blue-400" />
              Duration
            </label>
            <input 
              type="number" 
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              placeholder="Hours"
              required
              className="w-full px-4 py-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all placeholder-gray-500 group-hover:border-white/20"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="group"
          >
            <label className="block text-gray-300 mb-2 flex items-center gap-2">
              <Layout className="w-4 h-4 text-blue-400" />
              Hackathon Type
            </label>
            <input 
              type="text" 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              required
              className="w-full px-4 py-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all placeholder-gray-500 group-hover:border-white/20"
              placeholder="e.g., Web3, AI, Mobile"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="group"
          >
            <label className="block text-gray-300 mb-2 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-400" />
              Technical Expertise
            </label>
            <div className="relative">
              <select 
                value={formData.techExpertise}
                onChange={(e) => setFormData({...formData, techExpertise: e.target.value})}
                required
                className="w-full px-4 py-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all appearance-none group-hover:border-white/20"
              >
                <option value="">Select Expertise</option>
                {techExpertiseOptions.map((option) => (
                  <option key={option} value={option} className="bg-gray-800">{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
            </div>
          </motion.div>
          
          <motion.button 
            type="submit" 
            className="w-full group relative overflow-hidden bg-transparent border-2 border-blue-500 text-white px-8 py-4 rounded-lg text-lg transition-all hover:shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Launch Hackathon</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default HackathonSetupPage;