import { useRef, useState, ReactNode } from 'react';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function HolographicCard({
  children,
  className = '',
  intensity = 1
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10 * intensity;
    const rotateY = ((x - centerX) / centerX) * 10 * intensity;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-inherit pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%,
            rgba(123, 0, 255, 0.3) 0%,
            rgba(149, 51, 255, 0.2) 25%,
            transparent 50%)`,
          filter: 'blur(20px)',
        }}
      />

      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-inherit"
        style={{
          background: `linear-gradient(${rotation.y * 3}deg,
            rgba(123, 0, 255, 0.1),
            rgba(149, 51, 255, 0.1),
            rgba(173, 92, 255, 0.1))`,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="relative z-10">
        {children}
      </div>

      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, transparent 100%)',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
        }}
      />

      <div
        className="absolute bottom-0 left-0 w-32 h-32 opacity-10 pointer-events-none"
        style={{
          background: 'linear-gradient(315deg, rgba(236, 72, 153, 0.4) 0%, transparent 100%)',
          clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
        }}
      />

      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none" style={{ transform: 'translate(-50%, -50%) rotate(15deg)' }}>
        <polygon points="20,80 80,20 140,80 80,140" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" />
      </svg>

      <div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          boxShadow: `
            0 0 20px rgba(123, 0, 255, 0.1),
            inset 0 0 40px rgba(123, 0, 255, 0.05)
          `,
        }}
      />
    </div>
  );
}
