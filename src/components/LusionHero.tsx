import { HeroText } from './HeroText';
import { HeroCanvas } from './HeroCanvas';

export function LusionHero() {
  return (
    <section className="relative min-h-screen bg-white pt-24 pb-16 px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        {/* Top Row */}
        <div className="flex items-start justify-between mb-12 md:mb-16">
          {/* Left Logo */}
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            H2H
          </div>

          {/* Right Text */}
          <div className="flex-1 ml-8 md:ml-16">
            <HeroText />
          </div>
        </div>

        {/* Floating Icons Canvas */}
        <HeroCanvas />
      </div>
    </section>
  );
}
