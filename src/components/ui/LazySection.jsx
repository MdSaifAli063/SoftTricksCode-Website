import { useState, useEffect, useRef } from 'react';

/**
 * LazySection mounts heavy below-the-fold components only when they are
 * within `rootMargin` of the viewport (default 500px ahead of scroll).
 * This eliminates forced reflows, long main-thread tasks, and unneeded DOM nodes
 * from the critical initial page load.
 */
export default function LazySection({ children, minHeight = '200px', rootMargin = '500px' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        { rootMargin }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      setInView(true);
    }
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {inView ? children : <div style={{ minHeight }} aria-hidden="true" />}
    </div>
  );
}
