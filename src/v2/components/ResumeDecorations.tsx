/**
 * Resume Decorations Component
 *
 * Renders creative decorative elements (geometric shapes, accents, etc.)
 * based on template configuration. Inspired by modern creative resume designs.
 */

import React from 'react';
import type { DecorationsConfig, DecorationElement } from '../types/config';

interface ResumeDecorationsProps {
  config: DecorationsConfig;
  primaryColor: string;
  secondaryColor?: string;
  accentBackground?: string;
}

/**
 * Top accent line - gradient bar at top of resume
 */
const TopAccentLine: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '5px',
      background: `linear-gradient(90deg, ${color} 0%, ${color}90 50%, ${color}30 100%)`,
      opacity,
      zIndex: 10,
    }}
  />
);

/**
 * Diagonal Shape - Bold geometric shape like in the reference image
 * Creates a modern, creative look with a diagonal cutout
 */
const DiagonalShape: React.FC<{ primaryColor: string; secondaryColor: string; opacity: number }> = ({
  primaryColor,
  secondaryColor,
  opacity,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '45%',
      height: '320px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    <svg
      viewBox="0 0 400 320"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <defs>
        <linearGradient id="diagonalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.12 * opacity} />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity={0.06 * opacity} />
        </linearGradient>
      </defs>
      {/* Main diagonal shape */}
      <path
        d="M100,0 L400,0 L400,320 L0,320 Z"
        fill="url(#diagonalGradient)"
      />
    </svg>
  </div>
);

/**
 * Header Accent - Shape behind header area for emphasis
 */
const HeaderAccent: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '180px',
      background: `linear-gradient(180deg, ${color}15 0%, ${color}08 60%, transparent 100%)`,
      opacity,
      pointerEvents: 'none',
      zIndex: 0,
    }}
  />
);

/**
 * Side Stripe - Vertical accent stripe
 */
const SideStripe: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '6px',
      height: '100%',
      background: `linear-gradient(180deg, ${color} 0%, ${color}60 50%, ${color}20 100%)`,
      opacity,
      zIndex: 10,
    }}
  />
);

/**
 * Corner blob - organic shape in top-right corner
 */
const CornerBlob: React.FC<{ primaryColor: string; secondaryColor: string; opacity: number }> = ({
  primaryColor,
  secondaryColor,
  opacity,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '280px',
      height: '280px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    <svg
      viewBox="0 0 200 200"
      style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '280px',
        height: '280px',
      }}
    >
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.18 * opacity} />
          <stop offset="50%" stopColor={secondaryColor} stopOpacity={0.12 * opacity} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity={0.05 * opacity} />
        </linearGradient>
      </defs>
      <path
        d="M170,30 C200,50 190,100 170,130 C150,160 100,180 60,160 C20,140 10,90 30,50 C50,10 130,10 170,30 Z"
        fill="url(#blobGradient)"
      />
    </svg>
  </div>
);

/**
 * Corner circles - decorative dashed circles pattern
 */
const CornerCircles: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: '40px',
      right: '25px',
      width: '120px',
      height: '120px',
      pointerEvents: 'none',
      zIndex: 2,
    }}
  >
    <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%' }}>
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity={0.25 * opacity}
        strokeDasharray="10 5"
      />
      <circle
        cx="60"
        cy="60"
        r="32"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeOpacity={0.18 * opacity}
        strokeDasharray="6 4"
      />
    </svg>
  </div>
);

/**
 * Bottom wave - wave pattern at bottom-left
 */
const BottomWave: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '250px',
      height: '200px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    <svg
      viewBox="0 0 200 160"
      style={{
        position: 'absolute',
        bottom: '-20px',
        left: '-20px',
        width: '250px',
        height: '200px',
      }}
    >
      <defs>
        <linearGradient id="waveGradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={0.12 * opacity} />
          <stop offset="100%" stopColor={color} stopOpacity={0.04 * opacity} />
        </linearGradient>
      </defs>
      <path
        d="M0,160 L0,80 Q50,50 100,80 T200,60 L200,160 Z"
        fill="url(#waveGradient)"
      />
    </svg>
    {/* Decorative dots */}
    <svg
      viewBox="0 0 80 80"
      style={{
        position: 'absolute',
        bottom: '35px',
        left: '35px',
        width: '60px',
        height: '60px',
      }}
    >
      <circle cx="12" cy="12" r="4" fill={color} fillOpacity={0.15 * opacity} />
      <circle cx="35" cy="10" r="3" fill={color} fillOpacity={0.12 * opacity} />
      <circle cx="10" cy="35" r="3" fill={color} fillOpacity={0.12 * opacity} />
      <circle cx="30" cy="30" r="3.5" fill={color} fillOpacity={0.10 * opacity} />
      <circle cx="55" cy="20" r="2.5" fill={color} fillOpacity={0.08 * opacity} />
    </svg>
  </div>
);

