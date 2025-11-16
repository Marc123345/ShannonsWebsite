import { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionHeading({ children, subtitle, className = '', align = 'center' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

  return (
    <div className={`mb-12 md:mb-16 ${alignClass} ${className}`}>
      <h2 className="text-[clamp(2.5rem,8vw,7rem)] font-black uppercase tracking-[-0.04em] leading-[0.9] mb-8">
        {children}
      </h2>
      {subtitle && (
        <p className="text-xl md:text-2xl text-neutral-200 leading-[1.6] max-w-2xl mx-auto font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}
