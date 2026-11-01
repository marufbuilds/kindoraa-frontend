 
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    let animationFrame = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      if (shouldReduceMotion) {
        setCount(target);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration, shouldReduceMotion]);

  return { count, ref };
}

function StatItem({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className="w-full text-center">
      <h3 className="text-2xl font-bold tracking-tight text-white tabular-nums sm:text-3xl md:text-4xl lg:text-5xl">
        {count.toLocaleString()}+
      </h3>

      <p className="mt-2 text-xs font-medium text-white/80 sm:text-sm md:text-base">
        {label}
      </p>
    </div>
  );
}

const stats = [
  { value: 2400, label: "Active Volunteers" },
  { value: 180, label: "Events Hosted" },
  { value: 12800, label: "Hours Contributed" },
];

export default function Stats() {
  return (
    <section className="w-full bg-[#1a5c34] py-10 sm:py-14 lg:py-16">
      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 items-center gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 text-center md:col-span-3 lg:col-span-1 lg:text-left"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-200 sm:text-sm">
              Our Impact
            </p>

            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              Small Actions,
              <br className="hidden lg:block" />
              Big Changes.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/80 sm:text-base lg:mx-0">
              Together, we are building stronger communities and creating
              meaningful change through every action.
            </p>
          </motion.div>

          {/* Statistics */}
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              className={`flex w-full justify-center ${
                index === 2
                  ? "col-span-2 md:col-span-1"
                  : "col-span-1"
              }`}
            >
              <StatItem value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
