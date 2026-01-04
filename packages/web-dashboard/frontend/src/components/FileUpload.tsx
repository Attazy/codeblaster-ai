import { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, FileCode, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onReviewComplete: (data: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const API_URL = 'http://localhost:5000';

export default function FileUpload({ onReviewComplete, loading, setLoading }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    const allowedTypes = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go', '.rs', '.cpp', '.c', '.rb', '.php', '.cs', '.swift', '.kt'];
    const fileExt = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExt)) {
      setError('File type not supported. Please upload a code file.');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Read file content
      const reader = new FileReader();
      reader.onload = async (e) => {
        const code = e.target?.result as string;

        try {
          const response = await axios.post(`${API_URL}/api/review/analyze`, {
            code,
            filename: file.name,
            options: {
              consensus: false,
              securityScan: true
            }
          });

          if (response.data.success) {
            onReviewComplete(response.data.data);
          } else {
            setError(response.data.error || 'Analysis failed');
            setLoading(false);
          }
        } catch (err: any) {
          setError(err.response?.data?.error || 'Failed to analyze code');
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setError('Failed to read file');
        setLoading(false);
      };

      reader.readAsText(file);
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-elegant p-6 card-hover border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mr-3">
          <Upload className="text-white" size={20} />
        </div>
        Upload Code File
      </h2>

      {/* Drag & Drop Area */}
      <div
        className={`border-3 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg scale-105' 
            : 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 hover:border-purple-300 hover:bg-purple-50/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className={`transition-transform duration-300 ${dragActive ? 'scale-110' : ''}`}>
          <FileCode className={`w-20 h-20 mx-auto mb-4 ${dragActive ? 'text-purple-500' : 'text-gray-400'}`} />
        </div>
        
        {file ? (
          <div className="mb-4 p-4 bg-white rounded-lg shadow-soft border border-purple-200">
            <p className="text-base font-bold text-purple-700">{file.name}</p>
            <p className="text-sm text-gray-600 mt-1">
              {(file.size / 1024).toFixed(2)} KB • Ready to analyze
            </p>
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-gray-700 font-semibold mb-2 text-lg">Drag & drop your code file here</p>
            <p className="text-sm text-gray-500">or click the button below</p>
          </div>
        )}

        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={loading}
        >
          {file ? '📄 Choose Different File' : '📂 Browse Files'}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".js,.ts,.jsx,.tsx,.py,.java,.go,.rs,.cpp,.c,.rb,.php,.cs,.swift,.kt"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
        />
      </div>

      {/* Supported Languages */}
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <p className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-2">
          <span>✅</span> Supported Languages:
        </p>
        <div className="flex flex-wrap gap-2">
          {['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C/C++', 'Ruby', 'PHP', 'C#', 'Swift', 'Kotlin'].map((lang) => (
            <span key={lang} className="text-xs bg-white text-blue-700 px-3 py-1 rounded-full font-semibold border border-blue-200">
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-lg flex items-start animate-fade-in shadow-soft">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
          !file || loading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white hover:shadow-strong transform hover:scale-105 hover:shadow-purple-500/50'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Analyzing...
          </span>
        ) : (
          '🚀 Analyze Code with AI'
        )}
      </button>
    </div>
  );
}
