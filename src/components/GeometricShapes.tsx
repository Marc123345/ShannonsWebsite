import { useEffect, useState } from 'react';

interface GeometricShapesProps {
  variant?: 'hero' | 'section' | 'floating';
}

export function GeometricShapes({ variant = 'section' }: GeometricShapesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (variant === 'hero') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute -top-20 -right-40 w-[600px] h-[600px] opacity-10 animate-float-elegant" style={{ animationDuration: '20s' }}>
          <polygon points="300,50 500,200 450,450 150,400 50,150" fill="currentColor" className="text-purple-600" />
          <circle cx="300" cy="250" r="100" fill="none" stroke="currentColor" strokeWidth="3" className="text-pink-600" />
        </svg>

        <div
          className="absolute top-1/4 left-20 w-72 h-72 border-4 border-neutral-300/20 animate-float-elegant"
          style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            animationDuration: '18s',
            animationDelay: '2s'
          }}
        />

        <div
          className="absolute bottom-32 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/5 to-pink-600/5 animate-float-elegant"
          style={{
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animationDuration: '25s',
            animationDelay: '5s'
          }}
        />

        <svg className="absolute bottom-20 left-1/3 w-48 h-48 opacity-20" style={{ transform: 'rotate(15deg)' }}>
          <rect x="10" y="10" width="128" height="128" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400" />
          <line x1="10" y1="10" x2="138" y2="138" stroke="currentColor" strokeWidth="1" className="text-neutral-400" />
          <line x1="138" y1="10" x2="10" y2="138" stroke="currentColor" strokeWidth="1" className="text-neutral-400" />
        </svg>
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 right-10 w-64 h-64 bg-purple-600/5 animate-float-elegant"
          style={{
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            animationDuration: '15s'
          }}
        />

        <svg className="absolute bottom-20 left-10 w-80 h-80 opacity-10 animate-spin-slow" style={{ animationDuration: '40s' }}>
          <circle cx="160" cy="160" r="140" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-600" />
          <circle cx="160" cy="160" r="100" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600" />
          <circle cx="160" cy="160" r="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-600" />
        </svg>

        <div
          className="absolute top-1/2 right-1/4 w-56 h-56 border-2 border-neutral-300/10 animate-pulse"
          style={{
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            animationDuration: '8s'
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute top-20 left-20 w-96 h-96 opacity-5 animate-float-elegant" style={{ animationDuration: '22s' }}>
        <polygon points="192,20 350,100 320,280 100,300 40,120" fill="currentColor" className="text-purple-600" />
        <polygon points="150,80 280,120 250,240 120,220 80,100" fill="none" stroke="currentColor" strokeWidth="3" className="text-pink-600" />
      </svg>

      <div
        className="absolute top-1/3 right-10 w-80 h-80 border-4 border-white/5 animate-float-elegant"
        style={{
          clipPath: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)',
          animationDuration: '20s',
          animationDelay: '3s'
        }}
      />

      <div
        className="absolute bottom-40 left-1/4 w-64 h-64 bg-gradient-to-tr from-purple-600/8 to-pink-600/8 animate-float-elegant"
        style={{
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          animationDuration: '18s',
          animationDelay: '6s'
        }}
      />

      <svg className="absolute bottom-10 right-1/3 w-72 h-72 opacity-10" style={{ transform: 'rotate(-25deg)' }}>
        <rect x="36" y="36" width="200" height="200" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" />
        <rect x="86" y="86" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" />
        <circle cx="136" cy="136" r="30" fill="currentColor" className="text-purple-600" opacity="0.3" />
      </svg>

      <div
        className="absolute top-2/3 right-1/4 w-48 h-48 border-2 border-white/10"
        style={{
          transform: 'rotate(30deg)',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
        }}
      />
    </div>
  );
}
