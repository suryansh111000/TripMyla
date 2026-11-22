import React, { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "", playKey }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!playKey) {
      setCount(0);
      return;
    }

    let frameId;
    const duration = 1300;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [playKey, target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function TrustMetricsStrip({ metrics = [] }) {
  const sectionRef = useRef(null);
  const [playCount, setPlayCount] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayCount((prev) => prev + 1);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-[#18125A] text-white border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs"
          >
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">
              <AnimatedCounter
                target={item.target}
                suffix={item.suffix}
                playKey={playCount}
              />
            </div>
            <p className="mt-1.5 text-xs sm:text-sm font-semibold text-slate-200 uppercase tracking-wider">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}