import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  full_description: string;
  thumbnail_url: string;
  hero_image_url: string;
  client: string;
  year: number;
  tags: string[];
  color_primary: string;
  color_secondary: string;
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error('Error fetching project:', error);
        setLoading(false);
        return;
      }

      setProject(data);
      setLoading(false);
    }

    fetchProject();
  }, [slug]);

  useEffect(() => {
    if (!loading && project && containerRef.current) {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          '.project-hero',
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
        )
        .fromTo(
          '.project-title',
          { opacity: 0, y: 100, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
          { opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          '.project-meta',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.project-content',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );
    }
  }, [loading, project]);

  const handleBackClick = () => {
    const timeline = gsap.timeline();
    timeline
      .to('.project-detail-content', {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: 'power3.in',
      })
      .to('.project-hero', {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
      }, '-=0.3')
      .call(() => {
        navigate(-1);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl text-white mb-4">Project not found</h2>
          <button
            onClick={() => navigate('/work')}
            className="px-6 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-neutral-950"
      style={{
        background: `linear-gradient(to bottom, ${project.color_primary}10, transparent 50%, ${project.color_secondary}10)`,
      }}
    >
      <motion.button
        onClick={handleBackClick}
        className="fixed top-24 left-8 z-50 px-6 py-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-black/70 transition-all duration-300 flex items-center gap-2 group"
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </motion.button>

      <div className="project-hero relative h-screen overflow-hidden">
        <img
          src={project.hero_image_url}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, ${project.color_primary}20 70%, rgba(0,0,0,0.9) 100%)`,
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-12 md:p-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="project-title mb-8">
              <h1
                className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter"
                style={{
                  textShadow: '0 10px 40px rgba(0,0,0,0.5)',
                }}
              >
                {project.title}
              </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 project-meta">
              <div>
                <p className="text-sm text-neutral-500 uppercase tracking-wider mb-2">Client</p>
                <p className="text-xl text-white font-medium">{project.client}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 uppercase tracking-wider mb-2">Year</p>
                <p className="text-xl text-white font-medium">{project.year}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 uppercase tracking-wider mb-2">Category</p>
                <p className="text-xl text-white font-medium">{project.category}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 uppercase tracking-wider mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full text-white/70 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-detail-content relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="project-content grid md:grid-cols-2 gap-16 mb-24">
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: project.color_primary }}
              >
                Overview
              </h2>
              <p className="text-xl text-neutral-300 leading-relaxed">
                {project.full_description}
              </p>
            </div>

            <div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: project.color_secondary }}
              >
                Approach
              </h2>
              <p className="text-xl text-neutral-300 leading-relaxed mb-6">
                Our approach combined strategic thinking with creative execution, ensuring every touchpoint reflected the brand's values and resonated with the target audience.
              </p>
              <div className="space-y-4">
                {project.tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: project.color_primary }}
                    />
                    <span className="text-lg text-white">{tag}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => navigate('/contact')}
              className="group relative px-12 py-6 bg-gradient-to-r text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${project.color_primary}, ${project.color_secondary})`,
              }}
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
