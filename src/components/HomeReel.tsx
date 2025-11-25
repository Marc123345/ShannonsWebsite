import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HomeReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=4000',
          scrub: 2,
          pin: true,
          anticipatePin: 1,
        },
      });

      timeline
        .fromTo(
          videoRef.current,
          {
            opacity: 0,
            scale: 1.2,
            filter: 'blur(20px)',
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 2,
            ease: 'power2.out',
          }
        )
        .fromTo(
          line1Ref.current,
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
          },
          '-=1'
        )
        .to(
          line1Ref.current,
          {
            yPercent: -100,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.in',
          },
          '+=1'
        )
        .fromTo(
          line2Ref.current,
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
          },
          '-=0.8'
        )
        .to(
          line2Ref.current,
          {
            yPercent: -100,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.in',
          },
          '+=1'
        )
        .fromTo(
          line3Ref.current,
          {
            yPercent: 120,
            opacity: 0,
            scale: 0.8,
          },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .to(line3Ref.current, {
          duration: 1.5,
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-0"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="https://ik.imagekit.io/qcvroy8xpd/envato_video_gen_Nov_10_2025_15_35_41.mp4?updatedAt=1762789151468"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div
        ref={containerRef}
        className="relative h-full flex items-center justify-center px-6"
      >
        <div className="text-center max-w-7xl mx-auto">
          <div ref={line1Ref} className="absolute inset-0 flex items-center justify-center opacity-0">
            <div className="space-y-8 max-w-6xl">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.2] tracking-tight">
                From Business2Business to Human2Human:
              </h2>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight">
                Build a Brand People Want to Talk To
              </h2>
            </div>
          </div>

          <div ref={line2Ref} className="absolute inset-0 flex items-center justify-center opacity-0">
            <div className="max-w-5xl space-y-6">
              <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 leading-[1.5]">
                People don't only want to connect with brands anymore, they connect with the people behind them.
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/70 leading-[1.6]">
                At H2H we help companies show up online with a voice that feels real, relatable, and worth listening to.
              </p>
            </div>
          </div>

          <div ref={line3Ref} className="absolute inset-0 flex items-center justify-center opacity-0">
            <div className="max-w-5xl space-y-8">
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-[1.6]">
                In today's crowded digital world, connection is currency. Your audience wants honesty, personality, and purpose. We help you deliver all three through strategy, storytelling, and content that actually resonates.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl font-light text-white/80 leading-[1.7]">
                Whether you're a startup or a global brand, we'll help you cut through the noise and build a social presence that connects on a human level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
