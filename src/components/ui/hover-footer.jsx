import { useRef, useState } from 'react';
import {
  motion,
} from 'framer-motion';
import clsx from 'clsx';


export const TextHoverEffect = ({
  text = 'Soft Tricks Code',
  duration = 0.25,
  className = '',
}) => {
  const svgRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: 480, cy: 60 });

  const updatePosition = (clientX, clientY) => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      if (svgRect.width > 0 && svgRect.height > 0) {
        const cx = Math.max(0, Math.min(960, ((clientX - svgRect.left) / svgRect.width) * 960));
        const cy = Math.max(0, Math.min(120, ((clientY - svgRect.top) / svgRect.height) * 120));
        setMaskPosition({ cx, cy });
      }
    }
  };

  const handleTouch = (e) => {
    if (e.touches && e.touches[0]) {
      setHovered(true);
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="relative w-full overflow-hidden select-none py-2 sm:py-4">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 960 120"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => {
          setHovered(true);
          updatePosition(e.clientX, e.clientY);
        }}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={() => setHovered(false)}
        onTouchCancel={() => setHovered(false)}
        className={clsx('select-none uppercase cursor-pointer w-full h-auto block', className)}
        style={{
          filter:
            'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5)) drop-shadow(0 0 28px rgba(37, 99, 235, 0.3))',
        }}
      >
        <defs>
          <linearGradient
            id="textGradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="960"
            y2="0"
          >
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="25%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="75%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          <radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r={hovered ? 220 : 0}
            cx={maskPosition.cx}
            cy={maskPosition.cy}
            style={{
              transition: `cx ${duration * 1000}ms ease-out, cy ${duration * 1000}ms ease-out, r 300ms ease-out`,
            }}
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <mask id="textMask">
            <rect
              x="0"
              y="0"
              width="960"
              height="120"
              fill="url(#revealMask)"
            />
          </mask>
        </defs>

        {/* Primary Glowing Neon Cyan Brand Stroke with Brand Color Fills */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          strokeWidth="1.6"
          paintOrder="stroke fill"
          fontSize="72"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          letterSpacing="0.03em"
          stroke="#00d4ff"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDashoffset: 3500, strokeDasharray: 3500 }}
          animate={{ strokeDashoffset: 0, strokeDasharray: 3500 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
          className="select-none"
          xmlSpace="preserve"
        >
          <tspan fill="#ffffff">SOFT </tspan>
          <tspan fill="#3b82f6">TRICKS </tspan>
          <tspan fill="#ffffff">CODE</tspan>
        </motion.text>

        {/* Rainbow Gradient Reveal Layer under touch/mouse spotlight */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          stroke="url(#textGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fontSize="72"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          letterSpacing="0.03em"
          fill="none"
          mask="url(#textMask)"
          className="select-none pointer-events-none"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

export default TextHoverEffect;
