import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
  id: string;
  title: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (title: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((title: string, type: ToastType = 'info') => {
    const id = generateId();
    setToasts((current) => [...current, { id, title, type }]);
  }, []);

  useEffect(() => {
    if (!toasts.length) return;

    const timeout = window.setTimeout(() => {
      setToasts((current) => current.slice(1));
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, [toasts]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-viewport" aria-live="polite" aria-atomic="true">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25 }}
              className={`toast toast-${toast.type}`}
            >
              <p>{toast.title}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
