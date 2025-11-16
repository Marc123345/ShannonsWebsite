import { useEffect, useRef, memo } from 'react';
import { Building2, Users, CircleUser as UserCircle2, Globe, DollarSign, FileText, ArrowUpRight, Zap, Network, Sparkles, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FadeIn } from './animations/FadeIn';
import { SectionShapes } from './SectionShapes';
import { GlitchText } from './animations/GlitchText';
import { AnimatedUnderline, AnimatedCircleProgress } from './AnimatedBorder';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Building2,
    title: 'Company Pages',
    description: 'Your company\'s social presence is your digital storefront, but most brands leave it looking empty or generic. We turn your pages into platforms for thought leadership, brand storytelling, and meaningful engagement.',
    features: [
      'Brand awareness campaigns',
      'Product and event promotion',
      'Employer branding content',
      'Community engagement',
      'Video content',
      'Always-on posting that builds credibility',
      'Long-form content creation and website enrichment'
    ],
    closing: 'We help your brand show up consistently and confidently — with a voice that feels human, even when it\'s speaking at scale.',
    gradient: 'from-blue-500 via-cyan-500 to-blue-600',
    accentColor: 'cyan',
    number: '01'
  },
  {
    icon: UserCircle2,
    title: 'Leadership Branding',
    description: 'People want to hear from other people. We help your executives step into the spotlight with purpose, clarity, and authenticity — positioning them as respected voices in your industry.',
    features: [
      'Tailored content creation that reflects each leader\'s personality and POV',
      'Alignment between personal narratives and business strategy',
      'Positioning as industry thought leaders — not just internal champions',
      'Content and ghost-writing that drives conversations'
    ],
    closing: 'By helping leaders build presence, trust, and lasting influence, we position your company as the home of the voices that are shaping the industry. A sales tactic that most companies have not yet tapped into.',
    gradient: 'from-violet-600 via-violet-400 to-purple-600',
    accentColor: 'purple',
    number: '02'
  },
  {
    icon: Users,
    title: 'Advocacy Program',
    description: 'The most trusted voices in your company aren\'t always in the C-suite — they\'re on your teams. Our Advocacy Program turns employees into empowered storytellers and brand ambassadors.',
    features: [
      'Monthly workshops and hands-on training',
      'Shareable content kits and templates',
      'Scalable infrastructure that grows with your team',
      'Culture-first programming that boosts morale and visibility'
    ],
    closing: 'We create internal champions who amplify your message and expand your reach — all through real human connection. The H2H advocacy program empowers your company message to be told in diverse, authentic voices.',
    gradient: 'from-pink-500 via-rose-500 to-pink-600',
    accentColor: 'pink',
    number: '03'
  }
];

const otherServices = [
  {
    icon: Globe,
    title: 'Website Design + SEO',
    description: 'Your website is often your company\'s virtual home. We make sure it\'s the right one.',
    details: 'We design and build high-converting, beautiful websites that align with your brand voice and serve as a true hub for your digital presence. And yes, they\'re built with SEO in mind from day one.',
    label: 'What\'s included:',
    features: [
      'Strategic design & copywriting',
      'Responsive build (mobile-first)',
      'SEO fundamentals baked in',
      'Optional blog + content hub setup'
    ]
  },
  {
    icon: DollarSign,
    title: 'Paid Campaigns',
    description: 'Great content deserves an audience.',
    details: 'We create and manage paid campaigns that amplify your message and drive real business outcomes. From awareness to lead gen, we craft media strategies that meet your goals.',
    label: 'What we cover:',
    features: [
      'Paid strategy & audience targeting',
      'Ad copy and creative production',
      'Optimization & A/B testing',
      'Transparent reporting'
    ]
  },
  {
    icon: FileText,
    title: 'Content Writing',
    description: 'When it comes to storytelling, words matter!',
    details: 'Our team crafts clear, engaging, and on-brand content for every channel. Whether it\'s for social media, blog posts, email campaigns, or your website — we bring your voice to life in a way that connects.',
    label: 'Our specialties:',
    features: [
      'Social captions and campaigns',
      'Long-form blog and thought leadership content',
      'Executive ghost-writing',
      'Email and web copy'
    ]
  }
];

