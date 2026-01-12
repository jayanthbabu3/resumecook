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

// Custom styles for driver.js
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
      max-width: 360px !important;
      padding: 0 !important;
      overflow: hidden !important;
    }

    .driver-popover-title {
      font-size: 18px !important;
      font-weight: 700 !important;
      color: #0f172a !important;
      padding: 20px 20px 8px 20px !important;
      margin: 0 !important;
      background: transparent !important;
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
      padding: 10px 18px !important;
      border-radius: 10px !important;
      font-weight: 600 !important;
      font-size: 13px !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
      text-shadow: none !important;
    }

    .driver-popover-prev-btn:hover {
      background: #e2e8f0 !important;
      color: #1e293b !important;
    }

    .driver-popover-next-btn,
    .driver-popover-done-btn {
      background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%) !important;
      color: white !important;
      border: none !important;
      padding: 10px 20px !important;
      border-radius: 10px !important;
      font-weight: 600 !important;
      font-size: 13px !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
      box-shadow: 0 4px 14px -3px rgba(8, 145, 178, 0.4) !important;
      text-shadow: none !important;
    }

    .driver-popover-next-btn:hover,
    .driver-popover-done-btn:hover {
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 20px -3px rgba(8, 145, 178, 0.5) !important;
    }

    .driver-popover-close-btn {
      color: #94a3b8 !important;
      width: 32px !important;
      height: 32px !important;
      top: 12px !important;
      right: 12px !important;
      border-radius: 8px !important;
      transition: all 0.2s ease !important;
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
        0 0 0 3px rgba(8, 145, 178, 0.6),
        0 0 15px 3px rgba(8, 145, 178, 0.3) !important;
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
      background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
    }

    .tour-progress-dot.completed {
      background: #0891b2;
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

    // Define tour steps targeting actual UI elements
    const steps: DriveStep[] = [
      {
        popover: {
          title: '👋 Welcome to Resume Builder!',
          description: 'Let me give you a quick tour of all the powerful features that will help you create a stunning professional resume in minutes.',
          side: 'over',
          align: 'center',
        },
      },
      {
        element: '[data-tour="form-mode"]',
        popover: {
          title: '📝 Form Editor',
          description: 'Use the Form view to easily fill in your details section by section. It\'s organized and straightforward - perfect for building your resume content.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="live-mode"]',
        popover: {
          title: '✏️ Live Editor',
          description: 'Switch to Live mode to edit directly on your resume! Click any text to modify it instantly and see changes in real-time.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="font-selector"]',
        popover: {
          title: '🔤 Font Selection',
          description: 'Choose from a variety of professional fonts. Each font is optimized for readability and will give your resume a unique, polished look.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="sections-menu"]',
        popover: {
          title: '📑 Manage Sections',
          description: 'Add new sections like Skills, Projects, or Certifications. You can also rearrange section order and set page breaks for PDF export.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="styling-menu"]',
        popover: {
          title: '⚙️ Styling Options',
          description: 'Fine-tune your resume appearance! Adjust spacing, margins, font sizes, and layout options to create the perfect visual balance.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="color-picker"]',
        popover: {
          title: '🎨 Color Themes',
          description: 'Personalize your resume with accent colors. Choose from presets or use any custom color to match your personal brand.',
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
          title: '📥 Download PDF',
          description: 'When you\'re ready, download your resume as a professionally formatted PDF - perfect for job applications!',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        popover: {
          title: '🎉 You\'re All Set!',
          description: 'You now know all the essential features. Start with the Form editor to add your content, or jump straight into Live editing. Good luck with your job search!',
          side: 'over',
          align: 'center',
        },
      },
    ];

    // Create driver instance
    const driverObj = driver({
      showProgress: true,
      steps,
      animate: true,
      allowClose: true,
      overlayColor: 'black',
      overlayOpacity: 0.4,
      stagePadding: 10,
      stageRadius: 10,
      popoverOffset: 15,
      showButtons: ['next', 'previous', 'close'],
      nextBtnText: 'Next →',
      prevBtnText: '← Back',
      doneBtnText: 'Get Started! 🚀',
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
