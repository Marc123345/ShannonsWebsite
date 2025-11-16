import { useState, useEffect } from 'react';
import { Award, Users, TrendingUp, Rocket, Zap, Target, Heart, Sparkles, Mail, Linkedin, Twitter } from 'lucide-react';
import { FloatingCard } from '../components/FloatingCard';
import { Scroll3DSection } from '../components/Scroll3DSection';

const stats = [
  { icon: Users, value: 150, label: 'Global Clients', suffix: '+' },
  { icon: Award, value: 500, label: 'Projects Delivered', suffix: '+' },
  { icon: TrendingUp, value: 99, label: 'Success Rate', suffix: '%' },
  { icon: Rocket, value: 8, label: 'Years Leading', suffix: '+' },
];

const values = [
  {
    icon: Zap,
    title: 'Why H2H?',
    description: 'Because we embed ourselves in your world. When you work with H2H, you don\'t get an agency. You get a partner — a flexible, responsive extension of your team. Like a living, breathing part of your organization, we adapt to your rhythm, align with your goals, and help you scale with clarity and purpose. We\'re strategists, creatives, and storytellers who bring a mix of structure and soul. We combine insight with efficiency to help you build brand ecosystems that actually work — across every platform, every touchpoint, and every stage of growth.'
  },
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'Creative Director',
    bio: '10+ years crafting award-winning brand experiences',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600',
    social: { linkedin: '#', twitter: '#', email: 'sarah@h2h.com' }
  },
  {
    name: 'Marcus Johnson',
    role: 'Lead Developer',
    bio: 'Full-stack architect specializing in scalable systems',
    image: 'https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=600',
    social: { linkedin: '#', twitter: '#', email: 'marcus@h2h.com' }
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    bio: 'User-centric design advocate with psychology background',
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600',
    social: { linkedin: '#', twitter: '#', email: 'emily@h2h.com' }
  },
  {
    name: 'David Park',
    role: 'Brand Strategist',
    bio: 'Strategic storyteller helping brands find their voice',
    image: 'https://images.pexels.com/photos/3776158/pexels-photo-3776158.jpeg?auto=compress&cs=tinysrgb&w=600',
    social: { linkedin: '#', twitter: '#', email: 'david@h2h.com' }
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
}

