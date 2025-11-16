import { useState, useRef, useEffect } from 'react';
import { Lightbulb, Code, Palette, Megaphone, Layers, Sparkles, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { HolographicCard } from '../components/HolographicCard';
import { Scroll3DSection } from '../components/Scroll3DSection';

const services = [
  {
    icon: Lightbulb,
    title: 'Brand Strategy',
    number: '01',
    description: 'Crafting compelling brand narratives that resonate with your audience and create lasting impressions.',
    longDescription: 'We dive deep into your brand DNA to create strategic frameworks that define who you are, what you stand for, and how you connect with your audience. Our holistic approach ensures every touchpoint reflects your brand essence.',
    features: [
      'Brand Identity Development',
      'Market Research & Analysis',
      'Positioning Strategy',
      'Brand Guidelines',
    ],
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stats: { value: '150+', label: 'Brands Built' },
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    number: '02',
    description: 'Designing intuitive and visually stunning interfaces that elevate user experiences and drive engagement.',
    longDescription: 'Beautiful design meets flawless functionality. We create digital experiences that users love and remember, combining aesthetic excellence with data-driven insights to maximize engagement and conversions.',
    features: [
      'User Research & Testing',
      'Wireframing & Prototyping',
      'Visual Design',
      'Interaction Design',
    ],
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stats: { value: '500+', label: 'Interfaces Designed' },
  },
  {
    icon: Code,
    title: 'Development',
    number: '03',
    description: 'Building robust, scalable digital products with cutting-edge technologies and industry best practices.',
    longDescription: 'From concept to deployment, we engineer digital solutions that perform flawlessly. Our development process prioritizes scalability, security, and seamless user experiences across all devices and platforms.',
    features: [
      'Web Development',
      'Mobile App Development',
      'E-commerce Solutions',
      'API Integration',
    ],
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stats: { value: '300+', label: 'Apps Deployed' },
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    number: '04',
    description: 'Data-driven campaigns that amplify your brand reach and deliver measurable growth across channels.',
    longDescription: 'Strategic campaigns that convert. We blend creative storytelling with performance marketing to drive measurable results. Every campaign is optimized for maximum ROI and sustained growth.',
    features: [
      'Social Media Marketing',
      'Content Marketing',
      'Email Campaigns',
      'Analytics & Reporting',
    ],
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stats: { value: '5M+', label: 'Reach Generated' },
  },
  {
    icon: Layers,
    title: 'Motion Design',
    number: '05',
    description: 'Creating captivating animations and motion graphics that bring your brand story to life.',
    longDescription: 'Motion that moves audiences. We craft dynamic visual narratives that capture attention and communicate complex ideas with clarity and impact. From micro-interactions to full-scale productions.',
    features: [
      'Video Production',
      '2D/3D Animation',
      'Motion Graphics',
      'Visual Effects',
    ],
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stats: { value: '200+', label: 'Animations Created' },
  },
  {
    icon: Sparkles,
    title: 'Creative Direction',
    number: '06',
    description: 'Guiding your brand vision with strategic creative leadership and innovative conceptual thinking.',
    longDescription: 'Vision meets execution. Our creative directors orchestrate every element of your brand experience, ensuring consistency, innovation, and impact across all touchpoints and campaigns.',
    features: [
      'Art Direction',
      'Creative Campaigns',
      'Brand Storytelling',
      'Visual Strategy',
    ],
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stats: { value: '50+', label: 'Campaigns Directed' },
  },
];

export function ServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeServiceData = services[activeService];
  const Icon = activeServiceData.icon;

  return (
    <div ref={sectionRef} className="bg-black min-h-screen relative">
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://ik.imagekit.io/qcvroy8xpd/source_Animated%20Gradient%20Background.png?updatedAt=1760473168998)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <p className="text-brand-purple text-sm font-bold tracking-widest uppercase mb-4">What We Offer</p>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-6 tracking-tighter">
              OUR SERVICES
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-brand-purple to-brand-pink mx-auto mb-8 shadow-glow-purple"></div>
            <p className="text-neutral-400 text-xl md:text-2xl max-w-3xl mx-auto font-light">
              Comprehensive digital solutions tailored to transform your vision into extraordinary reality
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 mb-32">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <div className="space-y-3">
                {services.map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <button
                      key={service.number}
                      onClick={() => setActiveService(index)}
                      className={`cursor-hover w-full text-left group relative overflow-hidden transition-all duration-500 ${
                        activeService === index
                          ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-glow-purple'
                          : 'bg-neutral-900 border-2 border-neutral-700 hover:border-brand-purple text-white'
                      }`}
                    >
                      <div className="flex items-center gap-4 p-6">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          activeService === index
                            ? 'bg-white/20'
                            : 'bg-neutral-100 border border-neutral-300 group-hover:bg-brand-purple/20'
                        }`}>
                          <ServiceIcon
                            className={`transition-colors duration-300 ${
                              activeService === index ? 'text-white' : 'text-brand-purple group-hover:text-brand-pink'
                            }`}
                            size={24}
                            strokeWidth={2}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-bold text-lg transition-colors duration-300 ${
                              activeService === index ? 'text-white' : 'text-white group-hover:text-brand-purple'
                            }`}>
                              {service.title}
                            </span>
                            <span className={`text-sm font-bold ${
                              activeService === index ? 'text-white/70' : 'text-neutral-400'
                            }`}>
                              {service.number}
                            </span>
                          </div>
                        </div>

                        <ArrowRight
                          className={`transition-all duration-300 ${
                            activeService === index
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                          }`}
                          size={20}
                        />
                      </div>

                      {activeService === index && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white to-transparent"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-8">
              <Scroll3DSection transformType="perspective">
              <div className="space-y-8">
                <HolographicCard intensity={1.2} className="h-[500px]">
                <div className="relative h-[500px] rounded-2xl overflow-hidden group">
                  <img
                    src={activeServiceData.image}
                    alt={activeServiceData.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-brand-purple to-brand-pink group-hover:w-full transition-all duration-700"></div>
                  <div className="absolute top-0 right-0 w-1 h-0 bg-gradient-to-b from-brand-purple to-brand-pink group-hover:h-full transition-all duration-700 delay-100"></div>
                  <div className="absolute bottom-0 right-0 w-0 h-1 bg-gradient-to-l from-brand-purple to-brand-pink group-hover:w-full transition-all duration-700 delay-200"></div>
                  <div className="absolute bottom-0 left-0 w-1 h-0 bg-gradient-to-t from-brand-purple to-brand-pink group-hover:h-full transition-all duration-700 delay-300"></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="cursor-hover w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-purple group-hover:border-brand-purple transition-all duration-300">
                      <Play className="text-white ml-1" size={32} fill="white" />
                    </button>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-4xl font-black text-white mb-2">{activeServiceData.title}</h3>
                        <p className="text-neutral-300 text-lg">{activeServiceData.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-black text-white">{activeServiceData.stats.value}</div>
                        <div className="text-brand-purple text-sm font-bold uppercase tracking-wider">{activeServiceData.stats.label}</div>
                      </div>
                    </div>
                  </div>
                </div>
                </HolographicCard>

                <div className="bg-neutral-900 border-2 border-neutral-800 p-10 hover:border-brand-purple transition-all duration-500 group relative">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink flex items-center justify-center shadow-glow-purple">
                      <Icon className="text-white" size={32} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-white mb-3">About This Service</h4>
                      <p className="text-neutral-300 text-lg leading-relaxed">
                        {activeServiceData.longDescription}
                      </p>
                    </div>
                  </div>

                  <div className="h-0.5 w-full bg-neutral-800 mb-8"></div>

                  <div>
                    <h5 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">What's Included</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      {activeServiceData.features.map((feature, index) => (
                        <div
                          key={feature}
                          className="cursor-hover flex items-center gap-3 bg-neutral-800 border border-neutral-700 px-5 py-4 hover:border-brand-purple hover:bg-brand-purple/10 transition-all duration-300 group"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <CheckCircle className="text-brand-purple group-hover:text-brand-pink transition-colors duration-300 flex-shrink-0" size={20} strokeWidth={2.5} />
                          <span className="text-neutral-300 font-bold text-sm group-hover:text-white transition-colors duration-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 flex gap-4">
                    <button className="cursor-hover group relative bg-gradient-to-r from-brand-purple to-brand-pink px-8 py-4 text-white font-bold text-sm uppercase tracking-wider hover:shadow-glow-purple transition-all duration-300 hover:scale-105 overflow-hidden flex items-center gap-2">
                      <span className="absolute inset-0 bg-gradient-to-r from-brand-pink to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative">Get Started</span>
                      <ArrowRight className="relative" size={18} />
                    </button>
                    <button className="cursor-hover px-8 py-4 text-white font-bold text-sm uppercase tracking-wider border-2 border-brand-purple hover:bg-brand-purple/10 transition-all duration-300">
                      Learn More
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-brand-purple to-brand-pink group-hover:w-full transition-all duration-700"></div>
                </div>
              </div>
              </Scroll3DSection>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black border-t border-neutral-800 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ready to Transform Your Brand?</h2>
            <p className="text-neutral-400 text-xl max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your goals
            </p>
          </div>

          <div className="flex justify-center">
            <button className="cursor-hover group relative bg-gradient-to-r from-brand-purple to-brand-pink px-12 py-6 text-white font-bold text-lg uppercase tracking-wider hover:shadow-glow-purple transition-all duration-300 hover:scale-105 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-brand-pink to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Schedule a Consultation</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ServicesPage;
