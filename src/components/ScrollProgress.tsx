import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let timeoutId: number | null = null;
    const updateScrollProgress = () => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = window.scrollY;
          const progress = (scrolled / scrollHeight) * 100;
          setScrollProgress(progress);
          timeoutId = null;
        }, 50);
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-secondary-200 z-50">
        <div
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-accent text-white shadow-lg hover:shadow-xl hover:bg-accent-600 transition-all duration-300 z-40 flex items-center justify-center group ${
          scrollProgress > 10 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </>
  );
}
