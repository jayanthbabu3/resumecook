/**
 * Trial Welcome Context
 *
 * Manages the state for showing the trial welcome modal
 * after a user successfully claims their free trial.
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { TrialWelcomeModal } from '@/components/TrialWelcomeModal';

interface TrialWelcomeContextType {
  showTrialWelcome: () => void;
}

const TrialWelcomeContext = createContext<TrialWelcomeContextType | undefined>(undefined);

export function TrialWelcomeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const showTrialWelcome = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <TrialWelcomeContext.Provider value={{ showTrialWelcome }}>
      {children}
      <TrialWelcomeModal open={isOpen} onClose={handleClose} />
    </TrialWelcomeContext.Provider>
  );
}

export function useTrialWelcome() {
  const context = useContext(TrialWelcomeContext);
  if (!context) {
    throw new Error('useTrialWelcome must be used within a TrialWelcomeProvider');
  }
  return context;
}
