/**
 * Deepgram Voice Input Hook
 *
 * Production-ready speech-to-text using Deepgram via WebSocket.
 * Features:
 * - Real-time streaming transcription with interim results
 * - High accuracy with Nova-2 model
 * - Smart formatting (punctuation, capitalization)
 * - Cross-browser support
 * - Automatic reconnection
 * - Audio level monitoring for visualization
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { API_BASE_URL } from '@/services/api';
import { tokenManager } from '@/services';

// Audio configuration for optimal Deepgram performance
const AUDIO_CONFIG = {
  sampleRate: 16000,     // 16kHz for speech
  channelCount: 1,       // Mono
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
};

// Buffer size for audio chunks (100ms at 16kHz = 1600 samples * 2 bytes = 3200 bytes)
const BUFFER_SIZE = 4096;

export interface UseDeepgramVoiceOptions {
  /** Callback when final transcript is ready */
  onTranscript?: (transcript: string, isFinal: boolean) => void;
  /** Callback when recording starts */
  onStart?: () => void;
  /** Callback when recording ends */
  onEnd?: () => void;
  /** Callback on error */
  onError?: (error: string) => void;
  /** Callback for audio level (0-1) for visualization */
  onAudioLevel?: (level: number) => void;
  /** Callback when speech is detected */
  onSpeechStart?: () => void;
  /** Callback when utterance ends (pause in speech) */
  onUtteranceEnd?: () => void;
}

export interface UseDeepgramVoiceReturn {
  /** Whether voice input is available */
  isAvailable: boolean;
  /** Whether currently recording */
  isListening: boolean;
  /** Whether connected to Deepgram */
  isConnected: boolean;
  /** Current accumulated transcript */
  transcript: string;
  /** Interim (in-progress) transcript */
  interimTranscript: string;
  /** Start listening */
  startListening: () => Promise<void>;
  /** Stop listening */
  stopListening: () => void;
  /** Toggle listening state */
  toggleListening: () => void;
  /** Clear the transcript */
  clearTranscript: () => void;
  /** Current error message */
  error: string | null;
  /** Current audio level (0-1) for visualization */
  audioLevel: number;
}

/**
 * Get WebSocket URL for speech endpoint
 */
function getSpeechWebSocketUrl(): string {
  const baseUrl = API_BASE_URL || 'http://localhost:8080';
  const wsUrl = baseUrl.replace(/^http/, 'ws');
  const token = tokenManager.getAccessToken();
  return `${wsUrl}/api/speech/stream?token=${encodeURIComponent(token || '')}`;
}

/**
 * Convert Float32Array audio buffer to Int16Array (PCM)
 */
function floatTo16BitPCM(float32Array: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);

  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return buffer;
}

/**
 * Calculate RMS audio level from Float32Array
 */
function calculateAudioLevel(float32Array: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < float32Array.length; i++) {
    sum += float32Array[i] * float32Array[i];
  }
  return Math.sqrt(sum / float32Array.length);
}

