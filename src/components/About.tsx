import { useEffect, useRef } from 'react';
import { Target, Users, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionShapes } from './SectionShapes';
import { GeometricShapes } from './GeometricShapes';
import { MagneticText } from './animations/MagneticText';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const line4Ref = useRef<HTMLParagraphElement>(null);
  const line5Ref = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
      })
        .from(
          [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current, line5Ref.current],
          {
            y: 50,
            opacity: 0,
            stagger: 0.3,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          imageRef.current,
          {
            scale: 1.2,
            opacity: 0.5,
            filter: 'blur(10px)',
            duration: 1,
          },
          '<'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about relative overflow-hidden bg-neutral-950 py-40 sm:py-48">
      <SectionShapes variant="about" />
      <GeometricShapes variant="section" />
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-16 relative z-10">
        <div className="mb-40">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-600"></div>
            <span className="text-violet-600 text-xs font-bold tracking-[0.3em] uppercase">About H2H</span>
          </div>
          <h2 ref={titleRef} className="text-[clamp(2.5rem,8vw,7rem)] text-white font-black uppercase tracking-[-0.04em] leading-[0.9] mb-12">
            <span className="block">TRANSFORM</span>
            <span className="block text-transparent bg-gradient-to-r from-violet-600 via-violet-400 to-white bg-clip-text">
              <MagneticText text="BRANDS" strength={30} />
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <p ref={line1Ref} className="about-line text-xl md:text-2xl text-white font-light leading-[1.6]">
                  We don't just build brands.
                </p>
                <p ref={line2Ref} className="about-line text-xl md:text-2xl text-violet-600 leading-[1.6] font-light">
                  We ignite communities and inspire action.
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-violet-600 to-violet-400"></div>
              </div>
              <p ref={line3Ref} className="about-line text-xl md:text-2xl text-white font-light leading-[1.6]">
                People don't only want to connect with brands anymore, they connect with the people behind them.
              </p>
              <p ref={line4Ref} className="about-line text-xl md:text-2xl text-neutral-200 leading-[1.7] font-light">
                At H2H we help companies show up online with a voice that feels real, relatable, and worth listening to.
              </p>
              <p ref={line5Ref} className="about-line text-lg md:text-xl text-neutral-300 leading-[1.75]">
                In today's crowded digital world, connection is currency. Your audience wants honesty, personality, and purpose. We help you deliver all three through strategy, storytelling, and content that actually resonates.
              </p>
            </div>

            <div className="space-y-12">
              <div ref={imageRef} className="about-image relative overflow-hidden aspect-[4/3] rounded-2xl group">
                <img
                  src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team collaboration"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 sm:mb-40">
          <div className="group relative perspective-card">
            <div className="absolute -inset-1 bg-gradient-to-br from-violet-600/40 via-violet-400/40 to-transparent rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-liquid-morph"></div>
            <div className="relative ultra-glass rounded-2xl p-8 sm:p-10 transition-all duration-700 h-full card-3d-effect overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/8 via-transparent to-violet-400/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-pulse" style={{ backgroundSize: '200% 100%' }}></div>
              <div className="flex flex-col gap-6 mb-6 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-violet-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-violet-600/30 to-violet-400/30 group-hover:from-violet-600/60 group-hover:to-violet-400/60 flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Target className="text-white" size={28} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl text-white font-bold leading-tight">Our Philosophy</h3>
              </div>
              <p className="text-lg md:text-xl text-neutral-300 leading-[1.75] font-light relative z-10">
                Perfect, polished campaigns are something that we take very seriously. But, people want more than that. They want personality. They want to see and hear brands that speak like humans and offer something meaningful.
              </p>
            </div>
          </div>

          <div className="group relative perspective-card">
            <div className="absolute -inset-1 bg-gradient-to-br from-violet-600/30 via-violet-400/30 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative glass-premium rounded-2xl p-8 sm:p-10 transition-all duration-700 h-full card-3d-effect overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-violet-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="flex flex-col gap-6 mb-6 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-violet-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-violet-600/30 to-violet-400/30 group-hover:from-violet-600/60 group-hover:to-violet-400/60 flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Users className="text-white" size={28} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl text-white font-bold leading-tight">Why H2H?</h3>
              </div>
              <p className="text-lg md:text-xl text-neutral-300 leading-[1.75] font-light relative z-10">
                Because we embed ourselves in your world. When you work with H2H, you don't get an agency. You get a partner — a flexible, responsive extension of your team. Like a living, breathing part of your organization, we adapt to your rhythm, align with your goals, and help you scale with clarity and purpose.
              </p>
            </div>
          </div>

          <div className="group relative perspective-card">
            <div className="absolute -inset-1 bg-gradient-to-br from-violet-600/30 via-violet-400/30 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative glass-premium rounded-2xl p-8 sm:p-10 transition-all duration-700 h-full card-3d-effect overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-violet-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="flex flex-col gap-6 mb-6 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-violet-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-violet-600/30 to-violet-400/30 group-hover:from-violet-600/60 group-hover:to-violet-400/60 flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <TrendingUp className="text-white" size={28} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl text-white font-bold leading-tight">How We Work</h3>
              </div>
              <p className="text-lg md:text-xl text-neutral-300 leading-[1.75] font-light relative z-10">
                We're strategists, creatives, and storytellers who bring a mix of structure and soul. We combine insight with efficiency to help you build brand ecosystems that actually work — across every platform, every touchpoint, and every stage of growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
