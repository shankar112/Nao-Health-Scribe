// src/app/page.js
"use client";

import { useState, useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import AudioControls from "@/components/AudioControls";
import TranscriptBox from "@/components/TranscriptBox";

export default function Home() {
  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();
  
  const [targetLanguage, setTargetLanguage] = useState("Spanish");
  const [processedData, setProcessedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-process when the user stops speaking
  useEffect(() => {
    if (!isListening && transcript.length > 2) {
      handleProcessTranscript();
    }
  }, [isListening, transcript]);

  const handleProcessTranscript = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/scribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript, targetLanguage }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setProcessedData(data);
    } catch (error) {
      console.error("Processing failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSpeak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLanguage === "Spanish" ? "es-ES" : "en-US"; // Simple mapping
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Medical Scribe <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-gray-500">Real-time transcription & translation for healthcare</p>
        </div>

        {/* Controls */}
        <AudioControls 
          isListening={isListening} 
          onToggle={isListening ? stopListening : startListening}
          language={targetLanguage}
          setLanguage={setTargetLanguage}
        />

        {/* Display Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Original / Corrected */}
          <TranscriptBox 
            title="Original Transcript (AI Corrected)"
            text={processedData?.correctedText || transcript}
            isLoading={isListening} // Show loading dots while listening
          />

          {/* Right: Translated */}
          <TranscriptBox 
            title={`Translated (${targetLanguage})`}
            text={processedData?.translatedText}
            isLoading={isProcessing} // Show loading dots while fetching API
            onSpeak={handleSpeak}
          />
        </div>

      </div>
    </main>
  );
}