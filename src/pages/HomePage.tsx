import { lazy, Suspense } from 'react';
import { ScrollTransition } from '../components/ScrollTransition';
import { LusionHero } from '../components/LusionHero';
import { HomeReel } from '../components/HomeReel';

const About = lazy(() => import('../components/About').then(m => ({ default: m.About })));
const Services = lazy(() => import('../components/Services').then(m => ({ default: m.Services })));
const Work = lazy(() => import('../components/Work').then(m => ({ default: m.Work })));
const Testimonials = lazy(() => import('../components/Testimonials').then(m => ({ default: m.Testimonials })));
const Brands = lazy(() => import('../components/Brands').then(m => ({ default: m.Brands })));
const MinimalContact = lazy(() => import('../components/MinimalContact').then(m => ({ default: m.MinimalContact })));

const SectionLoader = () => (
  <div className="w-full min-h-[50vh] flex items-center justify-center bg-neutral-950">
    <div className="animate-pulse text-white/50 text-sm">Loading...</div>
  </div>
);

const HeroLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-neutral-950">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <div className="text-white/70 text-sm">Loading...</div>
    </div>
  </div>
);

export function HomePage() {
  return (
    <>
      <LusionHero />
      <HomeReel />

      <ScrollTransition>
        <Suspense fallback={<SectionLoader />}>
          <Brands />
        </Suspense>
      </ScrollTransition>

      <ScrollTransition delay={0.1}>
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
      </ScrollTransition>

      <ScrollTransition delay={0.15}>
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
      </ScrollTransition>

      <ScrollTransition delay={0.2}>
        <Suspense fallback={<SectionLoader />}>
          <Work />
        </Suspense>
      </ScrollTransition>

      <ScrollTransition delay={0.1}>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
      </ScrollTransition>

      <ScrollTransition>
        <Suspense fallback={<SectionLoader />}>
          <MinimalContact />
        </Suspense>
      </ScrollTransition>
    </>
  );
}

export default HomePage;
