import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isMoving = false;
    let rafId = null;
    let isHovered = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = '1';
      ring.style.opacity = '1';

      if (!isMoving) {
        isMoving = true;
        renderRing();
      }

      // Check if hovering over interactive element
      const target = e.target;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('[role="button"]') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('.cursor-pointer') ||
          target.closest('.cursor-zoom-in'))
      ) {
        if (!isHovered) {
          isHovered = true;
          ring.style.width = '44px';
          ring.style.height = '44px';
          ring.style.borderColor = '#60a5fa';
          ring.style.backgroundColor = 'rgba(59, 130, 246, 0.18)';
          dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(1.4)`;
        }
      } else if (isHovered) {
        isHovered = false;
        ring.style.width = '32px';
        ring.style.height = '32px';
        ring.style.borderColor = 'rgba(59, 130, 246, 0.6)';
        ring.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(1)`;
      }
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      isMoving = false;
    };

    const onMouseDown = () => {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(0.7)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(0.85)`;
    };

    const onMouseUp = () => {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.4 : 1})`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(1)`;
    };

    const renderRing = () => {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.22;
      ringY += dy * 0.22;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        rafId = requestAnimationFrame(renderRing);
      } else {
        isMoving = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Inner Glowing Blue Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999999] h-2.5 w-2.5 rounded-full bg-[#3b82f6] opacity-0 transition-opacity duration-150 will-change-transform"
        style={{
          boxShadow: '0 0 10px #3b82f6, 0 0 20px #2563eb, 0 0 30px rgba(59,130,246,0.6)',
        }}
        aria-hidden
      />

      {/* Trailing Outer Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[999998] h-8 w-8 rounded-full border border-stc-primary/60 bg-stc-primary/10 opacity-0 transition-[width,height,background-color,border-color,opacity] duration-200 ease-out will-change-transform"
        style={{
          boxShadow: '0 0 16px rgba(59, 130, 246, 0.25)',
        }}
        aria-hidden
      />
    </>
  );
}
