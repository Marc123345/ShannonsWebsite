import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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

  const handleProjectClick = useCallback((slug: string) => {
    navigate(`/work/${slug}`);
  }, [navigate]);

  return (
    <div className="project-grid-container py-24 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid-header mb-16 animate-fade-in">
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
              onClick={() => handleProjectClick(project.slug)}
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

const ProjectCard = memo(function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <div
      className="project-grid-item group cursor-pointer opacity-0 animate-fade-in"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'forwards',
      }}
      onClick={onClick}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-neutral-900 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
        style={{
          boxShadow: `0 10px 40px -10px ${project.color_primary}20`,
        }}
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="project-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm"
                    style={{
                      backgroundColor: `${project.color_primary}30`,
                      color: project.color_primary,
                      border: `1px solid ${project.color_primary}50`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
                {project.title}
              </h3>

              <p className="text-base text-neutral-300 mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {project.description}
              </p>

              <div className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                <span style={{ color: project.color_primary }}>View Project</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: project.color_primary }}
                />
              </div>
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
});
