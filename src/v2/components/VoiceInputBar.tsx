/**
 * Voice Input Bar Component
 *
 * ChatGPT-style voice recording input with:
 * - Pill-shaped container
 * - Animated waveform in center
 * - Plus button on left (to add more)
 * - Cancel (X) and Submit (checkmark) buttons on right
 */

import React, { useEffect, useRef } from 'react';
import { X, Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceInputBarProps {
  /** Whether currently recording */
  isRecording: boolean;
  /** Current transcript text (optional, for preview) */
  transcript?: string;
  /** Called when user cancels recording */
  onCancel: () => void;
  /** Called when user confirms/submits the recording */
  onConfirm: () => void;
  /** Optional: Called when user wants to add more (plus button) */
  onAddMore?: () => void;
  /** Custom class name */
  className?: string;
}

export function VoiceInputBar({
  isRecording,
  transcript,
  onCancel,
  onConfirm,
  onAddMore,
  className,
}: VoiceInputBarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Setup audio visualization
  useEffect(() => {
    if (!isRecording) {
      // Cleanup when not recording
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      return;
    }

    // Start audio visualization
    const setupAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 128;
        analyserRef.current = analyser;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        // Start animation
        drawWaveform();
      } catch (err) {
        // Fallback to simple animation if mic access fails
        drawSimpleWaveform();
      }
    };

    setupAudio();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording]);

  // Draw real audio waveform
  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isRecording) return;
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      const width = canvas.width;
      const height = canvas.height;
      const barWidth = 3;
      const gap = 2;
      const totalBars = Math.floor(width / (barWidth + gap));
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw bars from center
      for (let i = 0; i < totalBars; i++) {
        const dataIndex = Math.floor((i / totalBars) * bufferLength);
        const value = dataArray[dataIndex] || 0;
        const barHeight = Math.max(4, (value / 255) * (height * 0.8));

        const x = i * (barWidth + gap);

        // Draw bar (centered vertically)
        ctx.fillStyle = '#6b7280';
        ctx.beginPath();
        ctx.roundRect(x, centerY - barHeight / 2, barWidth, barHeight, 1.5);
        ctx.fill();
      }
    };

    draw();
  };

  // Simple animated waveform (fallback)
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
      const gap = 2;
      const totalBars = Math.floor(width / (barWidth + gap));
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      phase += 0.1;

      for (let i = 0; i < totalBars; i++) {
        // Create wave effect
        const wave1 = Math.sin(phase + i * 0.3) * 0.5 + 0.5;
        const wave2 = Math.sin(phase * 1.5 + i * 0.2) * 0.3 + 0.5;
        const combined = (wave1 + wave2) / 2;
        const barHeight = Math.max(4, combined * height * 0.7);

        const x = i * (barWidth + gap);

        ctx.fillStyle = '#6b7280';
        ctx.beginPath();
        ctx.roundRect(x, centerY - barHeight / 2, barWidth, barHeight, 1.5);
        ctx.fill();
      }
    };

    draw();
  };

  if (!isRecording) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-2 p-2',
        'bg-white rounded-full border border-gray-200 shadow-lg',
        'animate-in fade-in zoom-in-95 duration-200',
        className
      )}
    >
      {/* Plus button (optional) */}
      {onAddMore && (
        <button
          type="button"
          onClick={onAddMore}
          className={cn(
            'flex items-center justify-center',
            'w-10 h-10 rounded-full',
            'text-gray-400 hover:text-gray-600',
            'hover:bg-gray-100',
            'transition-colors duration-150'
          )}
        >
          <Plus className="w-5 h-5" />
        </button>
      )}

      {/* Waveform container */}
      <div className="flex-1 flex items-center justify-center px-4 min-w-[200px]">
        <canvas
          ref={canvasRef}
          width={200}
          height={40}
          className="w-full max-w-[200px] h-10"
        />
      </div>

      {/* Cancel button */}
      <button
        type="button"
        onClick={onCancel}
        className={cn(
          'flex items-center justify-center',
          'w-10 h-10 rounded-full',
          'text-gray-500 hover:text-gray-700',
          'hover:bg-gray-100',
          'transition-colors duration-150'
        )}
        title="Cancel"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Confirm button */}
      <button
        type="button"
        onClick={onConfirm}
        disabled={!transcript?.trim()}
        className={cn(
          'flex items-center justify-center',
          'w-10 h-10 rounded-full',
          'text-gray-500 hover:text-gray-700',
          'hover:bg-gray-100',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'transition-colors duration-150'
        )}
        title="Submit"
      >
        <Check className="w-5 h-5" />
      </button>
    </div>
  );
}

export default VoiceInputBar;
