/**
 * Voice Input Bar Component
 *
 * ChatGPT-style voice recording input with:
 * - Pill-shaped container
 * - Real-time audio waveform visualization
 * - Cancel (X) and Submit (checkmark) buttons
 * - Visual feedback showing transcribed text
 */

import React, { useEffect, useRef, useState } from 'react';
import { X, Check, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceInputBarProps {
  /** Whether currently recording */
  isRecording: boolean;
  /** Current transcript text */
  transcript?: string;
  /** Called when user cancels recording */
  onCancel: () => void;
  /** Called when user confirms the recording */
  onConfirm: () => void;
  /** Custom class name */
  className?: string;
}

// Number of bars in the waveform
const BAR_COUNT = 32;
// Smoothing factor for audio levels (0-1, higher = smoother)
const SMOOTHING = 0.7;

export function VoiceInputBar({
  isRecording,
  transcript,
  onCancel,
  onConfirm,
  className,
}: VoiceInputBarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const previousLevelsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0));
  const [audioLevel, setAudioLevel] = useState(0);

  // Cleanup function
  const cleanup = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    previousLevelsRef.current = new Array(BAR_COUNT).fill(0);
  };

  // Setup audio visualization
  useEffect(() => {
    if (!isRecording) {
      cleanup();
      return;
    }

    // Start audio visualization
    const setupAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          }
        });
        streamRef.current = stream;

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = SMOOTHING;
        analyserRef.current = analyser;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        // Start animation
        drawWaveform();
      } catch (err) {
        console.warn('Failed to access microphone for visualization:', err);
        // Fallback to simple animation if mic access fails
        drawSimpleWaveform();
      }
    };

    setupAudio();

    return cleanup;
  }, [isRecording]);

  // Draw real audio waveform with frequency data
  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isRecording || !analyserRef.current) return;
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      const width = canvas.width;
      const height = canvas.height;
      const barWidth = 3;
      const gap = 3;
      const totalWidth = BAR_COUNT * (barWidth + gap) - gap;
      const startX = (width - totalWidth) / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Calculate average audio level for overall feedback
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const avgLevel = sum / bufferLength / 255;
      setAudioLevel(avgLevel);

      // Draw bars symmetrically from center
      for (let i = 0; i < BAR_COUNT; i++) {
        // Map bar index to frequency bin (focus on voice frequencies)
        const frequencyIndex = Math.floor((i / BAR_COUNT) * (bufferLength * 0.7)) + Math.floor(bufferLength * 0.1);
        const value = dataArray[frequencyIndex] || 0;

        // Smooth the transitions
        const normalizedValue = value / 255;
        const prevLevel = previousLevelsRef.current[i];
        const smoothedValue = prevLevel * 0.6 + normalizedValue * 0.4;
        previousLevelsRef.current[i] = smoothedValue;

        // Calculate bar height with minimum
        const minHeight = 4;
        const maxHeight = height * 0.85;
        const barHeight = Math.max(minHeight, smoothedValue * maxHeight);

        const x = startX + i * (barWidth + gap);

        // Color based on audio level - more vibrant when speaking
        const intensity = Math.min(1, smoothedValue * 2);
        const hue = 220 - intensity * 20; // Blue to slightly purple
        const saturation = 70 + intensity * 30;
        const lightness = 45 + intensity * 15;

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        // Draw rounded bar centered vertically
        ctx.beginPath();
        ctx.roundRect(x, centerY - barHeight / 2, barWidth, barHeight, barWidth / 2);
        ctx.fill();
      }
    };

    draw();
  };

  // Simple animated waveform (fallback when mic access fails)
  const drawSimpleWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const draw = () => {
      if (!isRecording) return;
      animationRef.current = requestAnimationFrame(draw);

      const width = canvas.width;
      const height = canvas.height;
      const barWidth = 3;
      const gap = 3;
      const totalWidth = BAR_COUNT * (barWidth + gap) - gap;
      const startX = (width - totalWidth) / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      phase += 0.08;

      for (let i = 0; i < BAR_COUNT; i++) {
        // Create organic wave effect
        const wave1 = Math.sin(phase + i * 0.2) * 0.4 + 0.5;
        const wave2 = Math.sin(phase * 1.3 + i * 0.15) * 0.3 + 0.5;
        const wave3 = Math.sin(phase * 0.7 + i * 0.25) * 0.2 + 0.5;
        const combined = (wave1 + wave2 + wave3) / 3;

        const minHeight = 4;
        const maxHeight = height * 0.7;
        const barHeight = Math.max(minHeight, combined * maxHeight);

        const x = startX + i * (barWidth + gap);

        // Gradient blue color
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.roundRect(x, centerY - barHeight / 2, barWidth, barHeight, barWidth / 2);
        ctx.fill();
      }
    };

    draw();
  };

  if (!isRecording) return null;

  const hasTranscript = transcript && transcript.trim().length > 0;

  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-3',
        'bg-white rounded-2xl border border-gray-200 shadow-lg',
        'animate-in fade-in zoom-in-95 duration-200',
        className
      )}
    >
      {/* Recording indicator and transcript preview */}
      <div className="flex items-center gap-3 px-2">
        {/* Pulsing mic indicator */}
        <div className={cn(
          'relative flex items-center justify-center',
          'w-8 h-8 rounded-full bg-red-100',
        )}>
          <div className={cn(
            'absolute inset-0 rounded-full bg-red-400',
            'animate-ping opacity-30'
          )} />
          <Mic className="w-4 h-4 text-red-500 relative z-10" />
        </div>

        {/* Transcript preview or listening indicator */}
        <div className="flex-1 min-w-0">
          {hasTranscript ? (
            <p className="text-sm text-gray-700 truncate">
              {transcript}
            </p>
          ) : (
            <p className="text-sm text-gray-400 animate-pulse">
              Listening...
            </p>
          )}
        </div>
      </div>

      {/* Waveform and controls row */}
      <div className="flex items-center gap-2">
        {/* Cancel button */}
        <button
          type="button"
          onClick={onCancel}
          className={cn(
            'flex items-center justify-center',
            'w-10 h-10 rounded-full',
            'text-gray-500 hover:text-red-600',
            'hover:bg-red-50',
            'transition-all duration-150',
            'active:scale-95'
          )}
          title="Cancel recording"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Waveform container */}
        <div className="flex-1 flex items-center justify-center px-2">
          <canvas
            ref={canvasRef}
            width={240}
            height={48}
            className="w-full max-w-[240px] h-12"
          />
        </div>

        {/* Confirm button */}
        <button
          type="button"
          onClick={onConfirm}
          disabled={!hasTranscript}
          className={cn(
            'flex items-center justify-center',
            'w-10 h-10 rounded-full',
            'transition-all duration-150',
            'active:scale-95',
            hasTranscript
              ? 'text-white bg-primary hover:bg-primary/90 shadow-md'
              : 'text-gray-400 bg-gray-100 cursor-not-allowed'
          )}
          title={hasTranscript ? 'Done - add to input' : 'Speak to enable'}
        >
          <Check className="w-5 h-5" />
        </button>
      </div>

      {/* Visual audio level indicator */}
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden mx-2">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-primary transition-all duration-75 rounded-full"
          style={{
            width: `${Math.min(100, audioLevel * 200)}%`,
            opacity: audioLevel > 0.05 ? 1 : 0.3
          }}
        />
      </div>
    </div>
  );
}

export default VoiceInputBar;
