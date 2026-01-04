import { useState } from 'react';
import FileUpload from './components/FileUpload';
import ReviewResults from './components/ReviewResults';
import Stats from './components/Stats';

interface ReviewData {
  filename: string;
  language: string;
  stats: {
    totalIssues: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    score: number;
  };
  issues: any[];
  suggestions: any[];
  timestamp: string;
}

function App() {
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReviewComplete = (data: ReviewData) => {
    setReviewData(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white shadow-elegant relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-indigo-600/20"></div>
        <div className="container mx-auto px-6 py-8 relative z-10">
          <div className="flex items-center justify-between animate-fade-in-up">
            <div>
              <h1 className="text-5xl font-black mb-2 tracking-tight flex items-center gap-3">
                <span className="text-6xl">🚀</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                  CodeBlaster AI
                </span>
              </h1>
              <p className="text-blue-100 text-lg font-medium">Advanced AI-Powered Code Review Platform</p>
            </div>
            <div className="text-right bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
              <div className="text-sm text-blue-100 mb-1">Powered by</div>
              <div className="text-xl font-bold">GPT-4 + Claude + CodeLlama</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"></div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {/* Stats Section */}
        {reviewData && (
          <div className="animate-fade-in-up mb-8">
            <Stats data={reviewData.stats} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <FileUpload 
              onReviewComplete={handleReviewComplete}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-xl shadow-elegant p-12 text-center animate-fade-in">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 animate-spin"></div>
                  <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" style={{animationDuration: '1.5s'}}></div>
                </div>
                <p className="text-gray-700 text-xl font-semibold mb-2">🔍 Analyzing your code...</p>
                <p className="text-gray-500 text-sm">AI is reviewing your code for issues and improvements</p>
                <div className="mt-6 flex justify-center gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            ) : reviewData ? (
              <div className="animate-slide-in-right">
                <ReviewResults data={reviewData} />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-elegant p-16 text-center border-2 border-dashed border-gray-300">
                <div className="text-8xl mb-6 animate-pulse">📁</div>
                <h3 className="text-3xl font-bold text-gray-800 mb-3 gradient-text">No File Analyzed Yet</h3>
                <p className="text-gray-600 text-lg mb-6">Upload a code file to get started with AI-powered analysis</p>
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Security Scanning
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Code Quality
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Best Practices
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-16 py-8 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 border-t-4 border-purple-400">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white text-lg">
            Created with <span className="text-red-300 animate-pulse">❤️</span> by{' '}
            <span className="font-bold text-white bg-white/20 px-3 py-1 rounded-lg">attazy</span>
          </p>
          <p className="text-blue-200 text-sm mt-2">MIT License • v1.0.0 • © 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