/**
 * Geometric corner - elegant layered rectangles in top-right
 */
const GeometricCorner: React.FC<{ primaryColor: string; secondaryColor: string; opacity: number }> = ({
  primaryColor,
  secondaryColor,
  opacity,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '200px',
      height: '200px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="geoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.15 * opacity} />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity={0.08 * opacity} />
        </linearGradient>
        <linearGradient id="geoGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity={0.12 * opacity} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity={0.05 * opacity} />
        </linearGradient>
      </defs>
      {/* Large background rectangle */}
      <rect
        x="60"
        y="-30"
        width="180"
        height="180"
        rx="8"
        fill="url(#geoGradient1)"
        transform="rotate(15 150 60)"
      />
      {/* Medium overlapping rectangle */}
      <rect
        x="90"
        y="10"
        width="130"
        height="130"
        rx="6"
        fill="url(#geoGradient2)"
        transform="rotate(-10 155 75)"
      />
      {/* Small accent rectangle */}
      <rect
        x="130"
        y="30"
        width="60"
        height="60"
        rx="4"
        fill={primaryColor}
        fillOpacity={0.08 * opacity}
        transform="rotate(25 160 60)"
      />
    </svg>
  </div>
);

/**
 * Curved lines - elegant flowing lines in top-right
 */
const CurvedLines: React.FC<{ primaryColor: string; secondaryColor: string; opacity: number }> = ({
  primaryColor,
  secondaryColor,
  opacity,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '250px',
      height: '250px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    <svg viewBox="0 0 250 250" style={{ width: '100%', height: '100%' }}>
      {/* Outer flowing curve */}
      <path
        d="M250,0 Q250,120 130,180 Q80,205 0,200"
        fill="none"
        stroke={primaryColor}
        strokeWidth="40"
        strokeOpacity={0.08 * opacity}
        strokeLinecap="round"
      />
      {/* Middle curve */}
      <path
        d="M250,0 Q240,90 150,140 Q100,165 40,160"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="25"
        strokeOpacity={0.10 * opacity}
        strokeLinecap="round"
      />
      {/* Inner accent curve */}
      <path
        d="M250,0 Q230,60 170,100 Q130,125 80,120"
        fill="none"
        stroke={primaryColor}
        strokeWidth="12"
        strokeOpacity={0.12 * opacity}
        strokeLinecap="round"
      />
      {/* Thin highlight line */}
      <path
        d="M250,0 Q220,40 180,70 Q150,90 110,90"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="3"
        strokeOpacity={0.18 * opacity}
        strokeLinecap="round"
      />
    </svg>
  </div>
);

/**
 * Data Grid - Analyst-inspired grid lines pattern in top-right
 * Perfect for data/business analyst resumes
 */
const DataGrid: React.FC<{ primaryColor: string; secondaryColor: string; opacity: number }> = ({
  primaryColor,
  secondaryColor,
  opacity,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '220px',
      height: '220px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    <svg viewBox="0 0 220 220" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="dataGridGradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.15 * opacity} />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity={0.03 * opacity} />
        </linearGradient>
      </defs>
      {/* Vertical grid lines */}
      {[40, 80, 120, 160, 200].map((x) => (
        <line
          key={`v-${x}`}
          x1={x}
          y1="0"
          x2={x}
          y2="220"
          stroke={primaryColor}
          strokeWidth="1"
          strokeOpacity={0.08 * opacity}
        />
      ))}
      {/* Horizontal grid lines */}
      {[40, 80, 120, 160, 200].map((y) => (
        <line
          key={`h-${y}`}
          x1="0"
          y1={y}
          x2="220"
          y2={y}
          stroke={primaryColor}
          strokeWidth="1"
          strokeOpacity={0.08 * opacity}
        />
      ))}
      {/* Data points at intersections */}
      <circle cx="80" cy="40" r="4" fill={primaryColor} fillOpacity={0.18 * opacity} />
      <circle cx="120" cy="80" r="6" fill={secondaryColor} fillOpacity={0.15 * opacity} />
      <circle cx="160" cy="40" r="3" fill={primaryColor} fillOpacity={0.12 * opacity} />
      <circle cx="200" cy="120" r="5" fill={primaryColor} fillOpacity={0.10 * opacity} />
      <circle cx="160" cy="160" r="4" fill={secondaryColor} fillOpacity={0.12 * opacity} />
      {/* Connecting line like a chart */}
      <path
        d="M40,160 L80,120 L120,80 L160,100 L200,40"
        fill="none"
        stroke={primaryColor}
        strokeWidth="2"
        strokeOpacity={0.15 * opacity}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

/**
 * Hexagon Cluster - Modern tech-inspired hexagon pattern
 */
const HexagonCluster: React.FC<{ primaryColor: string; secondaryColor: string; opacity: number }> = ({
  primaryColor,
  secondaryColor,
  opacity,
}) => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '200px',
      height: '200px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.12 * opacity} />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity={0.05 * opacity} />
        </linearGradient>
      </defs>
      {/* Hexagon path - pointy top */}
      <path
        d="M180,140 L160,175 L120,175 L100,140 L120,105 L160,105 Z"
        fill="url(#hexGradient)"
      />
      <path
        d="M220,180 L200,215 L160,215 L140,180 L160,145 L200,145 Z"
        fill={primaryColor}
        fillOpacity={0.08 * opacity}
      />
      <path
        d="M160,200 L140,235 L100,235 L80,200 L100,165 L140,165 Z"
        fill={secondaryColor}
        fillOpacity={0.06 * opacity}
      />
      {/* Smaller accent hexagon */}
      <path
        d="M200,110 L188,130 L164,130 L152,110 L164,90 L188,90 Z"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeOpacity={0.15 * opacity}
      />
    </svg>
  </div>
);

/**
 * Circuit Lines - Tech-inspired circuit board pattern for left side
 */
const CircuitLines: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      width: '40px',
      height: '300px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    <svg viewBox="0 0 40 300" style={{ width: '100%', height: '100%' }}>
      {/* Main vertical line */}
      <line x1="8" y1="0" x2="8" y2="300" stroke={color} strokeWidth="2" strokeOpacity={0.12 * opacity} />
      {/* Branch lines with nodes */}
      <path d="M8,50 L25,50 L25,70" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity={0.15 * opacity} />
      <circle cx="25" cy="70" r="3" fill={color} fillOpacity={0.18 * opacity} />

      <path d="M8,120 L30,120" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity={0.12 * opacity} />
      <circle cx="30" cy="120" r="4" fill={color} fillOpacity={0.15 * opacity} />

      <path d="M8,180 L20,180 L20,200 L35,200" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity={0.12 * opacity} />
      <circle cx="35" cy="200" r="3" fill={color} fillOpacity={0.12 * opacity} />

      <path d="M8,250 L25,250" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity={0.10 * opacity} />
      <circle cx="25" cy="250" r="2.5" fill={color} fillOpacity={0.12 * opacity} />

      {/* Small connector dots on main line */}
      <circle cx="8" cy="50" r="2" fill={color} fillOpacity={0.20 * opacity} />
      <circle cx="8" cy="120" r="2" fill={color} fillOpacity={0.18 * opacity} />
      <circle cx="8" cy="180" r="2" fill={color} fillOpacity={0.15 * opacity} />
      <circle cx="8" cy="250" r="2" fill={color} fillOpacity={0.12 * opacity} />
    </svg>
  </div>
);

/**
 * Left Gradient Bar - Bold gradient accent bar on left side
 */
const LeftGradientBar: React.FC<{ primaryColor: string; secondaryColor: string; opacity: number }> = ({
  primaryColor,
  secondaryColor,
  opacity,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '8px',
      height: '100%',
      background: `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 40%, ${primaryColor}40 70%, transparent 100%)`,
      opacity,
      zIndex: 10,
    }}
  />
);

/**
 * Left Dots Accent - Decorative dots pattern on left side
 */
const LeftDotsAccent: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: '15%',
      left: '20px',
      width: '30px',
      height: '200px',
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    <svg viewBox="0 0 30 200" style={{ width: '100%', height: '100%' }}>
      {/* Scattered dots pattern */}
      <circle cx="5" cy="20" r="3" fill={color} fillOpacity={0.20 * opacity} />
      <circle cx="20" cy="35" r="4" fill={color} fillOpacity={0.15 * opacity} />
      <circle cx="10" cy="60" r="2.5" fill={color} fillOpacity={0.18 * opacity} />
      <circle cx="25" cy="80" r="3" fill={color} fillOpacity={0.12 * opacity} />
      <circle cx="8" cy="105" r="3.5" fill={color} fillOpacity={0.16 * opacity} />
      <circle cx="22" cy="130" r="2" fill={color} fillOpacity={0.14 * opacity} />
      <circle cx="12" cy="155" r="4" fill={color} fillOpacity={0.10 * opacity} />
      <circle cx="5" cy="180" r="2.5" fill={color} fillOpacity={0.12 * opacity} />
    </svg>
  </div>
);