export function useDeepgramVoice({
  onTranscript,
  onStart,
  onEnd,
  onError,
  onAudioLevel,
  onSpeechStart,
  onUtteranceEnd,
}: UseDeepgramVoiceOptions = {}): UseDeepgramVoiceReturn {
  const [isAvailable, setIsAvailable] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);

  // Refs for cleanup
  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const keepaliveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isStoppingRef = useRef(false);
  const transcriptRef = useRef('');

  // Cleanup function
  const cleanup = useCallback(() => {
    isStoppingRef.current = true;

    // Clear keepalive interval
    if (keepaliveIntervalRef.current) {
      clearInterval(keepaliveIntervalRef.current);
      keepaliveIntervalRef.current = null;
    }

    // Close WebSocket
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN) {
        try {
          wsRef.current.send(JSON.stringify({ type: 'close' }));
        } catch {
          // Ignore errors
        }
      }
      wsRef.current.close();
      wsRef.current = null;
    }

    // Stop audio processing
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    // Stop media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    setIsListening(false);
    setIsConnected(false);
    setAudioLevel(0);
  }, []);

  // Start listening
  const startListening = useCallback(async () => {
    // Check for auth token
    const token = tokenManager.getAccessToken();
    if (!token) {
      const errorMsg = 'Please sign in to use voice input';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Reset state
    setError(null);
    setTranscript('');
    setInterimTranscript('');
    transcriptRef.current = '';
    isStoppingRef.current = false;

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: AUDIO_CONFIG.sampleRate,
          channelCount: AUDIO_CONFIG.channelCount,
          echoCancellation: AUDIO_CONFIG.echoCancellation,
          noiseSuppression: AUDIO_CONFIG.noiseSuppression,
          autoGainControl: AUDIO_CONFIG.autoGainControl,
        },
      });

      mediaStreamRef.current = stream;

      // Set up audio context and processor
      const audioContext = new AudioContext({
        sampleRate: AUDIO_CONFIG.sampleRate,
      });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(BUFFER_SIZE, 1, 1);
      processorRef.current = processor;

      // Connect to WebSocket
      const wsUrl = getSpeechWebSocketUrl();
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('[Deepgram] WebSocket connected');
      };

      ws.onmessage = (event) => {
        if (isStoppingRef.current) return;

        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case 'ready':
              console.log('[Deepgram] Service ready');
              setIsConnected(true);
              setIsListening(true);
              onStart?.();

              // Start sending audio
              processor.onaudioprocess = (e) => {
                if (isStoppingRef.current || ws.readyState !== WebSocket.OPEN) return;

                const inputData = e.inputBuffer.getChannelData(0);

                // Calculate and report audio level
                const level = calculateAudioLevel(inputData);
                setAudioLevel(level);
                onAudioLevel?.(level);

                // Convert to PCM and send
                const pcmData = floatTo16BitPCM(inputData);
                ws.send(pcmData);
              };

              // Connect audio nodes
              source.connect(processor);
              processor.connect(audioContext.destination);

              // Start keepalive interval (every 8 seconds)
              keepaliveIntervalRef.current = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ type: 'keepalive' }));
                }
              }, 8000);
              break;

            case 'transcript':
              if (data.transcript) {
                if (data.isFinal) {
                  // Accumulate final transcript
                  transcriptRef.current += (transcriptRef.current ? ' ' : '') + data.transcript;
                  setTranscript(transcriptRef.current);
                  setInterimTranscript('');
                  onTranscript?.(data.transcript, true);
                } else {
                  // Update interim transcript
                  setInterimTranscript(data.transcript);
                  onTranscript?.(data.transcript, false);
                }
              }
              break;

            case 'speech_started':
              onSpeechStart?.();
              break;

            case 'utterance_end':
              onUtteranceEnd?.();
              break;

            case 'error':
              console.error('[Deepgram] Error:', data.message);
              setError(data.message);
              onError?.(data.message);
              break;

            case 'disconnected':
              console.log('[Deepgram] Disconnected');
              if (!isStoppingRef.current) {
                cleanup();
                onEnd?.();
              }
              break;
          }
        } catch (err) {
          console.error('[Deepgram] Error parsing message:', err);
        }
      };

      ws.onerror = (event) => {
        console.error('[Deepgram] WebSocket error:', event);
        const errorMsg = 'Connection error. Please try again.';
        setError(errorMsg);
        onError?.(errorMsg);
        cleanup();
      };

      ws.onclose = (event) => {
        console.log('[Deepgram] WebSocket closed:', event.code, event.reason);
        if (!isStoppingRef.current) {
          setIsConnected(false);
          setIsListening(false);
          onEnd?.();
        }
      };

    } catch (err) {
      console.error('[Deepgram] Error starting:', err);

      let errorMsg = 'Failed to access microphone';
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          errorMsg = 'Microphone access denied. Please allow microphone access.';
        } else if (err.name === 'NotFoundError') {
          errorMsg = 'No microphone found. Please connect a microphone.';
        }
      }

      setError(errorMsg);
      onError?.(errorMsg);
      cleanup();
    }
  }, [cleanup, onStart, onEnd, onError, onTranscript, onAudioLevel, onSpeechStart, onUtteranceEnd]);

  // Stop listening
  const stopListening = useCallback(() => {
    cleanup();
    onEnd?.();
  }, [cleanup, onEnd]);

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
    setInterimTranscript('');
    transcriptRef.current = '';
  }, []);

  // Check availability on mount
  useEffect(() => {
    const checkAvailability = async () => {
      // Check for MediaDevices API
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setIsAvailable(false);
        return;
      }

      // Check for AudioContext
      if (!window.AudioContext && !(window as any).webkitAudioContext) {
        setIsAvailable(false);
        return;
      }

      // Check for WebSocket
      if (!window.WebSocket) {
        setIsAvailable(false);
        return;
      }

      setIsAvailable(true);
    };

    checkAvailability();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    isAvailable,
    isListening,
    isConnected,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    toggleListening,
    clearTranscript,
    error,
    audioLevel,
  };
}

export default useDeepgramVoice;
