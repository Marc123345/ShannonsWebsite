import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PathPoint {
  x: number;
  y: number;
  controlX?: number;
  controlY?: number;
}

export function MorphingPathLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const container = svgRef.current;

    const pathShapes = [
      'M 50,10 Q 50,30 50,50 Q 50,70 50,90',
      'M 30,10 Q 50,30 70,50 Q 50,70 30,90',
      'M 50,10 Q 70,30 50,50 Q 30,70 50,90',
      'M 20,10 Q 50,20 80,30 Q 50,50 20,70 Q 50,80 80,90',
      'M 50,10 L 50,40 Q 70,50 50,60 L 50,90',
      'M 50,10 Q 30,25 50,40 Q 70,55 50,70 Q 30,85 50,100',
      'M 10,50 Q 30,30 50,50 Q 70,70 90,50',
    ];

    const sections = document.querySelectorAll('[data-morph-section]');

    sections.forEach((section, index) => {
      const targetShape = pathShapes[index % pathShapes.length];
      const nextShape = pathShapes[(index + 1) % pathShapes.length];

      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;

          gsap.to(path, {
            attr: { d: targetShape },
            duration: 0.3,
            ease: 'sine.inOut',
          });

          const opacity = Math.sin(progress * Math.PI);
          gsap.to(path, {
            opacity: 0.15 + opacity * 0.25,
            duration: 0.2,
          });

          if (progress > 0.8 && nextShape) {
            gsap.to(path, {
              attr: { d: nextShape },
              duration: 0.5,
              ease: 'power2.inOut',
            });
          }
        },
      });
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
    });

    const breatheAnimation = gsap.timeline({ repeat: -1, yoyo: true });
    breatheAnimation.to(path, {
      filter: 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.3))',
      duration: 3,
      ease: 'sine.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      breatheAnimation.kill();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 mix-blend-lighten">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          filter: 'blur(0.3px)',
        }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#a78bfa', stopOpacity: 0.25 }} />
            <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.35 }} />
            <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 0.25 }} />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <path
          ref={pathRef}
          d="M 50,10 Q 50,30 50,50 Q 50,70 50,90"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="0.12"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
          filter="url(#glow)"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: '1000',
          }}
        />
      </svg>
    </div>
  );
}
