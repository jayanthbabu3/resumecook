/**
 * Dashboard Tour Component
 *
 * A guided tour using Driver.js that highlights the dashboard features.
 * Shows first-time users the Free and Pro features available.
 */

import { useEffect, useCallback, useRef } from 'react';
import { driver, type DriveStep, type Driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const DASHBOARD_TOUR_STORAGE_KEY = 'dashboard-tour-completed-v1';

// Custom styles for driver.js with mobile responsiveness
const injectCustomStyles = () => {
  const styleId = 'dashboard-tour-custom-styles';
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
      width: 380px !important;
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

    .driver-overlay {
      background: rgba(0, 0, 0, 0.5) !important;
    }

    .driver-active-element {
      border-radius: 12px !important;
      z-index: 10001 !important;
    }

    #driver-highlighted-element-stage,
    .driver-highlighted-element-stage {
      background: transparent !important;
      border-radius: 14px !important;
      box-shadow:
        0 0 0 3px rgba(59, 130, 246, 0.6),
        0 0 20px 5px rgba(59, 130, 246, 0.2) !important;
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
        border-radius: 10px !important;
        box-shadow:
          0 0 0 2px rgba(59, 130, 246, 0.6),
          0 0 12px 3px rgba(59, 130, 246, 0.2) !important;
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

interface DashboardTourProps {
  forceShow?: boolean;
  onComplete?: () => void;
}

export const DashboardTour: React.FC<DashboardTourProps> = ({
  forceShow = false,
  onComplete,
}) => {
  const driverRef = useRef<Driver | null>(null);
  const hasStartedRef = useRef(false);

  const startTour = useCallback(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    injectCustomStyles();

    // Check if mobile
    const isMobile = window.innerWidth < 640;

    // Define tour steps targeting dashboard elements
    const steps: DriveStep[] = [
      {
        popover: {
          title: '👋 Welcome to Resume Builder!',
          description: 'Let me show you all the powerful features available to create your perfect resume. We have both <strong>Free</strong> and <strong>Pro</strong> features to help you succeed!',
          side: 'over',
          align: 'center',
        },
      },
      {
        element: '[data-tour="free-section"]',
        popover: {
          title: '🆓 Free Features',
          description: 'Everything in this section is completely free - no credit card required! Access all templates, both editors, and unlimited exports.',
          side: 'bottom',
          align: 'start',
        },
      },
      {
        element: '[data-tour="all-templates"]',
        popover: {
          title: '📄 All Templates',
          description: 'Browse our entire collection of professional and fresher templates. Pick any design you like - they\'re all free to use!',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="live-editor"]',
        popover: {
          title: '✏️ Live Editor',
          description: 'Edit your resume in real-time! Click directly on any text to modify it and see changes instantly. Perfect for quick edits.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="form-editor"]',
        popover: {
          title: '📝 Form Editor',
          description: 'Prefer a structured approach? Use the Form Editor to build your resume section by section with guided input fields.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="export-customize"]',
        popover: {
          title: '📥 Export & Customize',
          description: 'Download your resume as PDF anytime. Customize colors, fonts, and spacing to match your personal style - all for free!',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="pro-section"]',
        popover: {
          title: '⭐ Pro Features',
          description: 'Unlock AI-powered features to supercharge your resume building experience. Let AI do the heavy lifting!',
          side: 'bottom',
          align: 'start',
        },
      },
      {
        element: '[data-tour="chat-resume"]',
        popover: {
          title: '💬 Chat with Resume',
          description: 'Just talk to AI about yourself - your job, experience, skills - and watch your resume build in real-time. No forms, just conversation!',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="upload-resume"]',
        popover: {
          title: '📤 Upload Resume',
          description: 'Already have a resume? Upload your PDF or DOCX and AI will import everything automatically. Then pick a beautiful template!',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="tailor-job"]',
        popover: {
          title: '🎯 Match to Job',
          description: 'Found a job you love? Paste the job post and AI will rewrite your resume to match it perfectly - summary, experience, and skills all optimized!',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="linkedin-import"]',
        popover: {
          title: '💼 Import from LinkedIn',
          description: 'Already on LinkedIn? Connect your profile and get a complete resume in seconds - all your jobs, skills, and education imported automatically!',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        popover: {
          title: '🚀 You\'re Ready!',
          description: 'Start with our free features - they\'re powerful enough for most needs. When you want AI superpowers, upgrade to Pro anytime. Good luck with your job search!',
          side: 'over',
          align: 'center',
        },
      },
    ];

    // Create driver instance with mobile-aware settings
    const driverObj = driver({
      showProgress: true,
      steps,
      animate: true,
      allowClose: true,
      overlayColor: 'black',
      overlayOpacity: isMobile ? 0.6 : 0.5,
      stagePadding: isMobile ? 8 : 12,
      stageRadius: isMobile ? 10 : 14,
      popoverOffset: isMobile ? 10 : 15,
      showButtons: ['next', 'previous', 'close'],
      nextBtnText: isMobile ? 'Next' : 'Next →',
      prevBtnText: isMobile ? 'Back' : '← Back',
      doneBtnText: isMobile ? 'Start!' : 'Get Started! 🚀',
      progressText: '{{current}} of {{total}}',
      onDestroyed: () => {
        localStorage.setItem(DASHBOARD_TOUR_STORAGE_KEY, 'true');
        onComplete?.();
        hasStartedRef.current = false;
      },
      onCloseClick: () => {
        localStorage.setItem(DASHBOARD_TOUR_STORAGE_KEY, 'true');
        driverObj.destroy();
      },
    });

    driverRef.current = driverObj;

    // Start the tour
    driverObj.drive();
  }, [onComplete]);

  useEffect(() => {
    if (forceShow) {
      const timer = setTimeout(startTour, 500);
      return () => clearTimeout(timer);
    }

    const tourCompleted = localStorage.getItem(DASHBOARD_TOUR_STORAGE_KEY);
    if (!tourCompleted) {
      const timer = setTimeout(startTour, 1000);
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

  return null;
};

// Hook to control the tour programmatically
export const useDashboardTour = () => {
  const resetTour = () => {
    localStorage.removeItem(DASHBOARD_TOUR_STORAGE_KEY);
  };

  const hasCompletedTour = () => {
    return localStorage.getItem(DASHBOARD_TOUR_STORAGE_KEY) === 'true';
  };

  const startTour = () => {
    localStorage.removeItem(DASHBOARD_TOUR_STORAGE_KEY);
    window.location.reload();
  };

  return { resetTour, hasCompletedTour, startTour };
};

export default DashboardTour;
