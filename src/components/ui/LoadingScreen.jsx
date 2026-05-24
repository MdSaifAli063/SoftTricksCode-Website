import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 10;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => {
        setDone(true);
        onComplete?.();
      }, 400);
      return () => clearTimeout(t);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-flytech fixed inset-0 z-[10001] flex flex-col items-center justify-center"
          role="status"
          aria-label="Loading"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 mb-8"
          >
            <svg width="100" height="70" viewBox="0 0 120 80" aria-hidden>
              <motion.path
                d="M20 60 L60 12 L100 60"
                fill="none"
                stroke="#00f5ff"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="60"
                cy="48"
                r="8"
                fill="#2563eb"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              />
            </svg>
          </motion.div>

          <BrandLogo
            asLink={false}
            iconSize={40}
            textClassName="text-xl sm:text-2xl"
            className="relative z-10 mb-6"
          />

          <p className="relative z-10 mb-6 text-sm text-stc-gray">Loading your experience...</p>

          <div className="relative z-10 h-1.5 w-56 overflow-hidden rounded-full bg-white/10 sm:w-64">
            <motion.div
              className="h-full rounded-full bg-stc-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
