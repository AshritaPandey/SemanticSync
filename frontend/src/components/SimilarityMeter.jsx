import React from 'react';
import { motion } from 'framer-motion';

const SimilarityMeter = ({ score }) => {
  const percentage = Math.round(score * 100);
  
  // Dynamic color based on score
  const getColor = () => {
    if (score > 0.75) return 'var(--high-sim)';
    if (score > 0.4) return 'var(--med-sim)';
    return 'var(--low-sim)';
  };

  const color = getColor();

  return (
    <div className="glass p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="58"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/5"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="58"
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="364.4"
            initial={{ strokeDashoffset: 364.4 }}
            animate={{ strokeDashoffset: 364.4 - (364.4 * percentage) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
          />
        </svg>
        
        <div className="text-center z-10">
          <motion.span 
            className="text-3xl font-bold block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {percentage}%
          </motion.span>
          <span className="text-[10px] text-[#adb5bd] uppercase font-bold tracking-widest">Similarity</span>
        </div>
      </div>
      
      {/* Decorative glow in background */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 blur-[50px] rounded-full" style={{ backgroundColor: `${color}22` }} />
    </div>
  );
};

export default SimilarityMeter;
