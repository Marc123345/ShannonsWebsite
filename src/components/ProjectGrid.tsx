import { useEffect, useRef, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail_url: string;
  color_primary: string;
  color_secondary: string;
  tags: string[];
}

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid = memo(function ProjectGrid({ projects }: ProjectGridProps) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.grid-header', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.project-grid-item', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.project-grid-items',
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project.slug);

    const timeline = gsap.timeline();
    timeline
      .to('.project-grid-item', {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: 'power3.inOut',
        stagger: 0.05,
      })
      .to('.project-grid-container', {
        opacity: 0,
        duration: 0.3,
      })
      .call(() => {
        navigate(`/project/${project.slug}`);
      });
  };

  return (
    <div ref={containerRef} className="project-grid-container py-24 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid-header mb-16">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
            Featured Work
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl">
            Explore our portfolio of transformative projects that push creative boundaries.
          </p>
        </div>

        <div className="project-grid-items grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !innerRef.current) return;

    const card = cardRef.current;
    const inner = innerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(inner, {
        rotationY: x * 15,
        rotationX: -y * 15,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(inner, {
        scale: 1.02,
        duration: 0.4,
        ease: 'power3.out',
      });

      gsap.to(card.querySelector('.project-image'), {
        scale: 1.1,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(inner, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(card.querySelector('.project-image'), {
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-grid-item group relative cursor-pointer perspective-1000"
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        ref={innerRef}
        className="relative overflow-hidden rounded-2xl bg-neutral-900"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="project-image w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            style={{
              transform: 'translateZ(20px)',
            }}
          />

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${project.color_primary}40, ${project.color_secondary}40)`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 p-8"
          style={{
            transform: 'translateZ(40px)',
          }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xs uppercase tracking-wider font-semibold"
                style={{ color: project.color_primary }}
              >
                {project.category}
              </span>
              <div className="h-1 flex-1 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 group-hover:bg-clip-text transition-all duration-300">
              {project.title}
            </h3>

            <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full text-white/70 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300">
              <span className="text-sm font-medium tracking-wide">View Project</span>
              <ArrowRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `0 0 60px ${project.color_primary}40`,
          }}
        />
      </div>
    </div>
  );
}
