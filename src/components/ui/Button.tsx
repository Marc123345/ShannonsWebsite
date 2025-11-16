import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'font-bold uppercase tracking-widest transition-all duration-300 inline-flex items-center justify-center cursor-hover';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-brand-purple to-brand-pink text-white hover:shadow-glow-purple hover:scale-105',
    secondary: 'bg-neutral-800 text-white border-2 border-neutral-700 hover:border-brand-purple hover:bg-brand-purple/10',
    outline: 'bg-transparent text-white border-2 border-brand-purple hover:bg-brand-purple hover:border-brand-purple',
    ghost: 'bg-transparent text-white hover:text-brand-purple',
  };

  const sizeClasses = {
    sm: 'px-6 py-3 text-xs',
    md: 'px-8 py-4 text-sm',
    lg: 'px-12 py-5 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
