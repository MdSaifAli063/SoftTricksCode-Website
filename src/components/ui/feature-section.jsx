import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

export function FeatureSteps({
  features = [],
  className = '',
  title = null,
  subtitle = null,
  autoPlayInterval = 4000,
  imageHeight = '',
}) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Advance feature on autoPlayInterval
  useEffect(() => {
    if (isPaused || !features.length) return;

    const timer = setInterval(() => {
      setCurrentFeature((curr) => (curr + 1) % features.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [features.length, autoPlayInterval, isPaused]);

  const handleStepClick = (index) => {
    setCurrentFeature(index);
  };

  return (
    <div
      className={cn('w-full relative', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {title && (
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-stc-cyan/30 bg-stc-cyan/10 px-3.5 py-1 text-xs sm:text-sm font-semibold text-stc-cyan mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-stc-cyan animate-pulse" />
            Product Lifecycle & Architecture
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* 2-column Grid: Left column strictly matches header text width (567px); Right column expands 43px wider to the left (1fr) */}
      <div className="grid grid-cols-1 lg:grid-cols-[567px_1fr] gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-stretch w-full">
        {/* Left column: 3 interactive phase cards, strictly equal to the upside header (567px) */}
        <div className="w-full space-y-3 sm:space-y-4 md:space-y-5 flex flex-col justify-between">
          {features.map((feature, index) => {
            const isActive = index === currentFeature;
            const isCompleted = index < currentFeature;

            return (
              <motion.div
                key={index}
                onClick={() => handleStepClick(index)}
                initial={{ opacity: 0.4 }}
                animate={{
                  opacity: isActive ? 1 : 0.85,
                  scale: isActive ? 1.01 : 0.99,
                }}
                transition={{ duration: 0.35 }}
                className={cn(
                  'group relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border transition-all duration-300 backdrop-blur-xl p-3.5 sm:p-5 md:p-6 lg:p-7',
                  isActive
                    ? 'border-white/95 bg-gradient-to-br from-white via-white to-slate-50 shadow-[0_16px_45px_rgba(0,0,0,0.18),0_0_35px_rgba(255,255,255,0.35),0_0_25px_rgba(0,212,255,0.2)] ring-2 ring-stc-primary/40 -translate-y-0.5'
                    : 'border-white/80 bg-white/90 hover:bg-white text-slate-800 shadow-[0_6px_20px_rgba(0,0,0,0.08),0_0_15px_rgba(255,255,255,0.18)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.14),0_0_25px_rgba(255,255,255,0.25)] hover:border-white hover:-translate-y-0.5'
                )}
              >
                {/* Active progress bar indicator along the left edge */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-slate-200 overflow-hidden">
                    <div
                      key={`progress-${currentFeature}`}
                      className="h-full w-full origin-top bg-gradient-to-b from-stc-primary via-blue-500 to-stc-cyan shadow-[0_0_10px_rgba(0,212,255,0.9)]"
                      style={{
                        animation: `featureProgress ${autoPlayInterval}ms linear forwards`,
                        animationPlayState: isPaused ? 'paused' : 'running',
                      }}
                    />
                  </div>
                )}

                <div className="flex items-start gap-3 sm:gap-4 md:gap-5 pl-0.5 sm:pl-1.5">
                  {/* Step Number or Checkmark Circle */}
                  <div
                    className={cn(
                      'flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl font-mono text-xs sm:text-sm md:text-base font-bold transition-all duration-300 border shadow-xs',
                      isActive
                        ? 'border-blue-400 bg-gradient-to-br from-stc-primary to-blue-600 text-white shadow-[0_0_18px_rgba(37,99,235,0.55)] scale-105'
                        : isCompleted
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-stc-primary group-hover:border-blue-200'
                    )}
                  >
                    {isCompleted ? (
                      <Check size={16} className="text-emerald-600 stroke-[2.5] sm:w-5 sm:h-5" />
                    ) : (
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {feature.badge && (
                        <span
                          className={cn(
                            'rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-bold border',
                            isActive
                              ? 'border-blue-200 bg-blue-50 text-stc-primary shadow-xs'
                              : 'border-slate-200 bg-slate-100 text-slate-600'
                          )}
                        >
                          {feature.badge}
                        </span>
                      )}
                    </div>

                    <h3
                      className={cn(
                        'font-serif text-sm sm:text-lg md:text-xl lg:text-2xl font-bold mt-1 sm:mt-1.5 transition-colors leading-snug',
                        isActive ? 'text-slate-950' : 'text-slate-800 group-hover:text-slate-950'
                      )}
                    >
                      {feature.title}
                    </h3>

                    <p
                      className={cn(
                        'mt-1 sm:mt-2 text-xs sm:text-sm md:text-[15px] leading-normal sm:leading-relaxed transition-colors',
                        isActive ? 'text-slate-600' : 'text-slate-500 group-hover:text-slate-600'
                      )}
                    >
                      {feature.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right column: Edge-to-edge Image Showcase (Frame removed, image fills card seamlessly) */}
        <div className="w-full relative flex flex-col h-full min-h-[260px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[540px]">
          {/* Ambient luminous aura behind the active visual */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-stc-primary/40 via-stc-cyan/40 to-blue-500/30 opacity-75 blur-2xl pointer-events-none" />

          <div
            className={cn(
              'relative flex-1 w-full h-full min-h-[260px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[540px] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-slate-950 shadow-2xl backdrop-blur-xl',
              imageHeight
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={feature.image || index}
                      className="absolute inset-0 w-full h-full overflow-hidden"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.title || feature.step}
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                        width="880"
                        height="733"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Glossy top reflection highlight */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/15 via-transparent to-transparent" />

                      {/* Bottom cinematic gradient overlay with caption */}
                      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-32 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent flex items-end p-4 sm:p-6">
                        <div className="w-full flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <span className="text-[11px] font-mono text-stc-cyan uppercase font-semibold">
                              Live Interactive Preview
                            </span>
                            <p className="text-xs sm:text-sm md:text-base font-semibold text-white truncate">
                              {feature.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSteps;
