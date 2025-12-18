// src/hooks/useSpeechRecognition.js
import { useState, useEffect, useRef } from "react";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;      // Keep listening even if user pauses
      recognition.interimResults = true;  // Show text while speaking
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript(""); // Clear old text on new session
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, transcript, startListening, stopListening };
}