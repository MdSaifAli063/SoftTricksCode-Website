import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTopButton({ hidden }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && !hidden && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-stc-navy/95 text-white shadow-lg backdrop-blur-md transition hover:border-stc-primary/40 hover:bg-stc-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stc-primary"
          aria-label="Back to top"
        >
          <ArrowUp size={22} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
