import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';

const ResumeFeedback = ({ improvementSuggestions = [], formattingFeedback = [] }) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
        AI Suggestions
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Improvement Suggestions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-purple-400" />
            <h4 className="text-sm font-semibold text-purple-400">Improvement Suggestions</h4>
          </div>
          <div className="space-y-3">
            {improvementSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 hover:border-purple-500/30 transition-colors duration-200"
              >
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed">{suggestion}</p>
                </div>
              </div>
            ))}
            {improvementSuggestions.length === 0 && (
              <p className="text-xs text-slate-500 italic p-4">No suggestions available</p>
            )}
          </div>
        </div>

        {/* Formatting Feedback */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-amber-400" />
            <h4 className="text-sm font-semibold text-amber-400">Formatting Tips</h4>
          </div>
          <div className="space-y-3">
            {formattingFeedback.map((feedback, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 hover:border-amber-500/30 transition-colors duration-200"
              >
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed">{feedback}</p>
                </div>
              </div>
            ))}
            {formattingFeedback.length === 0 && (
              <p className="text-xs text-slate-500 italic p-4">No formatting issues detected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeFeedback;
