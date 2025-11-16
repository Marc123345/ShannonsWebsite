import { useState, useRef, useEffect, ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  depth?: number;
  className?: string;
}

export function FloatingCard({ children, depth = 20, className = '' }: FloatingCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * depth;
      const rotateY = ((centerX - x) / centerX) * depth;

      setRotation({ x: rotateX, y: rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, depth]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ${className}`}
      style={{
        transform: `
          perspective(1000px)
          rotateX(${rotation.x}deg)
          rotateY(${rotation.y}deg)
          translateZ(${isHovered ? '20px' : '0px'})
        `,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 rounded-lg opacity-0 transition-opacity duration-300 blur-xl"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: 'translateZ(-20px)',
        }}
      />

      <div
        className="absolute top-0 left-0 w-20 h-20 opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'rgba(139, 92, 246, 0.3)',
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          opacity: isHovered ? 0.4 : 0.2,
        }}
      />

      <div
        className="absolute bottom-0 right-0 w-24 h-24 opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'rgba(236, 72, 153, 0.3)',
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          opacity: isHovered ? 0.4 : 0.2,
        }}
      />

      <svg className="absolute top-4 right-4 w-16 h-16 opacity-10 pointer-events-none transition-opacity duration-300" style={{ opacity: isHovered ? 0.2 : 0.1 }}>
        <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="2" />
        <circle cx="32" cy="32" r="16" fill="none" stroke="rgba(236, 72, 153, 0.5)" strokeWidth="2" />
      </svg>

      <div className="relative" style={{ transform: 'translateZ(10px)' }}>
        {children}
      </div>
    </div>
  );
}
