"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AnimatedResultItem = {
  label: string;
  value: string;
  period: string;
  note: string;
  numericValue?: number;
  valueFormat?: "percent" | "rank";
};

const DURATION_MS = 1600;
const STAGGER_MS = 180;
const EASE_OUT_EXPO = (t: number): number =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

const formatDisplay = (current: number, format: "percent" | "rank"): string => {
  const n = Math.round(current);
  if (format === "percent") return `${n}%`;
  return `#${n}`;
};

type AnimatedCardProps = {
  result: AnimatedResultItem;
  index: number;
  hasStarted: boolean;
  onAnimationEnd: () => void;
};

const AnimatedCard = ({
  result,
  index,
  hasStarted,
  onAnimationEnd,
}: AnimatedCardProps) => {
  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (result.numericValue != null && result.valueFormat) {
      return formatDisplay(0, result.valueFormat);
    }
    return result.value;
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const hasEndedRef = useRef(false);
  const hasStartedAnimationRef = useRef(false);

  const target = result.numericValue ?? 0;
  const format = result.valueFormat ?? "percent";
  const isAnimated = result.numericValue != null && result.valueFormat;

  useEffect(() => {
    if (!hasStarted || !isAnimated || hasStartedAnimationRef.current) return;
    hasStartedAnimationRef.current = true;

    const staggerDelay = index * STAGGER_MS;
    const timeoutId = window.setTimeout(() => {
      setIsAnimating(true);
      startTimeRef.current = null;

      const tick = (now: number) => {
        if (startTimeRef.current == null) startTimeRef.current = now;
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / DURATION_MS, 1);
        const eased = EASE_OUT_EXPO(progress);
        const current = eased * target;
        setDisplayValue(formatDisplay(current, format));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayValue(formatDisplay(target, format));
          if (!hasEndedRef.current) {
            hasEndedRef.current = true;
            onAnimationEnd();
          }
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }, staggerDelay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafRef.current);
    };
  }, [hasStarted, isAnimated, index, target, format, onAnimationEnd]);

  return (
    <div
      className="rounded-xl border-2 border-cream/10 bg-cream/5 p-6 lg:p-8 text-left transition-all duration-300 hover:border-cream/20 hover:bg-cream/[0.08] focus-within:border-cream/20 focus-within:ring-2 focus-within:ring-gold/30 focus-within:ring-offset-2 focus-within:ring-offset-navy"
      tabIndex={0}
      style={{
        transform: hasStarted ? "scale(1)" : "scale(0.97)",
        opacity: hasStarted ? 1 : 0.85,
        transition:
          "opacity 0.5s ease-out, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transitionDelay: hasStarted ? `${index * 80}ms` : "0ms",
      }}
    >
      <p className="text-cream/70 text-xs font-semibold uppercase tracking-wider mb-1">
        {result.label}
      </p>
      <p
        className="font-serif text-4xl lg:text-5xl text-gold mb-1 tabular-nums min-h-[1.2em]"
        aria-live="polite"
        aria-atomic="true"
      >
        {displayValue}
      </p>
      <p className="text-cream/80 text-sm font-medium mb-2">{result.period}</p>
      <p className="text-cream/50 text-xs">{result.note}</p>
    </div>
  );
};

type AnimatedResultsSectionProps = {
  results: AnimatedResultItem[];
};

export const AnimatedResultsSection = ({
  results,
}: AnimatedResultsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const hasTriggeredRef = useRef(false);

  const handleAnimationEnd = useCallback(() => {}, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasTriggeredRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasTriggeredRef.current) return;
        hasTriggeredRef.current = true;
        setHasStarted(true);
      },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 bg-navy text-cream"
      aria-labelledby="results-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Performance
          </span>
          <h2
            id="results-heading"
            className="font-serif text-3xl sm:text-4xl text-cream mt-3 mb-4"
          >
            Key Results
          </h2>
          <p className="text-cream/70 text-sm max-w-xl mx-auto">
            Metrics below are illustrative and may be subject to
            confidentiality. Actual figures are shared with qualified
            counterparties under standard diligence and NDA where applicable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {results.map((result, index) => (
            <AnimatedCard
              key={result.label}
              result={result}
              index={index}
              hasStarted={hasStarted}
              onAnimationEnd={handleAnimationEnd}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
