"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

function Counter({
  from = 0,
  to,
  suffix = "",
  duration = 2,
}: {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration, ease: "easeOut" });
    }
  }, [count, inView, to, duration]);

  return (
    <span ref={nodeRef} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { value: 50, suffix: "K+", label: "Active Users" },
  { value: 250, suffix: "K+", label: "AI Interviews" },
  { value: 95, suffix: "%", label: "Success Rate" },
  { value: 120, suffix: "+", label: "Companies" },
  { value: 10, suffix: "M+", label: "Questions Answered" },
];

export default function Statistics() {
  return (
    <section className="py-20 border-y bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-2"
            >
              <h3 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter">
                <Counter to={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