/**
 * Bottom Left Corner - Decorative corner accent at bottom-left
 */
const BottomLeftCorner: React.FC<{ primaryColor: string; secondaryColor: string; opacity: number }> = ({
  primaryColor,
  secondaryColor,
  opacity,
}) => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '150px',
      height: '150px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    <svg viewBox="0 0 150 150" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="blCornerGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.15 * opacity} />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity={0.03 * opacity} />
        </linearGradient>
      </defs>
      {/* Quarter circle arc */}
      <path
        d="M0,150 L0,80 Q0,0 80,0 L0,0 Z"
        fill="url(#blCornerGradient)"
      />
      {/* Inner arc line */}
      <path
        d="M0,120 Q0,40 80,40"
        fill="none"
        stroke={primaryColor}
        strokeWidth="2"
        strokeOpacity={0.12 * opacity}
      />
    </svg>
  </div>
);

/**
 * Bottom Gradient Fade - Soft gradient fade at bottom of page
 * Creates a modern, polished look for frontend/tech resumes
 */
const BottomGradientFade: React.FC<{ primaryColor: string; secondaryColor: string; opacity: number }> = ({
  primaryColor,
  secondaryColor,
  opacity,
}) => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '180px',
      background: `linear-gradient(180deg, transparent 0%, ${primaryColor}08 40%, ${primaryColor}15 70%, ${secondaryColor}20 100%)`,
      opacity,
      pointerEvents: 'none',
      zIndex: 1,
    }}
  />
);

