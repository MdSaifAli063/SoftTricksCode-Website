import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_ASSETS } from '../../constants/brand';

export default function Preloader({ onFinish, minDuration = 1000 }) {
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const startTime = performance.now();
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setShouldRender(false);
          if (onFinish) onFinish();
        }, 120);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [minDuration, onFinish]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          key="stc-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030712] select-none"
          style={{ pointerEvents: shouldRender ? 'auto' : 'none' }}
        >
          {/* Ambient Background Glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-72 w-72 rounded-full bg-stc-primary/20 blur-[100px] animate-pulse" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Pulsing Glowing Logo Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute -inset-3 rounded-2xl bg-stc-primary/30 blur-xl animate-pulse" />
              <img
                src={BRAND_ASSETS.logoOnDark100}
                alt="SoftTricksCode"
                width={72}
                height={72}
                className="relative h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              />
            </motion.div>

            {/* Brand Wordmark & Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mt-4 flex flex-col items-center text-center"
            >
              <span className="font-body text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Soft <span className="text-stc-primary-light">Tricks</span> Code
              </span>

              <div className="mt-1 flex w-full max-w-[170px] items-center justify-between gap-1 text-[0.46rem] sm:text-[0.5rem] font-bold uppercase tracking-[0.16em] text-stc-primary-light">
                <span className="h-[1.5px] flex-1 bg-stc-primary-light/90 rounded-full" />
                <span className="whitespace-nowrap px-1">SOFTWARE SOLUTIONS</span>
                <span className="h-[1.5px] flex-1 bg-stc-primary-light/90 rounded-full" />
              </div>

              <p className="mt-3 text-xs sm:text-sm font-medium tracking-wide text-blue-100/90">
                Welcome to Soft Tricks Code
              </p>
            </motion.div>

            {/* Animated Loading Bar & Percentage */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-8 flex flex-col items-center gap-2"
            >
              <div className="relative h-1 w-44 sm:w-52 overflow-hidden rounded-full bg-slate-800/90 border border-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-stc-primary via-stc-primary-light to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <span className="font-mono text-[11px] font-medium text-stc-gray">
                {progress}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
