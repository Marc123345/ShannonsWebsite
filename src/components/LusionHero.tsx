import { HeroText } from './HeroText';
import { HeroCanvas } from './HeroCanvas';

export function LusionHero() {
  return (
    <section className="relative min-h-screen bg-white pt-48 pb-16 px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        {/* Hero Text */}
        <div className="mb-20 md:mb-24">
          <HeroText />
        </div>

        {/* Floating Icons Canvas */}
        <HeroCanvas />
      </div>
    </section>
  );
}