/**
 * Code Brackets - Decorative brackets for developer resumes
 * Subtle tech aesthetic with opening/closing brackets
 */
const CodeBrackets: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <>
    {/* Top-left opening bracket */}
    <div
      style={{
        position: 'absolute',
        top: '100px',
        left: '15px',
        fontSize: '48px',
        fontFamily: "'Fira Code', 'SF Mono', monospace",
        fontWeight: 300,
        color,
        opacity: 0.08 * opacity,
        pointerEvents: 'none',
        zIndex: 1,
        lineHeight: 1,
      }}
    >
      {'<'}
    </div>
    {/* Bottom-right closing bracket */}
    <div
      style={{
        position: 'absolute',
        bottom: '60px',
        right: '20px',
        fontSize: '48px',
        fontFamily: "'Fira Code', 'SF Mono', monospace",
        fontWeight: 300,
        color,
        opacity: 0.08 * opacity,
        pointerEvents: 'none',
        zIndex: 1,
        lineHeight: 1,
      }}
    >
      {'/>'}
    </div>
  </>
);

/**
 * Header Wave - Decorative wave pattern inside banner headers
 * Creates flowing curves that add visual interest to solid color banners
 */
const HeaderWave: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '160px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 2,
    }}
  >
    <svg
      viewBox="0 0 800 160"
      preserveAspectRatio="none"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Background wave - large flowing curve */}
      <path
        d="M0,80 Q150,20 300,60 T600,40 T800,80 L800,160 L0,160 Z"
        fill={color}
        fillOpacity={0.08 * opacity}
      />
      {/* Middle wave */}
      <path
        d="M0,100 Q200,50 400,90 T800,70 L800,160 L0,160 Z"
        fill={color}
        fillOpacity={0.06 * opacity}
      />
      {/* Top accent line */}
      <path
        d="M0,40 Q100,80 250,50 Q400,20 550,60 Q700,100 800,60"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity={0.15 * opacity}
      />
      {/* Secondary flowing line */}
      <path
        d="M0,70 Q150,40 300,70 Q450,100 600,60 Q750,20 800,50"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity={0.12 * opacity}
      />
    </svg>
  </div>
);

