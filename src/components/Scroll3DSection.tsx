import { useEffect, useRef, useState, ReactNode } from 'react';

interface Scroll3DSectionProps {
  children: ReactNode;
  className?: string;
  transformType?: 'rotate' | 'scale' | 'perspective' | 'flip';
}

export function Scroll3DSection({
  children,
  className = '',
  transformType = 'perspective'
}: Scroll3DSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = rect.top - windowHeight;
      const end = rect.bottom;
      const total = end - start;

      const currentProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / total));
      setProgress(currentProgress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTransform = () => {
    const easeProgress = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    switch (transformType) {
      case 'rotate':
        return `perspective(1000px) rotateY(${(1 - easeProgress) * -90}deg)`;
      case 'scale':
        return `perspective(1000px) scale(${0.8 + easeProgress * 0.2}) translateZ(${(1 - easeProgress) * -200}px)`;
      case 'flip':
        return `perspective(1000px) rotateX(${(1 - easeProgress) * 90}deg)`;
      case 'perspective':
      default:
        return `perspective(1000px) translateZ(${(easeProgress - 0.5) * 200}px) rotateX(${(0.5 - easeProgress) * 20}deg)`;
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`transition-transform duration-100 ease-out ${className}`}
      style={{
        transform: getTransform(),
        opacity: 0.3 + progress * 0.7,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}
