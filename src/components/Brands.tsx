import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionShapes } from './SectionShapes';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: 'Stripe', logo: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
  { name: 'Slack', logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg' },
  { name: 'Netflix', logo: 'https://cdn.worldvectorlogo.com/logos/netflix-3.svg' },
  { name: 'Spotify', logo: 'https://cdn.worldvectorlogo.com/logos/spotify-2.svg' },
  { name: 'Airbnb', logo: 'https://cdn.worldvectorlogo.com/logos/airbnb.svg' },
  { name: 'Adobe', logo: 'https://cdn.worldvectorlogo.com/logos/adobe-2.svg' },
  { name: 'Shopify', logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
  { name: 'Uber', logo: 'https://cdn.worldvectorlogo.com/logos/uber-2.svg' },
  { name: 'Dropbox', logo: 'https://cdn.worldvectorlogo.com/logos/dropbox-1.svg' },
  { name: 'Tesla', logo: 'https://cdn.worldvectorlogo.com/logos/tesla-9.svg' },
];

export function Brands() {
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const counter1Ref = useRef<HTMLDivElement>(null);
  const counter2Ref = useRef<HTMLDivElement>(null);
  const counter3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        filter: 'blur(20px)',
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      });

      const counters = [
        { ref: counter1Ref, target: 150, suffix: '+' },
        { ref: counter2Ref, target: 50, suffix: '+' },
        { ref: counter3Ref, target: 2, suffix: 'B+', prefix: '$' },
      ];

      counters.forEach(({ ref, target, suffix, prefix = '' }) => {
        if (!ref.current) return;

        gsap.from(ref.current, {
          textContent: 0,
          duration: 2,
          ease: 'power1.inOut',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 80%',
          },
          onUpdate: function () {
            if (ref.current) {
              const value = Math.ceil(Number(this.targets()[0].textContent));
              ref.current.textContent = `${prefix}${value}${suffix}`;
            }
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.brand-logo-container').forEach((logo) => {
        gsap.to(logo, {
          y: 'random(-20, 20)',
          scale: 'random(0.95, 1.05)',
          duration: 'random(3, 5)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="metrics py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36 bg-black relative overflow-hidden border-y border-neutral-900">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Brands collaboration"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-600 rounded-full filter blur-[120px]"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-violet-600 rounded-full filter blur-[120px]"></div>
      </div>
      <SectionShapes variant="brands" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        <div ref={headingRef} className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-violet-600/10 border border-violet-600/30 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
            <Sparkles className="text-violet-600" size={16} />
            <span className="text-violet-600 text-xs sm:text-sm font-bold tracking-wider uppercase">Trusted By Industry Leaders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight mb-6 sm:mb-8 leading-none">
            GLOBAL BRANDS
            <br />
            <span className="text-transparent bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text">
              WE'VE PARTNERED WITH
            </span>
          </h2>
          <div className="flex justify-center gap-2 sm:gap-3 items-center mb-6 sm:mb-8 md:mb-10">
            <div className="h-0.5 sm:h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-transparent via-violet-600 to-violet-400"></div>
            <Sparkles className="text-violet-400" size={20} fill="currentColor" />
            <div className="h-0.5 sm:h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-violet-400 via-violet-600 to-transparent"></div>
          </div>
          <p className="text-neutral-300 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Collaborating with world-class companies to deliver exceptional digital experiences
          </p>
        </div>

        <div
          className="relative py-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden">
            <div
              className={`flex gap-24 ${isPaused ? '' : 'animate-marquee'}`}
              style={{
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              {[...brands, ...brands, ...brands].map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="brand-logo-container cursor-hover group inline-flex flex-shrink-0 w-36 h-20 items-center justify-center relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 to-violet-600/0 group-hover:from-violet-600/5 group-hover:to-violet-600/10 transition-all duration-500 border border-transparent group-hover:border-violet-600/20"></div>

                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="relative z-10 max-w-full max-h-full object-contain filter brightness-0 invert opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-violet-800 group-hover:w-full transition-all duration-700"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={metricsRef} className="mt-10 sm:mt-12 md:mt-16 text-center">
          <div className="relative inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-8 glass-effect-strong px-6 sm:px-8 md:px-10 py-6 hover:border-violet-600/50 transition-all duration-700 group w-full sm:w-auto max-w-md sm:max-w-none rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-violet-400/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="text-center px-4 sm:border-r border-b sm:border-b-0 border-neutral-800 group-hover:border-violet-600/30 transition-colors duration-500 pb-6 sm:pb-0 w-full sm:w-auto">
              <div ref={counter1Ref} className="counter text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">150+</div>
              <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">Companies</div>
            </div>
            <div className="text-center px-4 sm:border-r border-b sm:border-b-0 border-neutral-800 group-hover:border-violet-600/30 transition-colors duration-500 pb-6 sm:pb-0 w-full sm:w-auto">
              <div ref={counter2Ref} className="counter text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">50+</div>
              <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">Countries</div>
            </div>
            <div className="text-center px-4 w-full sm:w-auto">
              <div ref={counter3Ref} className="counter text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">$2B+</div>
              <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">Revenue Impact</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
