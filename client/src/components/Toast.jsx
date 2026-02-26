import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiXMark } from 'react-icons/hi2';
import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ message, type, onClose }) {
  const icons = {
    success: HiCheckCircle,
    error: HiXCircle,
    info: HiInformationCircle,
  };

  const styles = {
    success: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/40 text-emerald-300',
    error: 'from-red-500/20 to-red-600/10 border-red-500/40 text-red-300',
    info: 'from-cyan-500/20 to-sky-600/10 border-cyan-500/40 text-cyan-300',
  };

  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      className={`pointer-events-auto flex items-center gap-3 rounded-2xl border bg-gradient-to-br ${styles[type]} px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl min-w-[280px] max-w-md`}
    >
      <Icon className="text-xl flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 rounded-lg p-1 hover:bg-white/10 transition-colors"
      >
        <HiXMark className="text-lg" />
      </button>
    </motion.div>
  );
}
