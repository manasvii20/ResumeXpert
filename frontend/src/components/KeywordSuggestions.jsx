import React from 'react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

const KeywordSuggestions = ({ matchedKeywords = [], missingKeywords = [], keywordSuggestions = [] }) => {
  const Pill = ({ text, variant }) => {
    const styles = {
      matched: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
      missing: 'bg-red-500/15 text-red-400 border-red-500/20',
      suggested: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    };

    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${styles[variant]} transition-all duration-200 hover:scale-105`}>
        {text}
      </span>
    );
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
        Keyword Analysis
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Matched Keywords */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={18} className="text-emerald-400" />
            <h4 className="text-sm font-semibold text-emerald-400">
              Matched ({matchedKeywords.length})
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.length > 0 ? (
              matchedKeywords.map((kw, i) => <Pill key={i} text={kw} variant="matched" />)
            ) : (
              <p className="text-xs text-slate-500 italic">No matches found</p>
            )}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-red-500/10">
          <div className="flex items-center gap-2 mb-4">
            <XCircle size={18} className="text-red-400" />
            <h4 className="text-sm font-semibold text-red-400">
              Missing ({missingKeywords.length})
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.length > 0 ? (
              missingKeywords.map((kw, i) => <Pill key={i} text={kw} variant="missing" />)
            ) : (
              <p className="text-xs text-slate-500 italic">All keywords covered!</p>
            )}
          </div>
        </div>

        {/* Suggested Keywords */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={18} className="text-blue-400" />
            <h4 className="text-sm font-semibold text-blue-400">
              Suggested ({keywordSuggestions.length})
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywordSuggestions.length > 0 ? (
              keywordSuggestions.map((kw, i) => <Pill key={i} text={kw} variant="suggested" />)
            ) : (
              <p className="text-xs text-slate-500 italic">No suggestions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordSuggestions;
