/**
 * Voice Input Hook
 *
 * Production-ready speech-to-text using Web Speech API.
 * Features:
 * - Real-time transcription with interim results
 * - Auto-restart on silence for continuous listening
 * - Browser compatibility detection
 * - Permission handling
 * - Error recovery
 */

import { useState, useCallback, useRef, useEffect } from 'react';

// Extend Window interface for SpeechRecognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onnomatch: ((this: SpeechRecognition, ev: Event) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export interface UseVoiceInputOptions {
  /** Language for speech recognition (default: 'en-US') */
  language?: string;
  /** Callback when final transcript is ready */
  onResult?: (transcript: string) => void;
  /** Callback for interim (in-progress) results */
  onInterimResult?: (transcript: string) => void;
  /** Callback when recording starts */
  onStart?: () => void;
  /** Callback when recording ends */
  onEnd?: () => void;
  /** Callback on error */
  onError?: (error: string) => void;
  /** Auto-submit after silence (ms), 0 to disable */
  autoSubmitDelay?: number;
}

export interface UseVoiceInputReturn {
  /** Whether voice input is supported in this browser */
  isSupported: boolean;
  /** Whether currently recording */
  isListening: boolean;
  /** Current transcript (interim + final) */
  transcript: string;
  /** Final confirmed transcript */
  finalTranscript: string;
  /** Interim (in-progress) transcript */
  interimTranscript: string;
  /** Start listening */
  startListening: () => void;
  /** Stop listening */
  stopListening: () => void;
  /** Toggle listening state */
  toggleListening: () => void;
  /** Clear the transcript */
  clearTranscript: () => void;
  /** Error message if any */
  error: string | null;
  /** Whether microphone permission is granted */
  hasPermission: boolean | null;
  /** Request microphone permission */
  requestPermission: () => Promise<boolean>;
}

/**
 * Check if Speech Recognition is supported
 */
function isSpeechRecognitionSupported(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)
  );
}

/**
 * Get SpeechRecognition constructor
 */
function getSpeechRecognition(): (new () => SpeechRecognition) | null {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function useVoiceInput({
  language = 'en-US',
  onResult,
  onInterimResult,
  onStart,
  onEnd,
  onError,
  autoSubmitDelay = 1500,
}: UseVoiceInputOptions = {}): UseVoiceInputReturn {
  const [isSupported] = useState(() => isSpeechRecognitionSupported());
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const autoSubmitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isManualStopRef = useRef(false);
  const finalTranscriptRef = useRef(''); // Track final transcript to avoid stale closure

  // Clear auto-submit timer
  const clearAutoSubmitTimer = useCallback(() => {
    if (autoSubmitTimerRef.current) {
      clearTimeout(autoSubmitTimerRef.current);
      autoSubmitTimerRef.current = null;
    }
  }, []);

  // Initialize recognition instance
  const initRecognition = useCallback(() => {
    const SpeechRecognitionClass = getSpeechRecognition();
    if (!SpeechRecognitionClass) return null;

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      onStart?.();
    };

    recognition.onend = () => {
      setIsListening(false);
      clearAutoSubmitTimer();

      // If not manually stopped and we have transcript, call onResult
      // Use ref to avoid stale closure issue
      if (!isManualStopRef.current && finalTranscriptRef.current.trim()) {
        onResult?.(finalTranscriptRef.current.trim());
      }

      onEnd?.();
      isManualStopRef.current = false;
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;

        if (result.isFinal) {
          final += text;
        } else {
          interim += text;
        }
      }

      // Update final transcript (accumulate)
      if (final) {
        setFinalTranscript(prev => {
          const newFinal = prev + final;
          finalTranscriptRef.current = newFinal; // Keep ref in sync
          // Reset auto-submit timer on new final result
          clearAutoSubmitTimer();
          if (autoSubmitDelay > 0) {
            autoSubmitTimerRef.current = setTimeout(() => {
              if (newFinal.trim()) {
                recognition.stop();
              }
            }, autoSubmitDelay);
          }
          return newFinal;
        });
      }

      setInterimTranscript(interim);
      onInterimResult?.(interim);

      // Update combined transcript using ref to avoid stale closure
      setTranscript(finalTranscriptRef.current + interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      let errorMessage = 'Speech recognition error';

      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.';
          break;
        case 'audio-capture':
          errorMessage = 'No microphone found. Please connect a microphone.';
          setHasPermission(false);
          break;
        case 'not-allowed':
          errorMessage = 'Microphone access denied. Please allow microphone access.';
          setHasPermission(false);
          break;
        case 'network':
          errorMessage = 'Network error. Please check your connection.';
          break;
        case 'aborted':
          // User aborted, not an error
          return;
        case 'service-not-allowed':
          errorMessage = 'Speech service not available. Please try again later.';
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }

      setError(errorMessage);
      setIsListening(false);
      onError?.(errorMessage);
    };

    recognition.onnomatch = () => {
      setError('Could not understand speech. Please try again.');
    };

    return recognition;
  }, [language, onStart, onEnd, onResult, onInterimResult, onError, autoSubmitDelay, clearAutoSubmitTimer]);

  // Request microphone permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately, we just wanted permission
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      return true;
    } catch (err) {
      setHasPermission(false);
      const errorMessage = err instanceof Error ? err.message : 'Microphone permission denied';
      setError(errorMessage);
      onError?.(errorMessage);
      return false;
    }
  }, [onError]);

  // Start listening
  const startListening = useCallback(async () => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser.');
      onError?.('Speech recognition is not supported in this browser.');
      return;
    }

    // Check/request permission first
    if (hasPermission === false) {
      const granted = await requestPermission();
      if (!granted) return;
    }

    // Stop any existing recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        // Ignore
      }
    }

    // Clear previous state
    setFinalTranscript('');
    setInterimTranscript('');
    setTranscript('');
    setError(null);
    isManualStopRef.current = false;
    finalTranscriptRef.current = '';

    // Create and start new recognition
    const recognition = initRecognition();
    if (recognition) {
      recognitionRef.current = recognition;
      try {
        recognition.start();
        setHasPermission(true);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to start speech recognition';
        setError(errorMessage);
        onError?.(errorMessage);
      }
    }
  }, [isSupported, hasPermission, requestPermission, initRecognition, onError]);

  // Stop listening
  const stopListening = useCallback(() => {
    clearAutoSubmitTimer();
    isManualStopRef.current = true;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors when stopping
      }
    }
    setIsListening(false);
  }, [clearAutoSubmitTimer]);

  // Toggle listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Clear transcript
  const clearTranscript = useCallback(() => {
    setTranscript('');
    setFinalTranscript('');
    setInterimTranscript('');
    finalTranscriptRef.current = '';
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAutoSubmitTimer();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // Ignore
        }
      }
    };
  }, [clearAutoSubmitTimer]);

  // Check permission on mount
  useEffect(() => {
    if (isSupported && hasPermission === null) {
      navigator.permissions?.query({ name: 'microphone' as PermissionName })
        .then(result => {
          setHasPermission(result.state === 'granted');
        })
        .catch(() => {
          // Permission API not supported, we'll check when user tries to use it
        });
    }
  }, [isSupported, hasPermission]);

  return {
    isSupported,
    isListening,
    transcript,
    finalTranscript,
    interimTranscript,
    startListening,
    stopListening,
    toggleListening,
    clearTranscript,
    error,
    hasPermission,
    requestPermission,
  };
}
