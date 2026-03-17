import React from 'react';

const ResumeQualityDashboard = ({ atsScore, metrics }) => {
  const allMetrics = [
    { label: 'ATS Score', value: atsScore, color: '#a855f7' },
    { label: 'Keyword Coverage', value: metrics?.keyword_coverage || 0, color: '#3b82f6' },
    { label: 'Bullet Strength', value: metrics?.bullet_strength || 0, color: '#f59e0b' },
    { label: 'Skills Coverage', value: metrics?.skills_coverage || 0, color: '#22c55e' },
    { label: 'Formatting Score', value: metrics?.formatting_score || 0, color: '#ef4444' },
  ];

  const getBarLabel = (value) => {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    if (value >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
      <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
        Resume Quality Dashboard
      </h3>

      <div className="space-y-6">
        {allMetrics.map((metric, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">{metric.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">{getBarLabel(metric.value)}</span>
                <span className="text-sm font-bold" style={{ color: metric.color }}>
                  {metric.value}%
                </span>
              </div>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${metric.value}%`,
                  background: `linear-gradient(90deg, ${metric.color}80, ${metric.color})`,
                  boxShadow: `0 0 12px ${metric.color}40`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeQualityDashboard;