/**
 * Diagonal Lines - Modern diagonal stripes pattern for headers
 * Creates a dynamic, contemporary feel with parallel diagonal lines
 */
const DiagonalLines: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '300px',
      height: '160px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 2,
    }}
  >
    <svg
      viewBox="0 0 300 160"
      preserveAspectRatio="none"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Multiple diagonal lines with varying opacity */}
      <line x1="180" y1="0" x2="300" y2="120" stroke={color} strokeWidth="40" strokeOpacity={0.06 * opacity} />
      <line x1="220" y1="0" x2="340" y2="120" stroke={color} strokeWidth="25" strokeOpacity={0.08 * opacity} />
      <line x1="260" y1="0" x2="380" y2="120" stroke={color} strokeWidth="15" strokeOpacity={0.10 * opacity} />
      <line x1="290" y1="0" x2="410" y2="120" stroke={color} strokeWidth="8" strokeOpacity={0.12 * opacity} />
      {/* Accent circles at corners */}
      <circle cx="280" cy="30" r="20" fill={color} fillOpacity={0.05 * opacity} />
      <circle cx="250" cy="80" r="12" fill={color} fillOpacity={0.04 * opacity} />
    </svg>
  </div>
);

/**
 * Header Circles - Decorative overlapping circles for headers
 * Creates a modern, bubbly aesthetic
 */
const HeaderCircles: React.FC<{ primaryColor: string; secondaryColor: string; opacity: number }> = ({
  primaryColor,
  secondaryColor,
  opacity,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '250px',
      height: '160px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 2,
    }}
  >
    <svg viewBox="0 0 250 160" style={{ width: '100%', height: '100%' }}>
      {/* Large background circle */}
      <circle cx="220" cy="80" r="100" fill={primaryColor} fillOpacity={0.06 * opacity} />
      {/* Medium overlapping circle */}
      <circle cx="180" cy="40" r="60" fill={secondaryColor} fillOpacity={0.08 * opacity} />
      {/* Small accent circles */}
      <circle cx="200" cy="120" r="35" fill={primaryColor} fillOpacity={0.05 * opacity} />
      <circle cx="140" cy="70" r="25" fill={secondaryColor} fillOpacity={0.04 * opacity} />
      {/* Ring accent */}
      <circle cx="230" cy="30" r="18" fill="none" stroke={primaryColor} strokeWidth="2" strokeOpacity={0.12 * opacity} />
    </svg>
  </div>
);

/**
 * Header Dots Grid - Subtle dot pattern for headers
 */
const HeaderDotsGrid: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: '20px',
      right: '40px',
      width: '120px',
      height: '80px',
      pointerEvents: 'none',
      zIndex: 2,
    }}
  >
    <svg viewBox="0 0 120 80" style={{ width: '100%', height: '100%' }}>
      {[0, 20, 40, 60, 80, 100].map((x) =>
        [0, 20, 40, 60].map((y) => (
          <circle
            key={`${x}-${y}`}
            cx={x + 10}
            cy={y + 10}
            r="2"
            fill={color}
            fillOpacity={0.15 * opacity}
          />
        ))
      )}
    </svg>
  </div>
);

/**
 * Dot pattern - subtle grid of dots
 */
const DotPattern: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: '120px',
      right: '80px',
      width: '100px',
      height: '100px',
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
      {[0, 25, 50, 75].map((y) =>
        [0, 25, 50, 75].map((x) => (
          <circle
            key={`${x}-${y}`}
            cx={x + 12.5}
            cy={y + 12.5}
            r="2.5"
            fill={color}
            fillOpacity={0.10 * opacity}
          />
        ))
      )}
    </svg>
  </div>
);

