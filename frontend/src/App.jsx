import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Brain, History, Info, ChevronRight, Layers, Sparkles } from 'lucide-react';
import ComparisonForm from './components/ComparisonForm';
import SimilarityMeter from './components/SimilarityMeter';
import WordHighlighter from './components/WordHighlighter';
import LinguisticDashboard from './components/LinguisticDashboard';

const App = () => {
  const [sentence1, setSentence1] = useState("He is very happy");
  const [sentence2, setSentence2] = useState("He is joyful");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/history');
      if (Array.isArray(response.data)) {
        setHistory(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch history");
    }
  };

  useEffect(() => {
    fetchHistory();
    // Initial analysis for better UX
    handleAnalyze();
  }, []);

  const handleAnalyze = async () => {
    if (!sentence1.trim() || !sentence2.trim()) {
      setError("Please provide both sentences.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/analyze', {
        sentence1,
        sentence2
      });
      console.log("Response received:", response.data);
      setResult(response.data);
      fetchHistory();
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to connect to NLP backend. Make sure it is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-10 max-w-7xl mx-auto font-outfit">
      {/* Header */}
      <header className="flex items-center justify-between mb-12 fade-in">
        <div className="flex items-center gap-3">
          <div className="bg-accent-primary p-2.5 rounded-xl shadow-[0_0_20px_rgba(0,210,255,0.4)]">
            <Brain size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">SemanticSync</h1>
            <p className="text-[10px] text-[#adb5bd] uppercase tracking-widest font-semibold">AI Similarity Analyzer</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#adb5bd]">
          <a href="#" className="hover:text-white transition-colors">Analyzer</a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
        </nav>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-6">
                <h2 className="text-4xl font-bold mb-3 tracking-tight">Sync <span className="gradient-text">Meaning</span></h2>
                <p className="text-[#adb5bd] max-w-sm">Compare text segments using advanced NLP models.</p>
            </div>
            <ComparisonForm 
              sentence1={sentence1} setSentence1={setSentence1}
              sentence2={sentence2} setSentence2={setSentence2}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
            {error && <p className="mt-4 text-red-400 text-sm font-medium flex items-center gap-2"><Info size={14}/> {error}</p>}
          </motion.div>

          <motion.div 
            className="p-6 glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <History size={18} className="text-accent-primary" />
                Recent History
            </h3>
            <div className="space-y-3">
              {history.length > 0 ? history.map((item, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between text-sm group hover:border-white/20 transition-all cursor-pointer" onClick={() => {setSentence1(item.sentence1); setSentence2(item.sentence2); handleAnalyze();}}>
                  <div className="truncate max-w-[150px]">
                    <span className="text-[#adb5bd] italic">"{item.sentence1}"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-accent-primary">{(item.score * 100).toFixed(0)}%</span>
                    <ChevronRight size={14} className="text-[#adb5bd] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )) : (
                <p className="text-[#adb5bd] text-sm italic">No recent comparisons</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center p-10 glass border-dashed border-2 border-white/10"
              >
                <div className="relative mb-6">
                    <div className="absolute -inset-4 bg-accent-primary/20 blur-xl rounded-full animate-pulse" />
                    <Sparkles size={64} className="text-accent-primary relative" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Analyzing...</h3>
                <p className="text-[#adb5bd] text-center max-w-sm">The models are processing your input.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result && typeof result.score === 'number' && <SimilarityMeter score={result.score} />}
                  
                  <div className="glass p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2 text-[#adb5bd] text-[10px] uppercase tracking-[0.2em] font-bold">
                        <Layers size={14} />
                        Conclusion
                    </div>
                    <div className="text-3xl font-bold mb-2">{result.result}</div>
                    <p className="text-sm text-[#adb5bd] leading-relaxed">
                        {result.explanation}
                    </p>
                  </div>
                </div>

                {result && result.alignments && (
                  <WordHighlighter 
                    sentence1={sentence1} 
                    sentence2={sentence2} 
                    alignments={result.alignments} 
                  />
                )}

                {result && result.linguistic_insights && (
                  <LinguisticDashboard insights={result.linguistic_insights} />
                )}

                <div className="glass p-8">
                  <h3 className="text-xl font-semibold mb-6">Model Benchmarks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {result.model_scores && Object.entries(result.model_scores).map(([model, score]) => (
                        <div key={model} className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <p className="text-[10px] uppercase tracking-widest text-[#adb5bd] mb-3 font-bold">{model}</p>
                            <span className="text-2xl font-bold">{(score * 100).toFixed(1)}%</span>
                            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                                <motion.div 
                                    className="h-full bg-accent-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${score * 100}%` }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="mt-20 py-8 border-t border-white/5 text-center text-[#adb5bd] text-sm">
        <p>&copy; 2026 SemanticSync AI Lab</p>
      </footer>
    </div>
  );
};

export default App;
