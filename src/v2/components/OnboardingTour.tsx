/**
 * Onboarding Tour Component
 *
 * A modern guided tour using Driver.js that highlights actual UI elements.
 * Shows first-time users all the key features of the resume builder.
 */

import { useEffect, useCallback, useRef } from 'react';
import { driver, type DriveStep, type Driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const TOUR_STORAGE_KEY = 'resume-builder-tour-completed-v2';

// Custom styles for driver.js with mobile responsiveness
const injectCustomStyles = () => {
  const styleId = 'driver-custom-styles';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    .driver-popover {
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%) !important;
      border: none !important;
      border-radius: 16px !important;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05) !important;
      max-width: calc(100vw - 32px) !important;
      width: 360px !important;
      padding: 0 !important;
      overflow: hidden !important;
      margin: 0 auto !important;
    }

    .driver-popover-title {
      font-size: 18px !important;
      font-weight: 700 !important;
      color: #0f172a !important;
      padding: 20px 20px 8px 20px !important;
      margin: 0 !important;
      background: transparent !important;
      padding-right: 48px !important;
    }

    .driver-popover-description {
      font-size: 14px !important;
      line-height: 1.6 !important;
      color: #475569 !important;
      padding: 0 20px 16px 20px !important;
      margin: 0 !important;
    }

    .driver-popover-progress-text {
      font-size: 12px !important;
      font-weight: 600 !important;
      color: #94a3b8 !important;
      padding: 0 20px !important;
    }

    .driver-popover-navigation-btns {
      padding: 16px 20px 20px 20px !important;
      gap: 10px !important;
      display: flex !important;
      justify-content: space-between !important;
      border-top: 1px solid #f1f5f9 !important;
      background: #fafbfc !important;
    }

    .driver-popover-prev-btn {
      background: #f1f5f9 !important;
      color: #475569 !important;
      border: none !important;
      padding: 12px 18px !important;
      border-radius: 10px !important;
      font-weight: 600 !important;
      font-size: 13px !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
      text-shadow: none !important;
      min-height: 44px !important;
    }

    .driver-popover-prev-btn:hover {
      background: #e2e8f0 !important;
      color: #1e293b !important;
    }

    .driver-popover-next-btn,
    .driver-popover-done-btn {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
      color: white !important;
      border: none !important;
      padding: 12px 20px !important;
      border-radius: 10px !important;
      font-weight: 600 !important;
      font-size: 13px !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
      box-shadow: 0 4px 14px -3px rgba(59, 130, 246, 0.4) !important;
      text-shadow: none !important;
      min-height: 44px !important;
    }

    .driver-popover-next-btn:hover,
    .driver-popover-done-btn:hover {
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 20px -3px rgba(59, 130, 246, 0.5) !important;
    }

    .driver-popover-close-btn {
      color: #94a3b8 !important;
      width: 36px !important;
      height: 36px !important;
      top: 12px !important;
      right: 12px !important;
      border-radius: 8px !important;
      transition: all 0.2s ease !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    .driver-popover-close-btn:hover {
      background: #f1f5f9 !important;
      color: #475569 !important;
    }

    .driver-popover-arrow {
      border: none !important;
    }

    .driver-popover-arrow-side-left {
      border-left-color: white !important;
    }

    .driver-popover-arrow-side-right {
      border-right-color: white !important;
    }

    .driver-popover-arrow-side-top {
      border-top-color: white !important;
    }

    .driver-popover-arrow-side-bottom {
      border-bottom-color: white !important;
    }

    /* Overlay styling - lighter semi-transparent background */
    .driver-overlay {
      background: rgba(0, 0, 0, 0.4) !important;
    }

    /* Highlighted element styling - make it stand out */
    .driver-active-element {
      border-radius: 8px !important;
      z-index: 10001 !important;
      background: white !important;
    }

    /* Stage (cutout area) - visible with accent border */
    #driver-highlighted-element-stage,
    .driver-highlighted-element-stage {
      background: transparent !important;
      border-radius: 10px !important;
      box-shadow:
        0 0 0 3px rgba(59, 130, 246, 0.6),
        0 0 15px 3px rgba(59, 130, 246, 0.3) !important;
    }

    /* Custom icon styling for step badges */
    .tour-step-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      margin-right: 10px;
      font-weight: 700;
      font-size: 13px;
      color: white;
      vertical-align: middle;
    }

    /* Progress dots */
    .tour-progress {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 12px 20px;
      border-bottom: 1px solid #f1f5f9;
    }

    .tour-progress-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #e2e8f0;
      transition: all 0.3s ease;
    }

    .tour-progress-dot.active {
      width: 24px;
      border-radius: 4px;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    }

    .tour-progress-dot.completed {
      background: #3b82f6;
    }

    /* Keyboard hint */
    .tour-keyboard-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 20px;
      font-size: 11px;
      color: #94a3b8;
      border-top: 1px solid #f1f5f9;
    }

    .tour-kbd {
      display: inline-block;
      padding: 2px 6px;
      background: #f1f5f9;
      border-radius: 4px;
      font-family: monospace;
      font-size: 10px;
      color: #64748b;
    }

    /* Mobile responsive styles */
    @media (max-width: 640px) {
      .driver-popover {
        width: calc(100vw - 24px) !important;
        max-width: none !important;
        border-radius: 12px !important;
        margin: 8px !important;
      }

      .driver-popover-title {
        font-size: 16px !important;
        padding: 16px 16px 6px 16px !important;
        padding-right: 44px !important;
      }

      .driver-popover-description {
        font-size: 13px !important;
        padding: 0 16px 12px 16px !important;
        line-height: 1.5 !important;
      }

      .driver-popover-progress-text {
        font-size: 11px !important;
        padding: 0 16px !important;
      }

      .driver-popover-navigation-btns {
        padding: 12px 16px 16px 16px !important;
        gap: 8px !important;
        flex-wrap: wrap !important;
      }

      .driver-popover-prev-btn {
        padding: 12px 14px !important;
        font-size: 12px !important;
        flex: 1 !important;
        min-width: 80px !important;
      }

      .driver-popover-next-btn,
      .driver-popover-done-btn {
        padding: 12px 16px !important;
        font-size: 12px !important;
        flex: 1 !important;
        min-width: 100px !important;
      }

      .driver-popover-close-btn {
        width: 32px !important;
        height: 32px !important;
        top: 10px !important;
        right: 10px !important;
      }

      #driver-highlighted-element-stage,
      .driver-highlighted-element-stage {
        border-radius: 8px !important;
        box-shadow:
          0 0 0 2px rgba(59, 130, 246, 0.6),
          0 0 12px 3px rgba(59, 130, 246, 0.2) !important;
      }

      .tour-progress {
        padding: 10px 16px;
        gap: 4px;
      }

      .tour-progress-dot {
        width: 6px;
        height: 6px;
      }

      .tour-progress-dot.active {
        width: 18px;
      }

      .tour-keyboard-hint {
        display: none !important;
      }
    }

    /* Extra small mobile */
    @media (max-width: 380px) {
      .driver-popover {
        width: calc(100vw - 16px) !important;
        margin: 4px !important;
      }

      .driver-popover-title {
        font-size: 15px !important;
        padding: 14px 14px 6px 14px !important;
        padding-right: 40px !important;
      }

      .driver-popover-description {
        font-size: 12px !important;
        padding: 0 14px 10px 14px !important;
      }

      .driver-popover-navigation-btns {
        padding: 10px 14px 14px 14px !important;
      }
    }
  `;
  document.head.appendChild(style);
};

interface OnboardingTourProps {
  forceShow?: boolean;
  onComplete?: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  forceShow = false,
  onComplete,
}) => {
  const driverRef = useRef<Driver | null>(null);
  const hasStartedRef = useRef(false);

  const startTour = useCallback(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    injectCustomStyles();

    // Check if mobile - use lg breakpoint to match Tailwind
    const isMobile = window.innerWidth < 1024;

    // Mobile steps - simplified tour targeting mobile-visible elements
    const mobileSteps: DriveStep[] = [
      {
        popover: {
          title: '👋 Welcome!',
          description: 'Let me show you the key features to create your perfect resume.',
          side: 'over',
          align: 'center',
        },
      },
      {
        element: '[data-tour="mobile-form-tab"]',
        popover: {
          title: '📝 Form Editor',
          description: 'Fill in your details section by section using a structured form.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="mobile-live-tab"]',
        popover: {
          title: '✏️ Live Edit',
          description: 'Edit directly on your resume - tap any text to modify it instantly.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="mobile-preview-tab"]',
        popover: {
          title: '👁️ Preview',
          description: 'See how your resume looks. Pinch to zoom for details!',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="mobile-ai-btn"]',
        popover: {
          title: '✨ AI Features (Pro)',
          description: 'Use AI to enhance your resume content and make it stand out.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="mobile-download-btn"]',
        popover: {
          title: '📥 Download PDF',
          description: 'Download your resume as a professional PDF - completely free!',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        popover: {
          title: '🚀 You\'re Ready!',
          description: 'Start building your resume. Good luck with your job search!',
          side: 'over',
          align: 'center',
        },
      },
    ];

    // Desktop steps - full tour with all features
    const desktopSteps: DriveStep[] = [
      {
        popover: {
          title: '👋 Welcome to the Resume Builder!',
          description: 'Let me show you all the powerful features available to create your perfect resume. You have both <strong>Free</strong> and <strong>Pro</strong> tools at your fingertips!',
          side: 'over',
          align: 'center',
        },
      },
      {
        element: '[data-tour="form-mode"]',
        popover: {
          title: '📝 Form Editor (Free)',
          description: 'Use the structured Form view to fill in your details section by section. Perfect for building your resume content in an organized way.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="live-mode"]',
        popover: {
          title: '✏️ Live Editor (Free)',
          description: 'Switch to Live mode to edit directly on your resume! Click any text to modify it and see changes instantly in real-time.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="enhance-ai"]',
        popover: {
          title: '✨ Enhance with AI (Pro)',
          description: 'Let AI improve your resume content! Get professional suggestions to make your experience and skills stand out to recruiters.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="tailor-job"]',
        popover: {
          title: '🎯 Tailor for Job (Pro)',
          description: 'Paste any job description and AI will optimize your resume with the right keywords to pass ATS systems and impress hiring managers.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="font-selector"]',
        popover: {
          title: '🔤 Font Selection (Free)',
          description: 'Choose from a variety of professional fonts. Each font is optimized for readability and gives your resume a polished look.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="color-picker"]',
        popover: {
          title: '🎨 Color Themes (Free)',
          description: 'Personalize your resume with accent colors. Choose from presets or use any custom color to match your personal brand.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="template-btn"]',
        popover: {
          title: '📄 Change Template (Free)',
          description: 'Browse and switch between all available templates anytime. Find the design that best represents your professional style.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="sections-menu"]',
        popover: {
          title: '📑 Manage Sections (Free)',
          description: 'Add new sections like Skills, Projects, or Certifications. Rearrange section order and customize your resume structure.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="styling-menu"]',
        popover: {
          title: '⚙️ Styling Options (Free)',
          description: 'Fine-tune your resume appearance! Adjust spacing, margins, font sizes, and layout options for the perfect visual balance.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="save-btn"]',
        popover: {
          title: '💾 Save Your Work',
          description: 'Sign in to save your resume to your account. Access it anytime, from any device, and never lose your progress.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="download-btn"]',
        popover: {
          title: '📥 Download PDF (Free)',
          description: 'Download your resume as a professionally formatted PDF anytime - completely free, no watermarks!',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        popover: {
          title: '🚀 You\'re Ready!',
          description: 'Start with the free features - they\'re powerful enough for most needs. When you want AI superpowers, try the Pro features. Good luck with your job search!',
          side: 'over',
          align: 'center',
        },
      },
    ];

    // Use appropriate steps based on screen size
    const steps = isMobile ? mobileSteps : desktopSteps;

    // Create driver instance with mobile-aware settings
    const driverObj = driver({
      showProgress: true,
      steps,
      animate: true,
      allowClose: true,
      overlayColor: 'black',
      overlayOpacity: isMobile ? 0.5 : 0.4,
      stagePadding: isMobile ? 6 : 10,
      stageRadius: isMobile ? 8 : 10,
      popoverOffset: isMobile ? 8 : 15,
      showButtons: ['next', 'previous', 'close'],
      nextBtnText: isMobile ? 'Next' : 'Next →',
      prevBtnText: isMobile ? 'Back' : '← Back',
      doneBtnText: isMobile ? 'Start!' : 'Get Started! 🚀',
      progressText: '{{current}} of {{total}}',
      onDestroyed: () => {
        localStorage.setItem(TOUR_STORAGE_KEY, 'true');
        onComplete?.();
        hasStartedRef.current = false;
      },
      onCloseClick: () => {
        localStorage.setItem(TOUR_STORAGE_KEY, 'true');
        driverObj.destroy();
      },
    });

    driverRef.current = driverObj;

    // Start the tour
    driverObj.drive();
  }, [onComplete]);

  useEffect(() => {
    if (forceShow) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(startTour, 500);
      return () => clearTimeout(timer);
    }

    const tourCompleted = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!tourCompleted) {
      // Wait for page to fully load and elements to be in DOM
      const timer = setTimeout(startTour, 1200);
      return () => clearTimeout(timer);
    }
  }, [forceShow, startTour]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, []);

  // This component doesn't render anything - driver.js handles the UI
  return null;
};

// Hook to control the tour programmatically
export const useOnboardingTour = () => {
  const resetTour = () => {
    localStorage.removeItem(TOUR_STORAGE_KEY);
  };

  const hasCompletedTour = () => {
    return localStorage.getItem(TOUR_STORAGE_KEY) === 'true';
  };

  const startTour = () => {
    localStorage.removeItem(TOUR_STORAGE_KEY);
    // Reload to trigger tour
    window.location.reload();
  };

  return { resetTour, hasCompletedTour, startTour };
};

export default OnboardingTour;
