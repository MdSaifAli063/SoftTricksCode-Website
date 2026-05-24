import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import VanillaTilt from 'vanilla-tilt';
import { useIsTouchDevice } from '../../hooks/useMediaQuery';

export default function GlassCard({
  children,
  className,
  tilt = true,
  glow = false,
  light = false,
  ...motionProps
}) {
  const ref = useRef(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (!tilt || isTouch || light || !ref.current) return;
    const el = ref.current;
    VanillaTilt.init(el, {
      max: 6,
      speed: 400,
      glare: true,
      'max-glare': 0.12,
      scale: 1.01,
    });
    return () => el.vanillaTilt?.destroy();
  }, [tilt, isTouch, light]);

  return (
    <motion.div
      ref={ref}
      className={clsx(
        light ? 'fly-card-light' : glow ? 'fly-card-glow' : 'fly-card',
        'p-6 transition-all duration-300 sm:p-8',
        !light && 'hover:border-stc-primary/40 hover:shadow-fly',
        className
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
