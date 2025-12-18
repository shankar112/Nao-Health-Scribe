// src/components/AudioControls.jsx
import { Mic, MicOff, Languages } from "lucide-react";

export default function AudioControls({ isListening, onToggle, language, setLanguage }) {
  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      
      {/* Language Selector */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <Languages className="text-blue-600 w-5 h-5" />
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Hindi">Hindi</option>
          <option value="Japanese">Japanese</option>
          <option value="Tamil">Tamil</option>
        </select>
      </div>

      {/* Main Mic Button */}
      <button
        onClick={onToggle}
        className={`relative group flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 shadow-lg
          ${isListening 
            ? "bg-red-500 hover:bg-red-600 shadow-red-500/30 animate-pulse" 
            : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/30"
          }`}
      >
        {isListening ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </button>
      
      <p className="text-sm font-medium text-gray-500">
        {isListening ? "Listening... (Speak now)" : "Tap to Start"}
      </p>
    </div>
  );
}