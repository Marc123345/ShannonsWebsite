import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`
        bg-neutral-900 border-2 border-neutral-800 overflow-hidden
        ${hover ? 'transition-all duration-300 hover:border-brand-purple' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
