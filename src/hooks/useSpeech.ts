import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
  toggle: () => void;
  speaking: boolean;
  enabled: boolean;
  available: boolean;
}

export function useSpeech(): UseSpeechReturn {
  const [speaking, setSpeaking] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [available, setAvailable] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check if speech synthesis is available
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setAvailable(true);

      // Load enabled state from localStorage
      const savedEnabled = localStorage.getItem('tts-enabled');
      setEnabled(savedEnabled === 'true');

      // Wait for voices to load
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setVoicesLoaded(true);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  // Get best French voice
  const getFrenchVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (!available || !voicesLoaded) return null;

    const voices = window.speechSynthesis.getVoices();

    // Priority order: Google French > Microsoft French > Any French > Default
    const priorities = [
      (v: SpeechSynthesisVoice) => v.lang.startsWith('fr') && v.name.includes('Google'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('fr') && v.name.includes('Microsoft'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('fr') && v.name.includes('Enhanced'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('fr'),
    ];

    for (const priority of priorities) {
      const voice = voices.find(priority);
      if (voice) return voice;
    }

    return null;
  }, [available, voicesLoaded]);

  // Speak text
  const speak = useCallback((text: string) => {
    if (!available || !enabled || !voicesLoaded) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = getFrenchVoice();

      if (voice) {
        utterance.voice = voice;
      }

      utterance.lang = 'fr-FR';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;

      utterance.onstart = () => {
        setSpeaking(true);
      };

      utterance.onend = () => {
        setSpeaking(false);
        utteranceRef.current = null;
      };

      utterance.onerror = (event) => {
        console.warn('Speech synthesis error:', event.error);
        setSpeaking(false);
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Failed to speak:', error);
      setSpeaking(false);
    }
  }, [available, enabled, voicesLoaded, getFrenchVoice]);

  // Stop speaking
  const stop = useCallback(() => {
    if (!available) return;

    try {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      utteranceRef.current = null;
    } catch (error) {
      console.error('Failed to stop speech:', error);
    }
  }, [available]);

  // Toggle enabled state
  const toggle = useCallback(() => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    localStorage.setItem('tts-enabled', newEnabled.toString());

    // Stop speaking when disabling
    if (!newEnabled && speaking) {
      stop();
    }
  }, [enabled, speaking, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (available) {
        window.speechSynthesis.cancel();
      }
    };
  }, [available]);

  return {
    speak,
    stop,
    toggle,
    speaking,
    enabled,
    available,
  };
}
