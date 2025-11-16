import { useEffect, useRef } from 'react';
import { createScrollFade, createParallax, killScrollTrigger } from '../utils/scrollTriggerUtils';

interface ScrollTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

export function ScrollTransition({ children, delay = 0 }: ScrollTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const animation = createScrollFade(element, { delay });

    return () => {
      animation.kill();
      killScrollTrigger(element);
    };
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}

export function ScrollFadeIn({ children, delay = 0 }: ScrollTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const animation = createScrollFade(element, {
      delay,
      start: 'top 80%',
      end: 'top 40%'
    });

    return () => {
      animation.kill();
      killScrollTrigger(element);
    };
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}

export function ParallaxSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const animation = createParallax(element);

    return () => {
      animation.kill();
      killScrollTrigger(element);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
