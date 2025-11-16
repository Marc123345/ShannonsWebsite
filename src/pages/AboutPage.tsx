/* -------------------------------------------------------
   OPTIMIZED ABOUT PAGE — H2H UPGRADE
   - GPU animations only
   - RAF scroll listener
   - Static memoized sections
   - Better UI balance
------------------------------------------------------- */

import { useEffect, useState, useMemo, useRef, memo } from "react";
import { Award, Users, TrendingUp, Rocket, Zap, Target, Heart, Sparkles, Mail, Linkedin, Twitter } from "lucide-react";
import { FloatingCard } from "../components/FloatingCard";
import { Scroll3DSection } from "../components/Scroll3DSection";

/* -------------------------------------------------------
   MEMOIZED STATIC DATA
------------------------------------------------------- */
const stats = Object.freeze([
  { icon: Users, value: 150, label: "Global Clients", suffix: "+" },
  { icon: Award, value: 500, label: "Projects Delivered", suffix: "+" },
  { icon: TrendingUp, value: 99, label: "Success Rate", suffix: "%" },
  { icon: Rocket, value: 8, label: "Years Leading", suffix: "+" },
]);

const values = Object.freeze([
  {
    icon: Zap,
    title: "Why H2H?",
    description:
      "Because we embed ourselves in your world. When you work with H2H, you don’t get an agency—you get a partner. We align with your rhythm, goals, and growth to create brand ecosystems that truly work."
  },
]);

const team = Object.freeze([
  {
    name: "Sarah Chen",
    role: "Creative Director",
    bio: "10+ years crafting award-winning brand experiences",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600",
    social: { linkedin: "#", twitter: "#", email: "sarah@h2h.com" }
  },
  {
    name: "Marcus Johnson",
    role: "Lead Developer",
    bio: "Full-stack architect specializing in scalable systems",
    image: "https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=600",
    social: { linkedin: "#", twitter: "#", email: "marcus@h2h.com" }
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    bio: "User-centric design advocate with psychology background",
    image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
    social: { linkedin: "#", twitter: "#", email: "emily@h2h.com" }
  },
  {
    name: "David Park",
    role: "Brand Strategist",
    bio: "Strategic storyteller helping brands find their voice",
    image: "https://images.pexels.com/photos/3776158/pexels-photo-3776158.jpeg?auto=compress&cs=tinysrgb&w=600",
    social: { linkedin: "#", twitter: "#", email: "david@h2h.com" }
  }
]);

