import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';

interface CursorHoverEffectProps {
  color?: string;
  particleColor?: string;
  rippleSize?: number;
  particleInterval?: number;
}

export function CursorHoverEffect({
  color = 'rgba(123, 0, 255, 0.1)',
  particleColor = 'rgba(123, 0, 255, 0.2)',
  rippleSize = 100,
  particleInterval = 200
}: CursorHoverEffectProps) {
  const rippleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const isUnmountedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const lastRippleTime = useRef(0);
  const rippleThrottle = 100;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isUnmountedRef.current || !rippleRef.current || isMobile) return;

    const now = performance.now();
    if (now - lastRippleTime.current < rippleThrottle) return;
    lastRippleTime.current = now;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (isUnmountedRef.current || !rippleRef.current) return;

      const { clientX, clientY } = e;

      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full pointer-events-none';
      ripple.style.cssText = `
        width: ${rippleSize}px;
        height: ${rippleSize}px;
        background: ${color};
        left: ${clientX}px;
        top: ${clientY}px;
        transform: translate(-50%, -50%) scale(0);
        will-change: transform, opacity;
      `;
      rippleRef.current.appendChild(ripple);

      gsap.to(ripple, {
        scale: 3,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          if (!isUnmountedRef.current) {
            ripple.remove();
          }
        }
      });
    });
  }, [isUnmountedRef, isMobile, color, rippleSize]);

  const createParticles = useCallback(() => {
    if (isUnmountedRef.current || !particlesRef.current || isMobile) return;

    if (particlesRef.current.children.length > 10) {
      return;
    }

    const particle = document.createElement('div');
    particle.className = 'absolute w-2 h-2 rounded-full';
    particle.style.cssText = `
      background: ${particleColor};
      left: ${Math.random() * 100}%;
      top: 100%;
      will-change: transform;
    `;
    particlesRef.current.appendChild(particle);

    gsap.to(particle, {
      y: `-${Math.random() * 100 + 100}%`,
      x: `${(Math.random() - 0.5) * 50}%`,
      opacity: 0,
      duration: Math.random() * 3 + 2,
      ease: 'power1.out',
      onComplete: () => {
        if (!isUnmountedRef.current) {
          particle.remove();
        }
      }
    });
  }, [isUnmountedRef, isMobile, particleColor]);

  useEffect(() => {
    if (!isMobile) {
      const particleIntervalId = setInterval(createParticles, particleInterval);
      document.addEventListener('mousemove', handleMouseMove, { passive: true });

      return () => {
        clearInterval(particleIntervalId);
        document.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [handleMouseMove, createParticles, isMobile, particleInterval]);

  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={rippleRef}
        className="fixed inset-0 pointer-events-none z-[1001] overflow-hidden"
        aria-hidden="true"
      />
      <div
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none z-[1000] overflow-hidden"
        aria-hidden="true"
      />
    </>
  );
}
