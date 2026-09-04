import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isWarning = toast.type === 'warning';
          const isDanger = toast.type === 'danger';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md ${
                isSuccess
                  ? 'bg-[#0a0a0a]/95 border-amber-500/40 text-gray-100'
                  : isWarning
                  ? 'bg-[#0a0a0a]/95 border-amber-500/40 text-gray-100'
                  : isDanger
                  ? 'bg-[#0a0a0a]/95 border-rose-500/40 text-gray-100'
                  : 'bg-[#0a0a0a]/95 border-white/20 text-gray-100'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                {isWarning && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                {isDanger && <XCircle className="w-5 h-5 text-rose-400" />}
                {!isSuccess && !isWarning && !isDanger && <Info className="w-5 h-5 text-amber-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white tracking-tight">{toast.title}</h4>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-neutral-400 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
