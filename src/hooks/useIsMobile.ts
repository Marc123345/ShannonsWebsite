import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < breakpoint || 'ontouchstart' in window;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}
