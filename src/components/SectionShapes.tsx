import { useEffect, useState } from 'react';

interface SectionShapesProps {
  variant: 'hero' | 'about' | 'services' | 'work' | 'testimonials' | 'contact' | 'brands';
}

export function SectionShapes({ variant }: SectionShapesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  switch (variant) {
    case 'hero':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/10 to-transparent rounded-full blur-3xl animate-float-elegant" />
          <div className="absolute bottom-1/4 -right-48 w-[400px] h-[400px] bg-gradient-to-tl from-pink-600/8 to-transparent rounded-full blur-3xl animate-float-elegant" style={{ animationDelay: '3s', animationDuration: '10s' }} />
          <div className="absolute top-1/3 right-1/4 w-px h-96 bg-gradient-to-b from-transparent via-neutral-300/30 to-transparent" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-neutral-300/30 to-transparent" />
        </div>
      );

    case 'about':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-[400px] h-[400px] border border-neutral-200/40 rounded-full animate-float-elegant" style={{ animationDuration: '15s' }} />
          <div className="absolute bottom-20 right-20 w-[300px] h-[300px] border border-neutral-200/30 animate-float-elegant" style={{ animationDuration: '12s', animationDelay: '2s', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-neutral-200/20 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent" />
        </div>
      );

    case 'services':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.03),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.03),transparent_50%)]" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] border border-white/5 rounded-full animate-float-elegant" style={{ animationDuration: '20s' }} />
        </div>
      );

    case 'work':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.04),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.04),transparent_50%)]" />
          <div className="absolute top-20 left-20 w-[350px] h-[350px] border border-white/5 animate-float-elegant" style={{ animationDuration: '18s', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />
          <div className="absolute bottom-20 right-20 w-[400px] h-[400px] border border-white/5 rounded-full animate-float-elegant" style={{ animationDuration: '22s', animationDelay: '3s' }} />
        </div>
      );

    case 'testimonials':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-10 right-1/4 w-72 h-72 opacity-5 animate-pulse">
            <circle cx="144" cy="144" r="120" fill="none" stroke="currentColor" strokeWidth="3" className="text-brand-pink" />
            <circle cx="144" cy="144" r="80" fill="none" stroke="currentColor" strokeWidth="3" className="text-brand-purple" />
            <circle cx="144" cy="144" r="40" fill="currentColor" className="text-brand-pink" opacity="0.3" />
          </svg>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tr from-brand-purple/10 to-brand-pink/10 transform rotate-12 animate-float-elegant" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />
          <div className="absolute top-1/2 right-10 w-48 h-48 border-4 border-brand-purple/10" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
        </div>
      );

    case 'contact':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-brand-purple/20 to-transparent rounded-full blur-3xl" />
          <svg className="absolute bottom-20 left-20 w-80 h-80 opacity-5 animate-spin-slow" style={{ animationDuration: '35s' }}>
            <path d="M 160 40 L 280 160 L 160 280 L 40 160 Z" fill="currentColor" className="text-brand-pink" />
            <circle cx="160" cy="160" r="60" fill="currentColor" className="text-brand-purple" opacity="0.5" />
          </svg>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 border-4 border-brand-pink/10 rounded-full animate-pulse" />
        </div>
      );

    case 'brands':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-4 opacity-5">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-full border border-brand-purple/30 animate-pulse"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-brand-purple/10 to-brand-pink/10 blur-3xl animate-float-elegant" />
        </div>
      );

    default:
      return null;
  }
}
