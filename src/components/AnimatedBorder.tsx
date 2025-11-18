import { useEffect, useRef, useState, useMemo } from 'react';

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
  const pathRef = useRef<SVGRectElement>(null);
  const [isVisible, setIsVisible] = useState(!trigger);
  const gradientId = useMemo(() => `borderGradient-${Math.random().toString(36).substr(2, 9)}`, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [trigger, delay]);

  const dashLength = useMemo(() => {
    if (!pathRef.current) return 1000;
    return pathRef.current.getTotalLength();
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
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
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#borderGlow)"
          strokeDasharray={dashLength}
          strokeDashoffset={isVisible ? 0 : dashLength}
          style={{
            transition: `stroke-dashoffset ${duration}s cubic-bezier(0.65, 0, 0.35, 1)`,
          }}
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
  const [isVisible, setIsVisible] = useState(!trigger);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [trigger, delay]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {children}
      <svg className="absolute left-0 bottom-0 w-full h-1 pointer-events-none" style={{ overflow: 'visible' }}>
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="100%"
          strokeDashoffset={isVisible ? '0%' : '100%'}
          style={{
            transition: `stroke-dashoffset ${duration}s cubic-bezier(0.65, 0, 0.35, 1)`,
          }}
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
  const [isVisible, setIsVisible] = useState(false);

  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

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
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={isVisible ? offset : circumference}
          style={{
            transition: `stroke-dashoffset ${duration}s cubic-bezier(0.65, 0, 0.35, 1)`,
          }}
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
