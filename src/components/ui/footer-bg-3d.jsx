/**
 * footer-bg-3d.jsx
 * Isolated Three.js starfield + aurora gradient for the Footer.
 * This file is dynamically imported (lazy) so Three.js is NOT parsed
 * on initial page load — it only loads when the footer scrolls into view.
 */
import { useEffect, Suspense } from 'react';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from 'framer-motion';
import ErrorBoundary from './ErrorBoundary';

const AURORA_COLORS = ['#13FFAA', '#1E67C6', '#CE84CF', '#DD335C'];

export function FooterBackgroundGradient() {
  const color = useMotionValue(AURORA_COLORS[0]);

  useEffect(() => {
    const controls = animate(color, AURORA_COLORS, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
    return () => controls.stop();
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 10%, #030712 50%, ${color})`;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Animated Aurora Radial Glow */}
      <motion.div
        style={{ backgroundImage }}
        className="absolute inset-0 opacity-40 transition-opacity"
      />

      {/* 3D Twinkling Starfield */}
      <div className="absolute inset-0 opacity-55">
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 1] }}
              gl={{ antialias: false, alpha: true }}
              dpr={[1, 1.5]}
            >
              <Stars radius={50} count={2000} factor={4} fade speed={1.5} />
            </Canvas>
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Subtle blend vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-stc-black/40 via-transparent to-stc-black/60 pointer-events-none" />
    </div>
  );
}

export default FooterBackgroundGradient;
