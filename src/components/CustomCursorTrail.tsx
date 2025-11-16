import { useEffect, useRef, useState, useMemo } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

export function CustomCursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const trailLength = 6;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const updateTrail = () => {
      const now = performance.now();
      if (now - lastUpdateTime.current < 16) {
        animationFrameRef.current = requestAnimationFrame(updateTrail);
        return;
      }
      lastUpdateTime.current = now;

      setTrail((prevTrail) => {
        const newTrail = [
          { x: mousePos.current.x, y: mousePos.current.y, opacity: 1 },
          ...prevTrail.slice(0, trailLength - 1).map((point, index) => ({
            ...point,
            opacity: 1 - (index + 1) / trailLength,
          })),
        ];
        return newTrail;
      });

      animationFrameRef.current = requestAnimationFrame(updateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    animationFrameRef.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trail.map((point, index) => (
        <div
          key={index}
          className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
            opacity: point.opacity * 0.6,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      ))}
    </div>
  );
}
