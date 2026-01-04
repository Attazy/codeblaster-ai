import { TrendingUp, AlertTriangle, Shield, CheckCircle } from 'lucide-react';

interface StatsProps {
  data: {
    totalIssues: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    score: number;
  };
}

export default function Stats({ data }: StatsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-green-50 to-emerald-50 border-green-300';
    if (score >= 60) return 'from-yellow-50 to-orange-50 border-yellow-300';
    return 'from-red-50 to-pink-50 border-red-300';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {/* Score Card */}
      <div className={`bg-gradient-to-br ${getScoreBg(data.score)} rounded-xl shadow-elegant p-6 border-2 card-hover relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-12 -mt-12"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 bg-gradient-to-br ${getScoreGradient(data.score)} rounded-xl shadow-lg`}>
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Score</span>
          </div>
          <div className={`text-5xl font-black ${getScoreColor(data.score)} mb-1`}>
            {data.score}
          </div>
          <div className="text-xs text-gray-600 font-semibold">out of 100</div>
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getScoreGradient(data.score)} transition-all duration-1000`}
              style={{width: `${data.score}%`}}
            ></div>
          </div>
        </div>
      </div>

      {/* Critical Issues */}
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl shadow-elegant p-6 border-2 border-red-300 card-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 rounded-full -mr-12 -mt-12"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Critical</span>
          </div>
          <div className="text-5xl font-black text-red-600 mb-1">{data.critical}</div>
          <div className="text-xs text-gray-600 font-semibold">issues found</div>
        </div>
      </div>

      {/* High Issues */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-elegant p-6 border-2 border-orange-300 card-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 rounded-full -mr-12 -mt-12"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">High</span>
          </div>
          <div className="text-5xl font-black text-orange-600 mb-1">{data.high}</div>
          <div className="text-xs text-gray-600 font-semibold">issues found</div>
        </div>
      </div>

      {/* Medium Issues */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl shadow-elegant p-6 border-2 border-yellow-300 card-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 rounded-full -mr-12 -mt-12"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Medium</span>
          </div>
          <div className="text-5xl font-black text-yellow-600 mb-1">{data.medium}</div>
          <div className="text-xs text-gray-600 font-semibold">issues found</div>
        </div>
      </div>

      {/* Low Issues */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-elegant p-6 border-2 border-blue-300 card-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 rounded-full -mr-12 -mt-12"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Low</span>
          </div>
          <div className="text-5xl font-black text-blue-600 mb-1">{data.low}</div>
          <div className="text-xs text-gray-600 font-semibold">issues found</div>
        </div>
      </div>
    </div>
  );
}
