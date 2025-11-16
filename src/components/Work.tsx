import { useState, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { SectionShapes } from './SectionShapes';
import { GeometricShapes } from './GeometricShapes';
import { AnimatedBorder } from './AnimatedBorder';

const projects = [
  {
    title: 'Lumina Tech',
    client: 'Technology Platform',
    category: 'Web Design',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Revolutionary SaaS platform with intuitive user experience',
    year: '2024',
    featured: true,
  },
  {
    title: 'Vivid Studios',
    client: 'Creative Agency',
    category: 'Branding',
    image: 'https://images.pexels.com/photos/1145434/pexels-photo-1145434.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Bold brand identity for cutting-edge design studio',
    year: '2024',
    featured: false,
  },
  {
    title: 'Urban Pulse',
    client: 'Lifestyle Brand',
    category: 'Digital Marketing',
    image: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Viral campaign reaching 5M+ audience engagement',
    year: '2024',
    featured: true,
  },
  {
    title: 'Nexus Finance',
    client: 'Fintech Startup',
    category: 'Development',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Next-generation banking app with AI integration',
    year: '2023',
    featured: false,
  },
  {
    title: 'Echo Sports',
    client: 'Sports Brand',
    category: 'Web Design',
    image: 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Dynamic e-commerce experience for athletic wear',
    year: '2023',
    featured: false,
  },
  {
    title: 'Zen Wellness',
    client: 'Health & Wellness',
    category: 'Branding',
    image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Holistic brand identity for wellness platform',
    year: '2023',
    featured: true,
  },
];

const categories = ['All', 'Web Design', 'Branding', 'Development', 'Digital Marketing'];

export function Work() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects = useMemo(
    () => activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="work" className="projects py-32 sm:py-48 bg-neutral-900 relative overflow-hidden">
      <SectionShapes variant="work" />
      <GeometricShapes variant="floating" />
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        <div className="mb-32">
          <div className="flex items-end justify-between mb-16">
            <SectionHeading
              label="Portfolio"
              title={<>Selected<br />Work</>}
              theme="dark"
              align="left"
            />
            <div className="hidden md:block text-white/40 text-xs uppercase tracking-[0.3em] font-light">
              {filteredProjects.length} Projects
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 text-xs font-light uppercase tracking-[0.25em] transition-all duration-500 border ${
                  activeCategory === category
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <AnimatedBorder
              key={project.title}
              color={project.featured ? '#8b5cf6' : '#06b6d4'}
              strokeWidth={2}
              borderRadius={12}
              duration={2 + index * 0.2}
              delay={index * 0.1}
              className="project-card group"
            >
              <div
                className="relative overflow-hidden bg-neutral-800/50 rounded-xl transition-all duration-500"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
              <div className="grid grid-cols-12 gap-0">
                <div className="col-span-12 md:col-span-8 relative overflow-hidden aspect-[16/9] md:aspect-[16/7]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                    style={{
                      filter: hoveredIndex === index ? 'brightness(0.5)' : 'brightness(0.7) grayscale(0.3)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                  <div
                    className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/20 transition-all duration-700"
                    style={{
                      transform: hoveredIndex === index ? 'scale(1)' : 'scale(0.8)',
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                  ></div>
                </div>

                <div className="col-span-12 md:col-span-4 flex flex-col justify-center p-8 md:p-12">
                  <div className="space-y-6">
                    <div>
                      <div className="text-violet-600 text-xs font-bold uppercase tracking-widest mb-3">
                        {project.category}
                      </div>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl text-white font-black tracking-tight mb-4">
                        {project.title}
                      </h3>
                      <p className="text-neutral-300 text-sm mb-2">{project.client}</p>
                      <p className="text-neutral-200 text-base leading-[1.7]">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-white group-hover:text-violet-600 transition-colors duration-300">
                      <span className="text-sm uppercase tracking-wider font-bold">View Project</span>
                      <ArrowUpRight
                        size={20}
                        strokeWidth={2.5}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-violet-400 origin-left transition-transform duration-700"
                style={{
                  transform: hoveredIndex === index ? 'scaleX(1)' : 'scaleX(0)',
                }}
              ></div>

              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6) 0%, transparent 100%)',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                  opacity: hoveredIndex === index ? 0.3 : 0.1,
                }}
              />

              <div
                className="absolute bottom-0 left-0 w-40 h-40 opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(315deg, rgba(139, 92, 246, 0.6) 0%, transparent 100%)',
                  clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
                  opacity: hoveredIndex === index ? 0.3 : 0.1,
                }}
              />

              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-5 pointer-events-none transition-opacity duration-500"
                style={{
                  transform: 'translate(-50%, -50%) rotate(15deg)',
                  opacity: hoveredIndex === index ? 0.1 : 0.05,
                }}
              >
                <polygon points="64,32 96,64 64,96 32,64" fill="none" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="2" />
                <circle cx="64" cy="64" r="48" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" />
              </svg>
              </div>
            </AnimatedBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
