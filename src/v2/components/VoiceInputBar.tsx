/**
 * Voice Input Bar Component
 *
 * ChatGPT-style voice recording input with:
 * - Smooth animated waveform visualization
 * - Real-time audio level feedback
 * - Elegant transitions and animations
 * - Cancel and Confirm actions
 * - Transcript preview with interim results
 */

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { X, Check, Mic, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceInputBarProps {
  /** Whether currently recording */
  isRecording: boolean;
  /** Whether connected to speech service */
  isConnected?: boolean;
  /** Current transcript text (final) */
  transcript?: string;
  /** Interim (in-progress) transcript */
  interimTranscript?: string;
  /** Audio level for visualization (0-1) */
  audioLevel?: number;
  /** Called when user cancels recording */
  onCancel: () => void;
  /** Called when user confirms the recording */
  onConfirm: () => void;
  /** Custom class name */
  className?: string;
}

// Number of bars in the waveform
const BAR_COUNT = 40;

// Waveform colors - Blue theme (matching website)
const COLORS = {
  idle: { h: 217, s: 91, l: 60 },       // Primary blue
  active: { h: 221, s: 83, l: 53 },     // Deeper blue
  peak: { h: 213, s: 94, l: 68 },       // Bright blue
};

export function VoiceInputBar({
  isRecording,
  isConnected = false,
  transcript,
  interimTranscript,
  audioLevel = 0,
  onCancel,
  onConfirm,
  className,
}: VoiceInputBarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const barsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0));
  const targetBarsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0));
  const phaseRef = useRef(0);
  const audioLevelRef = useRef(0);

  // Memoize display transcript
  const displayTranscript = useMemo(() => {
    if (transcript && interimTranscript) {
      return { final: transcript, interim: interimTranscript };
    }
    return { final: transcript || '', interim: interimTranscript || '' };
  }, [transcript, interimTranscript]);

  const hasTranscript = (displayTranscript.final + displayTranscript.interim).trim().length > 0;

  // Update audio level ref
  useEffect(() => {
    audioLevelRef.current = audioLevel;
  }, [audioLevel]);

  // Generate target bar heights based on audio level
  const updateTargetBars = useCallback(() => {
    const level = audioLevelRef.current;
    const normalizedLevel = Math.min(1, level * 4); // Amplify for visibility

    for (let i = 0; i < BAR_COUNT; i++) {
      // Create organic wave pattern
      const centerOffset = Math.abs(i - BAR_COUNT / 2) / (BAR_COUNT / 2);
      const wavePhase = phaseRef.current + i * 0.15;

      // Multiple sine waves for organic feel
      const wave1 = Math.sin(wavePhase) * 0.3;
      const wave2 = Math.sin(wavePhase * 1.7 + 0.5) * 0.2;
      const wave3 = Math.sin(wavePhase * 0.6 + 1) * 0.15;

      // Combine waves with audio level
      const baseHeight = 0.15 + (wave1 + wave2 + wave3 + 0.65) * 0.5;
      const audioInfluence = normalizedLevel * (1 - centerOffset * 0.3);

      // More responsive to audio
      const targetHeight = baseHeight * (0.3 + audioInfluence * 0.7);

      targetBarsRef.current[i] = Math.max(0.1, Math.min(1, targetHeight));
    }

    phaseRef.current += 0.08;
  }, []);

  // Smooth animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Update target bars
    updateTargetBars();

    // Smooth interpolation
    for (let i = 0; i < BAR_COUNT; i++) {
      const diff = targetBarsRef.current[i] - barsRef.current[i];
      barsRef.current[i] += diff * 0.15; // Smooth easing
    }

    // Canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Set canvas size for retina displays
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    // Clear canvas
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Calculate bar dimensions
    const totalGap = (BAR_COUNT - 1) * 2;
    const availableWidth = displayWidth - 16; // Padding
    const barWidth = Math.max(2, (availableWidth - totalGap) / BAR_COUNT);
    const gap = 2;
    const startX = (displayWidth - (barWidth * BAR_COUNT + gap * (BAR_COUNT - 1))) / 2;
    const centerY = displayHeight / 2;
    const maxBarHeight = displayHeight * 0.8;

    // Draw bars
    for (let i = 0; i < BAR_COUNT; i++) {
      const barHeight = Math.max(4, barsRef.current[i] * maxBarHeight);
      const x = startX + i * (barWidth + gap);

      // Color based on height and position
      const intensity = barsRef.current[i];
      const centerOffset = 1 - Math.abs(i - BAR_COUNT / 2) / (BAR_COUNT / 2);

      // Interpolate between colors based on intensity
      const h = COLORS.idle.h + (COLORS.active.h - COLORS.idle.h) * intensity * centerOffset;
      const s = COLORS.idle.s + (COLORS.peak.s - COLORS.idle.s) * intensity;
      const l = COLORS.idle.l + (COLORS.peak.l - COLORS.idle.l) * intensity * 0.5;

      // Create gradient for each bar
      const gradient = ctx.createLinearGradient(x, centerY - barHeight / 2, x, centerY + barHeight / 2);
      gradient.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, 0.9)`);
      gradient.addColorStop(0.5, `hsla(${h + 20}, ${s}%, ${l + 5}%, 1)`);
      gradient.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0.9)`);

      ctx.fillStyle = gradient;

      // Draw rounded bar
      const radius = barWidth / 2;
      ctx.beginPath();
      ctx.roundRect(x, centerY - barHeight / 2, barWidth, barHeight, radius);
      ctx.fill();
    }

    // Continue animation
    if (isRecording) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [isRecording, updateTargetBars]);

  // Start/stop animation
  useEffect(() => {
    if (isRecording) {
      // Reset bars
      barsRef.current = new Array(BAR_COUNT).fill(0.15);
      targetBarsRef.current = new Array(BAR_COUNT).fill(0.15);
      phaseRef.current = 0;

      // Start animation
      animate();
    } else {
      // Stop animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isRecording, animate]);

  if (!isRecording) return null;

  return (
    <div
      className={cn(
        'flex flex-col gap-3 p-4',
        'bg-white/95 backdrop-blur-xl rounded-2xl',
        'border border-gray-200/80 shadow-xl shadow-black/5',
        'animate-in fade-in slide-in-from-bottom-4 duration-300',
        className
      )}
    >
      {/* Status and transcript row */}
      <div className="flex items-start gap-3 px-1">
        {/* Animated recording indicator */}
        <div className="relative flex-shrink-0">
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center',
            'bg-gradient-to-br from-red-500 to-rose-600',
            'shadow-lg shadow-red-500/30',
          )}>
            <Mic className="w-5 h-5 text-white" />
          </div>
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" />
          <div
            className="absolute inset-0 rounded-full bg-red-400 animate-pulse opacity-30"
            style={{ animationDelay: '150ms' }}
          />
        </div>

        {/* Transcript or listening indicator */}
        <div className="flex-1 min-w-0 pt-1">
          {hasTranscript ? (
            <div className="space-y-1">
              <p className="text-sm text-gray-800 leading-relaxed">
                {displayTranscript.final}
                {displayTranscript.interim && (
                  <span className="text-gray-400 italic"> {displayTranscript.interim}</span>
                )}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">
                {isConnected ? 'Listening...' : 'Connecting...'}
              </p>
              {!isConnected && (
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Waveform visualization */}
      <div className="relative h-16 mx-1">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: 'crisp-edges' }}
        />

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/20 via-transparent to-white/20 rounded-lg" />
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-4">
        {/* Cancel button */}
        <button
          type="button"
          onClick={onCancel}
          className={cn(
            'flex items-center justify-center gap-2 px-5 py-2.5',
            'rounded-full text-sm font-medium',
            'text-gray-600 bg-gray-100 hover:bg-gray-200',
            'transition-all duration-150',
            'active:scale-95',
          )}
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>

        {/* Stop/Confirm button */}
        <button
          type="button"
          onClick={onConfirm}
          className={cn(
            'flex items-center justify-center gap-2 px-6 py-2.5',
            'rounded-full text-sm font-medium',
            'transition-all duration-150',
            'active:scale-95',
            hasTranscript
              ? 'text-white bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg shadow-primary/25'
              : 'text-white bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-lg shadow-red-500/25'
          )}
        >
          {hasTranscript ? (
            <>
              <Check className="w-4 h-4" />
              <span>Done</span>
            </>
          ) : (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </>
          )}
        </button>
      </div>

      {/* Audio level indicator bar */}
      <div className="h-1 mx-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary via-blue-500 to-blue-400 rounded-full transition-all duration-75"
          style={{
            width: `${Math.min(100, audioLevel * 300)}%`,
            opacity: audioLevel > 0.02 ? 1 : 0.3,
          }}
        />
      </div>
    </div>
  );
}

export default VoiceInputBar;
