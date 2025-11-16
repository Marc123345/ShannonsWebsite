import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ProjectGrid } from '../components/ProjectGrid';
import { GlitchText } from '../components/animations/GlitchText';
import { MagneticText } from '../components/animations/MagneticText';

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
  featured: boolean;
}

export function WorkPage() {
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error} = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setDbProjects(data || []);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen relative">
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
          <div className="mb-20">
            <p className="text-brand-purple text-sm font-bold tracking-widest uppercase mb-4">Our Portfolio</p>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-6 tracking-tighter">
              <GlitchText text="SELECTED" className="block" intensity={8} />
              <MagneticText text="WORK" strength={30} />
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-brand-purple to-brand-pink mb-8 shadow-glow-purple"></div>
            <p className="text-neutral-400 text-xl md:text-2xl max-w-3xl font-light">
              A showcase of projects that demonstrate our creative excellence and technical mastery
            </p>
          </div>
        </div>
      </section>

      <ProjectGrid projects={dbProjects} />

      <section className="py-20 bg-black border-t border-neutral-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Have a Project in Mind?</h2>
          <p className="text-neutral-400 text-xl max-w-2xl mx-auto mb-10">
            Let's create something extraordinary together
          </p>
          <button className="cursor-hover group relative bg-gradient-to-r from-brand-purple to-brand-pink px-12 py-6 text-white font-bold text-lg uppercase tracking-wider hover:shadow-glow-purple transition-all duration-300 hover:scale-105 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-brand-pink to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Start Your Project</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default WorkPage;
