import React from 'react';
import { motion } from 'framer-motion';

const ComparisonForm = ({ sentence1, setSentence1, sentence2, setSentence2, onAnalyze, isLoading }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#adb5bd] uppercase tracking-widest px-1">Sentence 1</label>
        <textarea
          className="textarea-custom w-full h-24 resize-none"
          placeholder="Enter first sentence..."
          value={sentence1}
          onChange={(e) => setSentence1(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#adb5bd] uppercase tracking-widest px-1">Sentence 2</label>
        <textarea
          className="textarea-custom w-full h-24 resize-none"
          placeholder="Enter second sentence..."
          value={sentence2}
          onChange={(e) => setSentence2(e.target.value)}
        />
      </div>

      <button
        onClick={onAnalyze}
        disabled={isLoading}
        className="btn-primary w-full py-4 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          "Analyze Similarity"
        )}
      </button>
    </div>
  );
};

export default ComparisonForm;
