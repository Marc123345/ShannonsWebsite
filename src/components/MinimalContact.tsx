import { useState } from 'react';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { supabase, type ContactFormData as DBContactFormData } from '../lib/supabase';

interface ContactFormData {
  name: string;
  email: string;
  budget: string;
  message: string;
}

export function MinimalContact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});

  const validateField = (name: keyof ContactFormData, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<ContactFormData> = {};
    (Object.keys(formData) as Array<keyof ContactFormData>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, budget: true, message: true });

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const dbData: DBContactFormData = {
        name: formData.name,
        email: formData.email,
        budget: formData.budget || null,
        message: formData.message,
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([dbData]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        budget: '',
        message: '',
      });
      setErrors({});
      setTouched({});

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name as keyof ContactFormData]) {
      const error = validateField(name as keyof ContactFormData, value);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof ContactFormData, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  return (
    <section className="py-32 md:py-40 lg:py-48 bg-neutral-950">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-[clamp(2.5rem,8vw,7rem)] font-black text-white leading-[0.9] tracking-[-0.04em] uppercase">
                Let's Build Your Strategy
              </h2>
              <p className="text-xl md:text-2xl text-neutral-200 leading-[1.6] font-light max-w-2xl">
                We'd love to hear more about your brand, your goals, and how we can help you connect more meaningfully with your audience.
              </p>
            </div>

            <div className="space-y-8 pt-8 border-t border-white/10">
              <div>
                <h3 className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-3">Email</h3>
                <a href="mailto:hello@h2hmarketing.com" className="text-2xl text-white hover:text-brand-purple transition-colors font-light">
                  hello@h2hmarketing.com
                </a>
              </div>
              <div>
                <h3 className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-3">Phone</h3>
                <a href="tel:+15551234567" className="text-2xl text-white hover:text-brand-purple transition-colors font-light">
                  +1 (555) 123-4567
                </a>
              </div>
              <div>
                <h3 className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-3">Location</h3>
                <p className="text-2xl text-white font-light">Remote & Global</p>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-3">
                <label htmlFor="name" className="block text-xs font-bold text-brand-purple uppercase tracking-widest">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-0 py-4 border-b-2 bg-transparent text-white text-lg focus:outline-none transition-all ${
                    errors.name && touched.name
                      ? 'border-red-500'
                      : 'border-white/20 focus:border-brand-purple'
                  }`}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label htmlFor="email" className="block text-xs font-bold text-brand-purple uppercase tracking-widest">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-0 py-4 border-b-2 bg-transparent text-white text-lg focus:outline-none transition-all ${
                    errors.email && touched.email
                      ? 'border-red-500'
                      : 'border-white/20 focus:border-brand-purple'
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label htmlFor="budget" className="block text-xs font-bold text-brand-purple uppercase tracking-widest">
                  Budget (Optional)
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-0 py-4 border-b-2 border-white/20 bg-transparent text-white text-lg focus:outline-none focus:border-brand-purple transition-all"
                >
                  <option value="">Select...</option>
                  <option value="<$5k">Under $5,000</option>
                  <option value="$5k-$10k">$5,000 - $10,000</option>
                  <option value="$10k-$25k">$10,000 - $25,000</option>
                  <option value="$25k-$50k">$25,000 - $50,000</option>
                  <option value="$50k+">$50,000+</option>
                </select>
              </div>

              <div className="space-y-3">
                <label htmlFor="message" className="block text-xs font-bold text-brand-purple uppercase tracking-widest">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows={6}
                  className={`w-full px-0 py-4 border-b-2 bg-transparent text-white text-lg resize-none focus:outline-none transition-all ${
                    errors.message && touched.message
                      ? 'border-red-500'
                      : 'border-white/20 focus:border-brand-purple'
                  }`}
                />
                {errors.message && touched.message && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.message}
                  </p>
                )}
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 p-4" role="status">
                  <div className="flex items-center gap-2">
                    <Check className="text-green-600" size={20} />
                    <p className="text-green-800 text-sm font-medium">
                      Message sent successfully!
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 p-4" role="alert">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="text-red-600" size={20} />
                    <p className="text-red-800 text-sm font-medium">
                      Failed to send message. Please try again.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-12 py-5 bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-sm uppercase tracking-widest hover:shadow-glow-purple hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting && <Loader2 className="animate-spin" size={20} />}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
