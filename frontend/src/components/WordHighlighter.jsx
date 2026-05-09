import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WordHighlighter = ({ sentence1, sentence2, alignments }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [hoverSide, setHoverSide] = useState(null); // 's1' or 's2'

  const tokens1 = sentence1.split(' ');
  const tokens2 = sentence2.split(' ');

  // Helper to find match for a word in sentence 1
  const getMatchForS1 = (idx) => alignments.find(a => a.idx1 === idx);
  // Helper to find match for a word in sentence 2
  const getMatchForS2 = (idx) => alignments.find(a => a.idx2 === idx);

  return (
    <div className="glass p-8 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />
      
      <div className="flex items-center gap-2 mb-2 text-[#adb5bd] text-[10px] uppercase tracking-[0.2em] font-bold">
        Cross-Sentence Alignment
      </div>

      <div className="space-y-6">
        {/* Sentence 1 Display */}
        <div className="flex flex-wrap gap-2 text-lg">
          {tokens1.map((word, i) => {
            const match = getMatchForS1(i);
            const isActive = (hoverSide === 's1' && hoveredIdx === i) || 
                           (hoverSide === 's2' && match && match.idx2 === hoveredIdx);

            return (
              <motion.span
                key={`s1-${i}`}
                onMouseEnter={() => { setHoveredIdx(i); setHoverSide('s1'); }}
                onMouseLeave={() => { setHoveredIdx(null); setHoverSide(null); }}
                className={`px-2 py-1 rounded-md transition-all cursor-default ${
                  match ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20' : 'text-[#f8f9fa]'
                } ${isActive ? 'bg-accent-primary text-white scale-110 shadow-[0_0_15px_rgba(0,210,255,0.5)]' : ''}`}
                whileHover={{ y: -2 }}
              >
                {word}
              </motion.span>
            );
          })}
        </div>

        {/* Separator / Connection Area (Simulated) */}
        <div className="h-px bg-white/5 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/5 border border-white/10 px-3 py-0.5 rounded-full text-[8px] uppercase tracking-tighter text-[#adb5bd]">
                Semantic Map
            </div>
        </div>

        {/* Sentence 2 Display */}
        <div className="flex flex-wrap gap-2 text-lg">
          {tokens2.map((word, i) => {
            const match = getMatchForS2(i);
            const isActive = (hoverSide === 's2' && hoveredIdx === i) || 
                           (hoverSide === 's1' && match && match.idx1 === hoveredIdx);

            return (
              <motion.span
                key={`s2-${i}`}
                onMouseEnter={() => { setHoveredIdx(i); setHoverSide('s2'); }}
                onMouseLeave={() => { setHoveredIdx(null); setHoverSide(null); }}
                className={`px-2 py-1 rounded-md transition-all cursor-default ${
                  match ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20' : 'text-[#f8f9fa]'
                } ${isActive ? 'bg-accent-primary text-white scale-110 shadow-[0_0_15px_rgba(0,210,255,0.5)]' : ''}`}
                whileHover={{ y: -2 }}
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      </div>

      <p className="text-[10px] text-[#adb5bd] italic mt-4 opacity-70">
        Hover over highlighted words to see their semantic counterparts in the other sentence.
      </p>
    </div>
  );
};

export default WordHighlighter;