export const Services = memo(function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillarsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pillarsWrapperRef.current) return;

    const ctx = gsap.context(() => {
      const pillarCards = gsap.utils.toArray<HTMLElement>('.pillar-card');

      pillarCards.forEach((card, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        });

        tl.from(card.querySelector('.pillar-image'), {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
        })
          .from(
            card.querySelector('.pillar-content'),
            {
              x: index % 2 === 0 ? 100 : -100,
              opacity: 0,
              duration: 1,
            },
            '<'
          )
          .from(
            card.querySelector('.pillar-title'),
            {
              y: 50,
              opacity: 0,
              duration: 0.5,
            },
            '-=0.5'
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="pillars relative overflow-hidden bg-neutral-950 py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(139, 92, 246, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.08) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
        <SectionShapes variant="services" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12">
        <FadeIn direction="up">
          <div className="text-center mb-24 sm:mb-28 md:mb-32 lg:mb-40">
            <div className="inline-flex items-center gap-3 bg-violet-600/10 border border-violet-600/30 px-6 py-3 rounded-full mb-10">
              <Sparkles className="text-violet-600" size={18} />
              <span className="text-violet-600 text-xs font-bold tracking-[0.25em] uppercase">Our Services</span>
            </div>
            <h2 className="text-[clamp(2.5rem,8vw,7rem)] text-white font-black mb-12 uppercase tracking-[-0.04em] leading-[0.9]">
              <span className="block">THE 3-PILLAR</span>
              <span className="block text-transparent bg-gradient-to-r from-violet-600 via-violet-400 to-violet-600 bg-clip-text">
                <GlitchText text="SOCIAL MEDIA" intensity={8} />
              </span>
              <span className="block">ECOSYSTEM</span>
            </h2>
            <div className="flex justify-center gap-3 items-center mb-12">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-violet-600 to-violet-400"></div>
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
              <Zap className="text-violet-400" size={24} fill="currentColor" />
              <div className="w-2 h-2 bg-violet-600 rounded-full animate-pulse"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-violet-400 via-violet-600 to-transparent"></div>
            </div>
            <p className="text-xl md:text-2xl text-neutral-200 leading-[1.6] max-w-2xl mx-auto font-light">
              Built for real connection.
              <span className="block mt-2 text-white font-light">Designed for measurable growth.</span>
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="mb-20 sm:mb-24 md:mb-32 lg:mb-40 max-w-7xl mx-auto">
            <div className="relative glass-effect-strong rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden group">
              <div className="absolute -inset-1 bg-gradient-to-br from-violet-600/30 via-violet-400/30 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-1000"></div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-violet-600/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-violet-400/20 rounded-full blur-3xl"></div>
              <div className="relative">
                <p className="text-xl md:text-2xl text-white/95 leading-[1.6] font-light text-center max-w-4xl mx-auto mb-8">
                  We don't see social media as a channel, we see it as a <span className="font-light text-transparent bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text">living ecosystem</span>. One that, when structured strategically, turns visibility into trust, and trust into action.
                </p>
                <div className="h-px w-full max-w-2xl mx-auto bg-gradient-to-r from-transparent via-violet-600 to-transparent mb-8 sm:mb-10"></div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 leading-[1.6] text-center">
                  That's why we built the 3-Pillar Social Media Ecosystem — a framework designed to humanize your brand across three key layers: your company, your leadership, and your people.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <div ref={pillarsWrapperRef} className="pillars-wrapper space-y-20 lg:space-y-28 mb-24 sm:mb-28 md:mb-32">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <div key={pillar.title} className="pillar-card">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  <div className="lg:col-span-6">
                    <div className={`pillar-image relative h-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden group card-3d-effect`}>
                      <div className="absolute inset-0">
                        <img
                          src={index === 0 ? 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800' : index === 1 ? 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800' : 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800'}
                          alt={pillar.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} mix-blend-multiply opacity-80 group-hover:opacity-90 transition-opacity duration-700`}></div>
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-700"></div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-morph-blob"></div>
                          <div className="absolute bottom-0 right-0 w-40 h-40 bg-violet-400/20 rounded-full blur-3xl animate-morph-blob" style={{ animationDelay: '2s' }}></div>
                        </div>
                      </div>

                      <div className="relative z-10 h-full p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col">
                        <div className="mb-auto">
                          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black text-white/10 leading-none mb-4 sm:mb-6">
                            {pillar.number}
                          </div>
                        </div>

                        <div className="mt-auto">
                          <div className="relative inline-block mb-6 sm:mb-8">
                            <AnimatedCircleProgress
                              progress={90}
                              size={96}
                              strokeWidth={3}
                              color="#8b5cf6"
                              duration={2}
                              delay={index * 0.3}
                            >
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <Icon className="text-white" size={36} strokeWidth={2} />
                              </div>
                            </AnimatedCircleProgress>
                          </div>

                          <AnimatedUnderline
                            color={index === 0 ? '#06b6d4' : index === 1 ? '#8b5cf6' : '#ec4899'}
                            strokeWidth={4}
                            duration={1.5}
                            delay={index * 0.2}
                          >
                            <h3 className="pillar-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white font-black mb-4 sm:mb-6 uppercase leading-tight">
                              {pillar.title}
                            </h3>
                          </AnimatedUnderline>

                          <div className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-flex">
                            <Zap className="text-white" size={16} fill="currentColor" />
                            <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">Core Pillar</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="pillar-content h-full flex flex-col">
                      <div className="relative group/desc bg-neutral-800/60 backdrop-blur-xl border border-neutral-700/60 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-violet-600/50 transition-all duration-500 mb-4 sm:mb-6 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 via-violet-400/0 to-violet-600/0 group-hover/desc:from-violet-600/10 group-hover/desc:via-violet-400/10 group-hover/desc:to-violet-600/10 transition-all duration-700"></div>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-light relative z-10">
                          {pillar.description}
                        </p>
                      </div>

                      <div className="relative group/features bg-neutral-900/80 border border-neutral-700/60 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 flex-1 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-violet-600/5 to-transparent opacity-0 group-hover/features:opacity-100 transition-opacity duration-700"></div>
                        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 relative z-10">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/20 to-violet-400/20 flex items-center justify-center group-hover/features:scale-110 transition-transform duration-500">
                            <Network className="text-violet-600 flex-shrink-0" size={24} />
                          </div>
                          <h4 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white font-bold leading-tight">
                            {pillar.title === 'Leadership Branding' ? 'What we do:' : pillar.title === 'Advocacy Program' ? 'Program highlights:' : 'What we deliver:'}
                          </h4>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8 md:mb-10 relative z-10">
                          {pillar.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 group/item relative">
                              <div className="mt-1.5 flex-shrink-0">
                                <div className="w-6 h-6 rounded-full bg-violet-600/10 group-hover/item:bg-violet-600/20 flex items-center justify-center transition-all duration-300 group-hover/item:scale-110">
                                  <ChevronRight className="text-violet-600 group-hover/item:text-violet-400 transition-colors duration-300" size={16} strokeWidth={3} />
                                </div>
                              </div>
                              <span className="text-sm sm:text-base lg:text-lg text-neutral-100 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-violet-600/10 to-violet-400/10 border-l-2 sm:border-l-4 border-violet-600 rounded-lg">
                          <p className="text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed italic">
                            {pillar.closing}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <FadeIn direction="up" delay={0.5}>
          <div className="mb-20 sm:mb-24 md:mb-32 lg:mb-40">
            <div className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] group/cta">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-violet-400 to-violet-600 animate-gradient-pulse" style={{ backgroundSize: '200% 200%' }}></div>
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover/cta:bg-black/40 transition-colors duration-700"></div>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-[100px] animate-morph-blob"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-400 rounded-full blur-[120px] animate-morph-blob" style={{ animationDelay: '3s' }}></div>
              </div>

              <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 text-center">
                <div className="max-w-5xl mx-auto">
                  <div className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full mb-8 sm:mb-10 group-hover/cta:scale-105 transition-transform duration-500">
                    <Sparkles className="text-white animate-pulse" size={24} />
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-black uppercase tracking-tight">
                      Why the 3-pillar system Works
                    </h3>
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-[1.4] font-light">
                    This living ecosystem is designed to strengthen brand presence, build executive visibility, empower employees to share the company narrative, and drive real business results. By activating all three pillars, you create a brand that speaks with one voice — <span className="font-bold text-transparent bg-gradient-to-r from-white to-violet-600 bg-clip-text">powered by many humans</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div>
          <FadeIn direction="up" delay={0.6}>
            <div className="text-center mb-12 sm:mb-16">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white font-black mb-4 sm:mb-6 uppercase">
                Other Services We Offer
              </h3>
              <div className="flex justify-center gap-2 items-center">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-violet-600"></div>
                <div className="h-2 w-2 bg-violet-600 rounded-full"></div>
                <div className="h-1 w-32 bg-gradient-to-r from-violet-600 via-violet-400 to-violet-600"></div>
                <div className="h-2 w-2 bg-violet-400 rounded-full"></div>
                <div className="h-1 w-16 bg-gradient-to-r from-violet-400 to-transparent"></div>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {otherServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <FadeIn key={service.title} direction="up" delay={0.7 + index * 0.1}>
                  <div className="group relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-violet-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative bg-neutral-800/70 backdrop-blur-xl border border-neutral-700/60 hover:border-violet-600/50 rounded-2xl overflow-visible transition-all duration-500 h-full">
                      <div className="p-6 sm:p-8 lg:p-10 flex flex-col h-full">
                        <div className="mb-6 sm:mb-8">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="text-white" size={28} strokeWidth={2} />
                          </div>
                          <h4 className="text-xl sm:text-2xl lg:text-3xl text-white font-bold mb-3 leading-tight">{service.title}</h4>
                          <p className="text-violet-600 text-sm sm:text-base font-bold mb-3 sm:mb-4 leading-relaxed">{service.description}</p>
                          <p className="text-sm sm:text-base lg:text-lg text-neutral-200 leading-relaxed">
                            {service.details}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-4 sm:mb-6"></div>

                          <h5 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4 uppercase tracking-wider flex items-center gap-2">
                            <ArrowUpRight size={14} className="text-violet-600" />
                            {service.label}
                          </h5>
                          <ul className="space-y-2 sm:space-y-3">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm sm:text-base lg:text-lg text-neutral-200 group-hover:text-white transition-colors duration-300">
                                <span className="text-violet-600 mt-1 text-xs flex-shrink-0">▸</span>
                                <span className="leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-6 sm:mt-8 h-1 w-0 bg-gradient-to-r from-violet-600 to-violet-400 group-hover:w-full transition-all duration-700"></div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});
