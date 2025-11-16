import { useState, useRef, useEffect } from 'react';

interface MagneticTextProps {
  text: string;
  strength?: number;
  className?: string;
}

export function MagneticText({ text, strength = 20, className = '' }: MagneticTextProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;

      const rect = textRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < 200) {
        const force = (200 - distance) / 200;
        setPosition({
          x: (distanceX / distance) * force * strength,
          y: (distanceY / distance) * force * strength,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return (
    <span
      ref={textRef}
      className={`inline-block transition-transform duration-300 ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {text}
    </span>
  );
}
