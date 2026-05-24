import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const posRef = useRef(pos);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      document.body.style.cursor = 'auto';
      return;
    }
    setEnabled(true);

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos(posRef.current);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    let raf;
    const animateRing = () => {
      setRingPos((prev) => ({
        x: prev.x + (posRef.current.x - prev.x) * 0.15,
        y: prev.y + (posRef.current.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[10000] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stc-cyan mix-blend-difference"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: visible ? 1 : 0,
          boxShadow: '0 0 10px #00f5ff',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-stc-cyan/50"
        style={{
          left: ringPos.x,
          top: ringPos.y,
          opacity: visible ? 1 : 0,
        }}
        aria-hidden
      />
    </>
  );
}