/**
 * Main decorations component
 */
export const ResumeDecorations: React.FC<ResumeDecorationsProps> = ({
  config,
  primaryColor,
  secondaryColor,
  accentBackground,
}) => {
  if (!config.enabled) return null;

  const elements = config.elements || ['top-accent-line', 'corner-blob', 'bottom-wave'];
  const opacity = config.opacity ?? 1;
  const secondary = secondaryColor || primaryColor;

  const renderElement = (element: DecorationElement) => {
    switch (element) {
      case 'top-accent-line':
        return <TopAccentLine key={element} color={primaryColor} opacity={opacity} />;
      case 'diagonal-shape':
        return (
          <DiagonalShape
            key={element}
            primaryColor={primaryColor}
            secondaryColor={secondary}
            opacity={opacity}
          />
        );
      case 'header-accent':
        return <HeaderAccent key={element} color={primaryColor} opacity={opacity} />;
      case 'side-stripe':
        return <SideStripe key={element} color={primaryColor} opacity={opacity} />;
      case 'corner-blob':
        return (
          <CornerBlob
            key={element}
            primaryColor={primaryColor}
            secondaryColor={secondary}
            opacity={opacity}
          />
        );
      case 'corner-circles':
        return <CornerCircles key={element} color={primaryColor} opacity={opacity} />;
      case 'bottom-wave':
        return <BottomWave key={element} color={primaryColor} opacity={opacity} />;
      case 'dot-pattern':
        return <DotPattern key={element} color={primaryColor} opacity={opacity} />;
      case 'geometric-corner':
        return (
          <GeometricCorner
            key={element}
            primaryColor={primaryColor}
            secondaryColor={secondary}
            opacity={opacity}
          />
        );
      case 'curved-lines':
        return (
          <CurvedLines
            key={element}
            primaryColor={primaryColor}
            secondaryColor={secondary}
            opacity={opacity}
          />
        );
      case 'data-grid':
        return (
          <DataGrid
            key={element}
            primaryColor={primaryColor}
            secondaryColor={secondary}
            opacity={opacity}
          />
        );
      case 'hexagon-cluster':
        return (
          <HexagonCluster
            key={element}
            primaryColor={primaryColor}
            secondaryColor={secondary}
            opacity={opacity}
          />
        );
      case 'circuit-lines':
        return <CircuitLines key={element} color={primaryColor} opacity={opacity} />;
      case 'left-gradient-bar':
        return (
          <LeftGradientBar
            key={element}
            primaryColor={primaryColor}
            secondaryColor={secondary}
            opacity={opacity}
          />
        );
      case 'left-dots-accent':
        return <LeftDotsAccent key={element} color={primaryColor} opacity={opacity} />;
      case 'bottom-left-corner':
        return (
          <BottomLeftCorner
            key={element}
            primaryColor={primaryColor}
            secondaryColor={secondary}
            opacity={opacity}
          />
        );
      case 'bottom-gradient-fade':
        return (
          <BottomGradientFade
            key={element}
            primaryColor={primaryColor}
            secondaryColor={secondary}
            opacity={opacity}
          />
        );
      case 'code-brackets':
        return <CodeBrackets key={element} color={primaryColor} opacity={opacity} />;
      case 'header-wave':
        return <HeaderWave key={element} color="#ffffff" opacity={opacity} />;
      case 'diagonal-lines':
        return <DiagonalLines key={element} color="#ffffff" opacity={opacity} />;
      case 'header-circles':
        return (
          <HeaderCircles
            key={element}
            primaryColor="#ffffff"
            secondaryColor="#ffffff"
            opacity={opacity}
          />
        );
      case 'header-dots-grid':
        return <HeaderDotsGrid key={element} color="#ffffff" opacity={opacity} />;
      default:
        return null;
    }
  };

  return <>{elements.map(renderElement)}</>;
};

/**
 * Get gradient background style based on config
 */
export const getGradientBackgroundStyle = (
  config: DecorationsConfig | undefined,
  accentColor: string
): React.CSSProperties => {
  if (!config?.gradientBackground) return {};

  return {
    background: `linear-gradient(160deg, #ffffff 0%, #ffffff 65%, ${accentColor} 100%)`,
  };
};

export default ResumeDecorations;
