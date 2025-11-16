import { ReactNode, useEffect, useRef, useState, Children } from 'react';

interface StaggeredGridProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggeredGrid({ children, staggerDelay = 0.1, className = '' }: StaggeredGridProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const childrenArray = Children.toArray(children);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          childrenArray.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index]);
            }, index * staggerDelay * 1000);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [staggerDelay, childrenArray.length]);

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => (
        <div
          className="transition-all duration-700"
          style={{
            opacity: visibleItems.includes(index) ? 1 : 0,
            transform: visibleItems.includes(index) ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
