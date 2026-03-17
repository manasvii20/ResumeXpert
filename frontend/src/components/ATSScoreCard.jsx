import React from 'react';

const ATSScoreCard = ({ atsScore, matchScore }) => {
  const getScoreColor = (score) => {
    if (score >= 75) return { ring: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', text: '#16a34a' };
    if (score >= 50) return { ring: '#eab308', bg: 'rgba(234, 179, 8, 0.1)', text: '#ca8a04' };
    return { ring: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', text: '#dc2626' };
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Work';
    return 'Poor';
  };

  const CircularScore = ({ score, label, size = 160 }) => {
    const colors = getScoreColor(score);
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(148, 163, 184, 0.15)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.ring}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                transition: 'stroke-dashoffset 1.5s ease-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold" style={{ color: colors.text }}>
              {score}
            </span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
              / 100
            </span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-200">{label}</p>
          <p className="text-xs font-medium mt-0.5" style={{ color: colors.text }}>
            {getScoreLabel(score)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
      <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
        Score Overview
      </h3>
      <div className="flex flex-wrap justify-center gap-12">
        <CircularScore score={atsScore} label="ATS Score" />
        <CircularScore score={matchScore} label="Job Match Score" />
      </div>
    </div>
  );
};

export default ATSScoreCard;
