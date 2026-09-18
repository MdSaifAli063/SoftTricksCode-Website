import { useRef, useEffect, useState, Suspense } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from 'framer-motion';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import ErrorBoundary from './ErrorBoundary';

export const TextHoverEffect = ({
  text = 'Soft Tricks Code',
  duration = 0.3,
  className = '',
}) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: null, y: null });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 920 115"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        onTouchStart={(e) => {
          setHovered(true);
          if (e.touches && e.touches[0]) {
            setCursor({ x: e.touches[0].clientX, y: e.touches[0].clientY });
          }
        }}
        onTouchMove={(e) => {
          if (e.touches && e.touches[0]) {
            setCursor({ x: e.touches[0].clientX, y: e.touches[0].clientY });
          }
        }}
        onTouchEnd={() => setHovered(false)}
        onTouchCancel={() => setHovered(false)}
        className={clsx('select-none uppercase cursor-pointer w-full h-auto', className)}
      >
        <defs>
          <linearGradient
            id="textGradient"
            gradientUnits="userSpaceOnUse"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="25%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#80eeb4" />
            <stop offset="75%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          <motion.radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r={hovered ? '28%' : '18%'}
            initial={{ cx: '50%', cy: '50%' }}
            animate={maskPosition}
            transition={{ duration: duration ?? 0, ease: 'easeOut' }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>
          <mask id="textMask">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#revealMask)"
            />
          </mask>
        </defs>

        {/* Base outline - crisp, clear contrast */}
        <text
          x="50%"
          y="53%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="1.2"
          fontSize="76"
          fontWeight="900"
          className="fill-transparent stroke-slate-400/60 font-sans tracking-wide"
          style={{ opacity: hovered ? 0.9 : 0.65 }}
        >
          {text}
        </text>

        {/* Animated glowing neon stroke outline - radiant vibrant cyan */}
        <motion.text
          x="50%"
          y="53%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="1.5"
          fontSize="76"
          fontWeight="900"
          className="fill-transparent stroke-sky-400 dark:stroke-stc-cyan font-sans tracking-wide"
          style={{
            filter:
              'drop-shadow(0 0 8px rgba(56, 189, 248, 0.85)) drop-shadow(0 0 24px rgba(37, 99, 235, 0.5))',
          }}
          initial={{ strokeDashoffset: 4000, strokeDasharray: 4000 }}
          animate={{
            strokeDashoffset: 0,
            strokeDasharray: 4000,
          }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
          }}
        >
          {text}
        </motion.text>

        {/* Rainbow gradient text revealed under cursor / touch mask - vivid radiance */}
        <text
          x="50%"
          y="53%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="url(#textGradient)"
          strokeWidth="1.6"
          fontSize="76"
          fontWeight="900"
          mask="url(#textMask)"
          className="fill-transparent font-sans tracking-wide transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0.7 }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

const AURORA_COLORS = ['#13FFAA', '#1E67C6', '#CE84CF', '#DD335C'];

export const FooterBackgroundGradient = () => {
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
};

export default TextHoverEffect;