export function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen relative">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://ik.imagekit.io/qcvroy8xpd/source_Animated%20Gradient%20Background.png?updatedAt=1760473168998)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">
            <div>
              <p className="text-brand-purple text-sm font-bold tracking-widest uppercase mb-4">Our Story</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                FROM BRAND
                <br />
                VOICE TO
                <br />
                <span className="text-transparent bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text">
                  HUMAN CONNECTION
                </span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-brand-purple to-brand-pink mb-10 shadow-glow-purple"></div>

              <p className="text-neutral-200 text-xl leading-[1.75] mb-8">
                At H2H we believe the most impactful brands are the ones that know how to connect, not just communicate.
              </p>
              <p className="text-neutral-300 text-lg leading-[1.75] mb-8">
                Perfect, polished campaigns are something that we take very seriously. But, people want more than that. They want personality. They want to see and hear brands that speak like humans and offer something meaningful.
              </p>
              <p className="text-neutral-300 text-lg leading-[1.75] mb-10">
                H2H is a social-first agency built to help brands grow by making their digital presence feel more human — thoughtful, strategic, and real.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="cursor-hover group relative bg-gradient-to-r from-brand-purple via-brand-pink to-brand-purple bg-[length:200%_100%] px-10 py-5 text-white font-black text-base uppercase tracking-widest transition-all duration-500 hover:scale-110 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.8),0_0_100px_rgba(236,72,153,0.6)]">
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-pink via-brand-purple to-brand-pink bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></span>

                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="absolute top-0 left-0 w-full h-[2px] bg-white animate-border-flow"></span>
                    <span className="absolute top-0 right-0 w-[2px] h-full bg-white animate-border-flow" style={{ animationDelay: '0.25s' }}></span>
                    <span className="absolute bottom-0 right-0 w-full h-[2px] bg-white animate-border-flow" style={{ animationDelay: '0.5s' }}></span>
                    <span className="absolute bottom-0 left-0 w-[2px] h-full bg-white animate-border-flow" style={{ animationDelay: '0.75s' }}></span>
                  </span>

                  <span className="relative flex items-center gap-3 group-hover:tracking-[0.3em] transition-all duration-500">
                    <span className="inline-block group-hover:animate-pulse">Our Story</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-125 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>

                  <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 group-hover:w-full group-hover:h-full bg-white rounded-full blur-2xl transition-all duration-700"></span>
                  </span>
                </button>
                <button className="cursor-hover group relative px-10 py-5 text-white font-bold text-base uppercase tracking-wider border-2 border-brand-purple hover:border-brand-pink transition-all duration-500 hover:scale-105 overflow-hidden bg-black/50 backdrop-blur-sm">
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-pink opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                  <span className="relative">Join Our Team</span>
                </button>
              </div>
            </div>

            <div
              className="relative"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Scroll3DSection key={stat.label} transformType="scale">
                    <FloatingCard depth={15}>
                    <div
                      className="cursor-hover group relative bg-neutral-900 border-2 border-neutral-800 p-8 hover:border-brand-purple transition-all duration-500 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/0 to-brand-pink/0 group-hover:from-brand-purple/10 group-hover:to-brand-pink/10 transition-all duration-500"></div>

                      <div className="relative">
                        <div className="w-12 h-12 bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-6 group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-pink group-hover:border-transparent transition-all duration-300">
                          <Icon className="text-brand-purple group-hover:text-white transition-colors duration-300" size={20} strokeWidth={2.5} />
                        </div>

                        <div className="text-5xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-pink group-hover:bg-clip-text transition-all duration-300">
                          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                        </div>

                        <div className="text-neutral-400 text-sm font-bold uppercase tracking-wider group-hover:text-neutral-300 transition-colors duration-300">
                          {stat.label}
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-pink group-hover:w-full transition-all duration-500"></div>
                    </div>
                    </FloatingCard>
                    </Scroll3DSection>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple rounded-full filter blur-[150px]"></div>
        </div>


        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 relative z-10">
          <div className="text-center mb-24">
            <p className="text-brand-purple text-sm font-bold tracking-widest uppercase mb-4">Our Core Values</p>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">WHAT DRIVES US</h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-brand-purple to-brand-pink mx-auto mb-8 shadow-glow-purple"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 mb-24">
            <div className="lg:col-span-4 space-y-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <button
                    key={value.title}
                    onClick={() => setActiveValue(index)}
                    className={`cursor-hover w-full text-left group relative overflow-hidden transition-all duration-500 p-8 rounded-xl ${
                      activeValue === index
                        ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-glow-purple'
                        : 'bg-neutral-900/50 border border-neutral-800 hover:border-brand-purple text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        activeValue === index
                          ? 'bg-white/20'
                          : 'bg-neutral-800 border border-neutral-700 group-hover:bg-brand-purple/20'
                      }`}>
                        <Icon
                          className={`transition-colors duration-300 ${
                            activeValue === index ? 'text-white' : 'text-brand-purple group-hover:text-brand-pink'
                          }`}
                          size={24}
                          strokeWidth={2}
                        />
                      </div>
                      <span className={`font-bold text-lg transition-colors duration-300 ${
                        activeValue === index ? 'text-white' : 'text-white group-hover:text-brand-purple'
                      }`}>
                        {value.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-8 relative">
              <div className="bg-neutral-900 border-2 border-neutral-700 p-10 h-full rounded-xl hover:border-brand-purple transition-all duration-500 group relative overflow-hidden">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink flex items-center justify-center shadow-glow-purple">
                    {(() => {
                      const Icon = values[activeValue].icon;
                      return <Icon className="text-white" size={32} strokeWidth={2} />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-white mb-6">{values[activeValue].title}</h3>
                    <p className="text-neutral-200 text-xl leading-[1.75]">
                      {values[activeValue].description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-12">
                  <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-lg hover:border-brand-purple/40 transition-all duration-300">
                    <Sparkles className="text-brand-purple mb-3" size={32} />
                    <p className="text-white font-bold">Creative Excellence</p>
                  </div>
                  <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-lg hover:border-brand-purple/40 transition-all duration-300">
                    <Target className="text-brand-purple mb-3" size={32} />
                    <p className="text-white font-bold">Strategic Thinking</p>
                  </div>
                  <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-lg hover:border-brand-purple/40 transition-all duration-300">
                    <Zap className="text-brand-purple mb-3" size={32} />
                    <p className="text-white font-bold">Technical Mastery</p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-brand-purple to-brand-pink group-hover:w-full transition-all duration-700"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12">
          <div className="text-center mb-24">
            <p className="text-brand-purple text-sm font-bold tracking-widest uppercase mb-4">The Dream Team</p>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">MEET OUR EXPERTS</h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-brand-purple to-brand-pink mx-auto mb-8 shadow-glow-purple"></div>
            <p className="text-neutral-300 text-xl max-w-3xl mx-auto leading-[1.7]">
              A diverse team of passionate creatives, strategists, and technologists dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="cursor-hover group"
              >
                <div className="relative overflow-hidden mb-6 aspect-square rounded-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90"></div>

                  <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-brand-purple to-brand-pink group-hover:w-full transition-all duration-700"></div>
                  <div className="absolute top-0 right-0 w-1 h-0 bg-gradient-to-b from-brand-purple to-brand-pink group-hover:h-full transition-all duration-700 delay-100"></div>
                  <div className="absolute bottom-0 right-0 w-0 h-1 bg-gradient-to-l from-brand-purple to-brand-pink group-hover:w-full transition-all duration-700 delay-200"></div>
                  <div className="absolute bottom-0 left-0 w-1 h-0 bg-gradient-to-t from-brand-purple to-brand-pink group-hover:h-full transition-all duration-700 delay-300"></div>

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <h3 className="text-2xl font-black text-white mb-2">{member.name}</h3>
                      <p className="text-brand-purple text-sm font-bold uppercase tracking-wider mb-3">{member.role}</p>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <p className="text-neutral-200 text-sm mb-4 leading-[1.6]">{member.bio}</p>
                      <div className="flex gap-2">
                        <button className="cursor-hover w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-brand-purple hover:border-brand-purple transition-all duration-300">
                          <Linkedin size={14} className="text-white" />
                        </button>
                        <button className="cursor-hover w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-brand-purple hover:border-brand-purple transition-all duration-300">
                          <Twitter size={14} className="text-white" />
                        </button>
                        <button className="cursor-hover w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-brand-purple hover:border-brand-purple transition-all duration-300">
                          <Mail size={14} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-brand-purple to-brand-pink">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            READY TO TRANSFORM YOUR BRAND?
          </h2>
          <p className="text-white/90 text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light leading-[1.7]">
            Let's collaborate to create digital experiences that captivate and convert
          </p>
          <button className="cursor-hover group inline-block bg-white text-brand-purple px-12 py-6 font-bold text-lg uppercase tracking-widest hover:bg-neutral-100 transition-all duration-300 hover:scale-105 shadow-2xl rounded-lg">
            <span className="relative">Start Your Journey</span>
          </button>
        </div>
      </section>
    </div>
  );
}
export default AboutPage;
