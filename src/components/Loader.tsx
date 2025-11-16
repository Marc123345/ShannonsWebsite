import { useEffect, useState, useRef } from "react";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startTime = useRef<number | null>(null);

  // Smooth RAF-based animation
  useEffect(() => {
    const duration = 3200; // total load time (ms)

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;

      // Calculate % based on time passed
      const nextProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(nextProgress);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        // fade out sequence
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => setIsComplete(true), 700);
        }, 150);
      }
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (isComplete) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999] 
        flex items-center justify-center 
        bg-black
        transition-opacity duration-700
        ${fadeOut ? "opacity-0" : "opacity-100"}
      `}
    >
      {/* Scanline + Glow Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay">
        <div
          className="
            w-full h-full 
            bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]
            bg-[length:100%_4px]
            animate-scanlines
          "
        />
      </div>

      {/* Content */}
      <div className="text-center relative z-10">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="https://ik.imagekit.io/qcvroy8xpd/unnamed%20(1).png?updatedAt=1760474246200"
            alt="H2H Logo"
            className="
              h-40 md:h-56 lg:h-64 w-auto 
              animate-softPulse
              drop-shadow-[0_0_28px_rgba(255,255,255,0.12)]
            "
          />
        </div>

        {/* Progress Bar */}
        <div
          className="
            w-64 h-[6px] overflow-hidden mx-auto 
            bg-neutral-900/80 rounded-full relative
          "
        >
          {/* Glow behind bar */}
          <div
            className="
              absolute inset-0 
              bg-gradient-to-r from-purple-600/20 to-pink-500/20
              blur-[10px]
            "
            style={{ width: `${progress}%` }}
          />

          {/* Main bar */}
          <div
            className="
              h-full 
              bg-gradient-to-r from-purple-600 to-pink-500
              transition-all duration-75
            "
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <p
          className="
            mt-6 
            text-purple-400 
            text-xs tracking-[0.25em]
            uppercase
            opacity-90
            animate-textFlicker
          "
        >
          Loading {Math.round(progress)}%
        </p>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes softPulse {
          0% { opacity: 0.7; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.7; transform: scale(0.98); }
        }
        .animate-softPulse {
          animation: softPulse 2.2s infinite ease-in-out;
        }

        @keyframes scanlines {
          0% { background-position-y: 0; }
          100% { background-position-y: 100%; }
        }
        .animate-scanlines {
          animation: scanlines 6s linear infinite;
        }

        @keyframes textFlicker {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.5; }
        }
        .animate-textFlicker {
          animation: textFlicker 1.8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
