import { useEffect, useState } from 'react';

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const steps = 100;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setIsComplete(true), 800);
          }, 300);
          return 100;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isComplete) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black transition-opacity duration-800 flex items-center justify-center ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <img
            src="https://ik.imagekit.io/qcvroy8xpd/unnamed%20(1).png?updatedAt=1760474246200"
            alt="H2H Logo"
            className="h-40 md:h-56 lg:h-64 w-auto animate-pulse"
          />
        </div>
        <div className="w-64 h-1 bg-neutral-800 overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-brand-purple to-brand-pink transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-6 text-brand-purple text-sm tracking-widest uppercase">Loading {progress}%</p>
      </div>
    </div>
  );
}
