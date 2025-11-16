import { useEffect, useRef } from 'react';
import { Quote, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionShapes } from './SectionShapes';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "H2H transformed our digital presence completely. Their strategic approach and creative execution exceeded all our expectations. The results speak for themselves—300% increase in conversions.",
    author: "Sarah Johnson",
    role: "CEO",
    company: "TechVision Inc.",
    rating: 5,
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote: "Working with H2H was a game-changer for our brand. They understood our vision and brought it to life in ways we never imagined possible. True creative partners.",
    author: "Michael Chen",
    role: "Marketing Director",
    company: "GrowthLabs",
    rating: 5,
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote: "The team's attention to detail and commitment to excellence is unmatched. They don't just deliver projects—they deliver experiences that drive real business value.",
    author: "Emily Rodriguez",
    role: "Founder",
    company: "StyleHub",
    rating: 5,
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote: "H2H's data-driven approach to digital marketing helped us achieve remarkable growth. They're not just vendors—they're strategic partners invested in our success.",
    author: "David Park",
    role: "VP Marketing",
    company: "CloudScale",
    rating: 5,
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote: "Exceptional work from start to finish. The H2H team brought fresh perspectives and innovative solutions that elevated our brand to new heights.",
    author: "Lisa Thompson",
    role: "Creative Director",
    company: "BrandCraft",
    rating: 5,
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

export function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const testimonialCards = gsap.utils.toArray<HTMLElement>('.testimonial-card');

      testimonialCards.forEach((card) => {
        gsap.from(card, {
          filter: 'grayscale(1)',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36 bg-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-1/3 w-96 h-96 bg-violet-600 rounded-full filter blur-[120px] animate-float"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-violet-400 rounded-full filter blur-[100px] animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      <SectionShapes variant="testimonials" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3 bg-violet-600/10 border border-violet-600/30 px-6 py-3 rounded-full mb-8">
            <Quote className="text-violet-600" size={20} />
            <span className="text-violet-600 text-sm font-bold tracking-wider uppercase">Client Success Stories</span>
          </div>
          <h2 className="text-[clamp(2.5rem,8vw,7rem)] font-black text-white mb-12 tracking-[-0.04em] leading-[0.9] uppercase">
            TESTIMONIALS
          </h2>
          <div className="flex justify-center gap-3 items-center mb-10">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-violet-600 to-violet-400"></div>
            <Star className="text-violet-400" size={24} fill="currentColor" />
            <div className="h-1 w-24 bg-gradient-to-r from-violet-400 via-violet-600 to-transparent"></div>
          </div>
          <p className="text-xl md:text-2xl text-neutral-200 leading-[1.6] max-w-2xl mx-auto font-light">
            Hear from the brands we've helped transform
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 md:pb-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card cursor-hover magnetic-hover perspective-card group min-w-[85vw] sm:min-w-[80vw] md:min-w-[600px] snap-center"
              >
                <div className="relative p-6 sm:p-8 md:p-10 h-full transition-all duration-700 overflow-hidden rounded-3xl group-hover:scale-[1.02]">
                  <span className="absolute inset-0 glass-effect-strong opacity-90 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                  <span className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl group-hover:bg-violet-600/30 transition-all duration-700 group-hover:scale-150"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-violet-600/20 via-violet-400/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 rounded-3xl"></div>

                  <div className="relative z-10">
                    <Quote className="text-violet-600 mb-4 md:mb-6" size={36} strokeWidth={1.5} />

                    <div className="flex gap-1 mb-4 md:mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-violet-600 fill-violet-600" size={16} />
                      ))}
                    </div>

                    <p className="text-neutral-100 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 md:mb-8 font-light">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-violet-600 flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-white font-bold text-base sm:text-lg">{testimonial.author}</p>
                        <p className="text-violet-600 text-xs sm:text-sm font-bold">{testimonial.role}</p>
                        <p className="text-neutral-400 text-[10px] sm:text-xs">{testimonial.company}</p>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-violet-600 to-violet-400 group-hover:w-full transition-all duration-700"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const scrollAmount = index * (scrollContainerRef.current.scrollWidth / testimonials.length);
                    scrollContainerRef.current.scrollTo({
                      left: scrollAmount,
                      behavior: 'smooth',
                    });
                  }
                }}
                className="cursor-hover w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 border-violet-600 hover:bg-violet-600 transition-all duration-300"
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
