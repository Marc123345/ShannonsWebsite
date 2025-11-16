import { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

export function CustomCursorTrail() {
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 1024 || 'ontouchstart' in window);

  if (isMobile) return null;

  return <CustomCursorTrailDesktop />;
}

function CustomCursorTrailDesktop() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const trailLength = 6;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const updateTrail = () => {
      const now = performance.now();
      if (now - lastUpdateTime.current < 32) {
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    animationFrameRef.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

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
            willChange: 'opacity',
          }}
        />
      ))}
    </div>
  );
}