/* -------------------------------------------------------
   OPTIMIZED ANIMATED NUMBER (RAF-based)
------------------------------------------------------- */
const AnimatedNumber = memo(({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    let raf: number;

    const animate = () => {
      start += value / 60;
      if (start >= value) {
        setCount(value);
      } else {
        setCount(Math.floor(start));
        raf = requestAnimationFrame(animate);
      }
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span>{count}{suffix}</span>;
});

/* -------------------------------------------------------
   MAIN PAGE
------------------------------------------------------- */
export function AboutPage() {
  const [activeValue, setActiveValue] = useState(0);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  /* ------- RAF Scroll Listener (super optimized) ------- */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (parallaxRef.current) {
            const offset = window.scrollY * 0.04;
            parallaxRef.current.style.transform = `translateY(${offset}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */
  return (
    <div className="bg-black min-h-screen relative">

      {/* ---------------------------------------------
          HERO SECTION
      --------------------------------------------- */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url(https://ik.imagekit.io/qcvroy8xpd/source_Animated%20Gradient%20Background.png)",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* LEFT: Heading */}
            <div>
              <p className="text-brand-purple text-xs font-bold uppercase tracking-widest mb-4">
                Our Story
              </p>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-8">
                FROM BRAND
                <br />VOICE TO
                <br />
                <span className="text-transparent bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text">
                  HUMAN CONNECTION
                </span>
              </h1>

              <div className="h-1 w-24 bg-gradient-to-r from-brand-purple to-brand-pink mb-10"></div>

              <p className="text-neutral-200 text-xl leading-relaxed mb-6">
                At H2H we believe the most impactful brands don’t just communicate — they connect.
              </p>

              <p className="text-neutral-300 text-lg leading-relaxed mb-10">
                We build social-first brand ecosystems that feel real, human, and memorable.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="px-10 py-5 bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold rounded-lg hover:scale-105 transition-all">
                  Our Story
                </button>

                <button className="px-10 py-5 border border-brand-purple text-white rounded-lg hover:bg-brand-purple/20 transition-all">
                  Join Our Team
                </button>
              </div>
            </div>

            {/* RIGHT: Floating Stats — Optimized Parallax */}
            <div ref={parallaxRef} className="relative">
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <Scroll3DSection key={stat.label} transformType="scale">
                      <FloatingCard depth={18}>
                        <div className="bg-neutral-900 border border-neutral-800 p-8 hover:border-brand-purple transition-all rounded-xl">
                          <div className="relative">
                            <div className="w-12 h-12 bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-6">
                              <Icon className="text-brand-purple" size={20} />
                            </div>

                            <div className="text-5xl font-black text-white mb-3">
                              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                            </div>

                            <div className="text-neutral-400 text-sm uppercase tracking-wider">
                              {stat.label}
                            </div>
                          </div>
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


      {/* ---------------------------------------------------
          VALUES SECTION (simplified, faster)
      --------------------------------------------------- */}
      <section className="py-32 bg-black relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-purple rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <p className="text-brand-purple text-xs font-bold uppercase tracking-widest mb-4">
              Our Core Values
            </p>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4">WHAT DRIVES US</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-4">
              {values.map((value, i) => (
                <button
                  key={value.title}
                  onClick={() => setActiveValue(i)}
                  className={`p-6 rounded-xl text-left border transition-all ${
                    activeValue === i
                      ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white border-transparent shadow-xl"
                      : "bg-neutral-900 border-neutral-700 text-neutral-300 hover:border-brand-purple"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <value.icon className="text-brand-purple" size={28} />
                    <span className="font-bold text-lg">{value.title}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-neutral-900 border border-neutral-700 p-8 rounded-xl">
              {(() => {
                const IconComponent = values[activeValue].icon;
                return <IconComponent className="text-white mb-6" size={42} />;
              })()}
              <h3 className="text-3xl font-black text-white mb-6">{values[activeValue].title}</h3>
              <p className="text-neutral-200 text-xl leading-relaxed">{values[activeValue].description}</p>
            </div>
          </div>
        </div>
      </section>




      {/* ---------------------------------------------------
          TEAM SECTION (UI polished + lazy loaded)
      --------------------------------------------------- */}
      <section className="py-28 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-brand-purple text-xs font-bold uppercase tracking-widest mb-4">
              The Dream Team
            </p>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4">MEET OUR EXPERTS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member) => (
              <div key={member.name} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-black/40"></div>

                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-brand-purple text-sm uppercase mb-3">{member.role}</p>

                    <p className="text-neutral-200 text-sm opacity-0 group-hover:opacity-100 transition duration-500">
                      {member.bio}
                    </p>

                    <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition duration-500">
                      <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <Linkedin size={14} />
                      </button>
                      <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <Twitter size={14} />
                      </button>
                      <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <Mail size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------
          FINAL CTA
      --------------------------------------------------- */}
      <section className="py-24 bg-gradient-to-r from-brand-purple to-brand-pink">
        <div className="text-center max-w-[900px] mx-auto text-white px-6">
          <h2 className="text-5xl font-black mb-4">READY TO TRANSFORM YOUR BRAND?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's collaborate to create digital experiences that captivate and convert.
          </p>
          <button className="px-12 py-5 bg-white text-brand-purple font-bold rounded-lg hover:scale-105 transition">
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
