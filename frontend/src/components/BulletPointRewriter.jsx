import React, { useState } from 'react';
import { RefreshCw, Copy, Check, ArrowRight } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import toast from 'react-hot-toast';

const BulletPointRewriter = ({ rewrittenBullets = [] }) => {
  const [customBullet, setCustomBullet] = useState('');
  const [customContext, setCustomContext] = useState('');
  const [rewriteResult, setRewriteResult] = useState(null);
  const [isRewriting, setIsRewriting] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleRewrite = async () => {
    if (!customBullet.trim()) {
      toast.error('Please enter a bullet point to rewrite');
      return;
    }

    setIsRewriting(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AI.REWRITE_BULLET, {
        bulletPoint: customBullet,
        context: customContext,
      });

      if (response.data.success) {
        setRewriteResult(response.data.data);
      } else {
        toast.error(response.data.error || 'Failed to rewrite');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to rewrite bullet point');
    } finally {
      setIsRewriting(false);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
        Bullet Point Rewriter
      </h3>

      {/* AI-rewritten bullets from analysis */}
      {rewrittenBullets.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">
            AI-Improved Bullet Points
          </h4>
          <div className="space-y-4">
            {rewrittenBullets.map((bullet, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30 hover:border-purple-500/20 transition-colors"
              >
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-red-400/80 font-semibold">
                      Original
                    </span>
                    <p className="text-sm text-slate-400 mt-1 line-through decoration-red-400/30">
                      {bullet.original}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <ArrowRight size={14} />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">
                      Improved
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm text-emerald-300 leading-relaxed flex-1">
                      {bullet.improved}
                    </p>
                    <button
                      onClick={() => handleCopy(bullet.improved, index)}
                      className="flex-shrink-0 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
                      title="Copy improved version"
                    >
                      {copiedIndex === index ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom bullet point rewriter */}
      <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
        <h4 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">
          Rewrite Your Own Bullet Point
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Bullet Point</label>
            <textarea
              value={customBullet}
              onChange={(e) => setCustomBullet(e.target.value)}
              placeholder="e.g., Worked on backend APIs"
              className="w-full h-20 bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Context (optional)</label>
            <input
              type="text"
              value={customContext}
              onChange={(e) => setCustomContext(e.target.value)}
              placeholder="e.g., Software Engineer at a fintech startup"
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25"
            />
          </div>
          <button
            onClick={handleRewrite}
            disabled={isRewriting || !customBullet.trim()}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold rounded-lg hover:from-purple-500 hover:to-fuchsia-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={14} className={isRewriting ? 'animate-spin' : ''} />
            {isRewriting ? 'Rewriting...' : 'Rewrite'}
          </button>
        </div>

        {rewriteResult && (
          <div className="mt-5 bg-slate-900/50 rounded-xl p-5 border border-emerald-500/20">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-red-400/80 font-semibold">
                  Original
                </span>
                <p className="text-sm text-slate-400 mt-1">{rewriteResult.original}</p>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <ArrowRight size={14} />
                <span className="text-[10px] uppercase tracking-wider font-semibold">
                  Improved
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-emerald-300 leading-relaxed flex-1">
                  {rewriteResult.improved}
                </p>
                <button
                  onClick={() => handleCopy(rewriteResult.improved, 'custom')}
                  className="flex-shrink-0 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
                  title="Copy improved version"
                >
                  {copiedIndex === 'custom' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulletPointRewriter;
