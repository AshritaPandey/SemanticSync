import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Microscope, Hash } from 'lucide-react';

const LinguisticDashboard = ({ insights }) => {
  const { sentence1, sentence2 } = insights;

  const EntityList = ({ entities, title }) => (
    <div className="space-y-3">
      <h4 className="text-[10px] uppercase tracking-widest text-[#adb5bd] font-bold">{title} Entities</h4>
      <div className="flex flex-wrap gap-2">
        {entities.length > 0 ? entities.map((ent, i) => (
          <div key={i} className="px-2 py-1 bg-accent-primary/20 border border-accent-primary/30 rounded flex items-center gap-2 group cursor-help relative">
            <span className="text-xs font-bold text-accent-primary">{ent.text}</span>
            <span className="text-[8px] bg-accent-primary text-white px-1 rounded font-black">{ent.label}</span>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-black/90 text-[10px] text-white rounded hidden group-hover:block w-32 text-center z-50 shadow-xl border border-white/10">
                {ent.description}
            </div>
          </div>
        )) : <span className="text-xs text-[#adb5bd] italic">No entities detected</span>}
      </div>
    </div>
  );

  const POSGrid = ({ tags, title }) => (
    <div className="space-y-3">
        <h4 className="text-[10px] uppercase tracking-widest text-[#adb5bd] font-bold">{title} Grammar</h4>
        <div className="flex flex-wrap gap-1">
            {tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="text-[10px] px-1.5 py-0.5 rounded border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-default relative group"
                >
                    {tag.text}
                    <sub className="ml-1 opacity-50">{tag.pos}</sub>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-black/90 text-[10px] text-white rounded hidden group-hover:block w-32 text-center z-50 shadow-xl border border-white/10">
                        {tag.explanation}
                    </div>
                </span>
            ))}
        </div>
    </div>
  );

  return (
    <div className="glass p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <Microscope size={20} />
            </div>
            <div>
                <h3 className="text-xl font-bold">Linguistic Intelligence</h3>
                <p className="text-[10px] text-[#adb5bd] uppercase tracking-widest">Deep Structural Analysis</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8">
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-4 text-xs font-bold opacity-70">
                    <Tag size={12} className="text-accent-primary" />
                    Named Entity recognition
                </div>
                <div className="space-y-6">
                    <EntityList entities={sentence1.entities} title="S1" />
                    <EntityList entities={sentence2.entities} title="S2" />
                </div>
            </div>

            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-4 text-xs font-bold opacity-70">
                    <Hash size={12} className="text-accent-primary" />
                    Keyword Extraction
                </div>
                <div className="flex flex-wrap gap-2">
                    {[...new Set([...sentence1.keywords, ...sentence2.keywords])].map((kw, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs hover:border-accent-primary/50 transition-colors">
                            {kw}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 h-full">
                <div className="flex items-center gap-2 mb-4 text-xs font-bold opacity-70">
                    <Microscope size={12} className="text-accent-primary" />
                    Morphological Analysis (POS)
                </div>
                <div className="space-y-6">
                    <POSGrid tags={sentence1.pos_tags} title="S1" />
                    <POSGrid tags={sentence2.pos_tags} title="S2" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LinguisticDashboard;
