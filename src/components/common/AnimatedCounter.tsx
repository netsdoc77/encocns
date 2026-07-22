import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}

export default function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2, 
  delay = 0,
  suffix = ''
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(from, to, {
        duration: duration,
        delay: delay,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toString() + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, delay, suffix, isInView]);

  return <span ref={ref}>{from}{suffix}</span>;
}
