import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedBorderProps {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
  borderRadius?: number;
  duration?: number;
  delay?: number;
  trigger?: boolean;
  className?: string;
}

export function AnimatedBorder({
  children,
  color = '#8b5cf6',
  strokeWidth = 2,
  borderRadius = 16,
  duration = 2,
  delay = 0,
  trigger = true,
  className = '',
}: AnimatedBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return;

    const container = containerRef.current;
    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const animation = gsap.to(path, {
      strokeDashoffset: 0,
      duration,
      delay,
      ease: 'power2.inOut',
      scrollTrigger: trigger ? {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      } : undefined,
    });

    return () => {
      animation.kill();
      if (trigger) {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === container) st.kill();
        });
      }
    };
  }, [duration, delay, trigger]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`borderGradient-${Math.random()}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.8" />
          </linearGradient>
          <filter id="borderGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect
          ref={pathRef}
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={`calc(100% - ${strokeWidth}px)`}
          height={`calc(100% - ${strokeWidth}px)`}
          rx={borderRadius}
          fill="none"
          stroke={`url(#borderGradient-${Math.random()})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#borderGlow)"
        />
      </svg>
      {children}
    </div>
  );
}

export function AnimatedUnderline({
  children,
  color = '#8b5cf6',
  strokeWidth = 2,
  duration = 1.5,
  delay = 0,
  trigger = true,
  className = '',
}: {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  trigger?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const container = containerRef.current;
    const line = lineRef.current;
    const length = line.getTotalLength();

    gsap.set(line, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const animation = gsap.to(line, {
      strokeDashoffset: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: trigger ? {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      } : undefined,
    });

    return () => {
      animation.kill();
      if (trigger) {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === container) st.kill();
        });
      }
    };
  }, [duration, delay, trigger]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {children}
      <svg className="absolute left-0 bottom-0 w-full h-1 pointer-events-none" style={{ overflow: 'visible' }}>
        <line
          ref={lineRef}
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function AnimatedCircleProgress({
  progress = 100,
  size = 120,
  strokeWidth = 8,
  color = '#8b5cf6',
  duration = 2,
  delay = 0,
  children,
  className = '',
}: {
  progress?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  duration?: number;
  delay?: number;
  children?: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!containerRef.current || !circleRef.current) return;

    const container = containerRef.current;
    const circle = circleRef.current;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    gsap.set(circle, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    gsap.to(circle, {
      strokeDashoffset: offset,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [progress, size, strokeWidth, duration, delay]);

  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        <circle
          ref={circleRef}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
