import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { supabase, BlogPost } from '../lib/supabase';
import { FadeIn } from '../components/animations/FadeIn';
import { StaggeredGrid } from '../components/animations/StaggeredGrid';
import { Card } from '../components/layout/Card';
import { Button } from '../components/ui/Button';
import { GlitchText } from '../components/animations/GlitchText';

const categories = ['All', 'Design', 'Development', 'Marketing', 'Strategy'];

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      if (!supabase) {
        console.warn('Supabase not available');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-black relative">
      <section className="pt-40 pb-20 bg-black relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://ik.imagekit.io/qcvroy8xpd/source_Animated%20Gradient%20Background.png?updatedAt=1760473168998)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <FadeIn direction="up">
            <p className="text-brand-purple text-sm font-bold tracking-widest uppercase mb-4">Insights & Ideas</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter">
              <GlitchText text="OUR BLOG" intensity={6} />
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-brand-purple to-brand-pink mb-8"></div>
            <p className="text-neutral-400 text-xl md:text-2xl max-w-3xl font-light">
              Exploring the latest trends, insights, and innovations in digital design and development
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 sm:py-24 md:py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <FadeIn direction="up" delay={200}>
          <div className="flex flex-wrap gap-3 mb-16">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`cursor-hover px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-brand-purple text-white'
                    : 'bg-neutral-900 border-2 border-neutral-700 text-white hover:border-brand-purple hover:bg-neutral-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
            <p className="text-neutral-600 mt-4">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <FadeIn direction="up" delay={400}>
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-white mb-4">No posts yet</h3>
              <p className="text-neutral-400">
                Check back soon for insights and updates from our team.
              </p>
            </div>
          </FadeIn>
        ) : (
          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={100}>
            {filteredPosts.map((post) => (
              <Card key={post.id} hover className="group overflow-hidden p-0">
                {post.image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(post.published_at)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </span>
                  </div>
                  <span className="inline-block text-brand-purple text-xs font-bold uppercase tracking-widest mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-neutral-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:text-brand-purple p-0"
                  >
                    <span className="flex items-center gap-2">
                      Read More
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </Card>
            ))}
          </StaggeredGrid>
        )}
        </div>
      </section>
    </div>
  );
}
export default BlogPage;
