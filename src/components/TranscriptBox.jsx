// src/components/TranscriptBox.jsx
import { Copy, Volume2 } from "lucide-react";

export default function TranscriptBox({ title, text, isLoading, onSpeak }) {
  
  const handleCopy = () => {
    if(text) navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <div className="flex gap-2">
          {onSpeak && (
            <button 
              onClick={() => onSpeak(text)}
              disabled={!text}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-30"
              title="Read Aloud"
            >
              <Volume2 className="w-4 h-4 text-gray-600" />
            </button>
          )}
          <button 
            onClick={handleCopy}
            disabled={!text}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-30"
            title="Copy Text"
          >
            <Copy className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-1 p-4 min-h-[200px] bg-white">
        {isLoading ? (
          <div className="flex items-center gap-2 text-gray-400 animate-pulse">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
          </div>
        ) : (
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {text || <span className="text-gray-300 italic">Waiting for input...</span>}
          </p>
        )}
      </div>
    </div>
  );
}