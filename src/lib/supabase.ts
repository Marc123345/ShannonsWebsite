import { createClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          service: string | null;
          budget: string | null;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          service?: string | null;
          budget?: string | null;
          message: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string | null;
          service?: string | null;
          budget?: string | null;
          message?: string;
          status?: string;
          created_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          author: string;
          category: string;
          image_url: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          author: string;
          category: string;
          image_url?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          author?: string;
          category?: string;
          image_url?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
      };
    };
  };
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase: ReturnType<typeof createClient<Database>> | null = null;

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured. Database features will be disabled.');
  } else {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  supabase = null;
}

export { supabase };

export type ContactFormData = Database['public']['Tables']['contact_submissions']['Insert'];
export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
