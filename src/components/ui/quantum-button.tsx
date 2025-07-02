import React from 'react';
import { cn } from '@/lib/utils';

interface QuantumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'neural';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
}

const QuantumButton: React.FC<QuantumButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  glowing = false,
  ...props
}) => {
  const baseClasses = `
    relative overflow-hidden font-medium transition-all duration-300 
    transform-gpu will-change-transform group
    backdrop-blur-md border border-white/10
    shadow-[0_0_20px_rgba(147,51,234,0.3)]
    hover:shadow-[0_0_40px_rgba(147,51,234,0.5)]
    hover:-translate-y-1 hover:scale-[1.02]
    active:scale-[0.98] active:translate-y-0
    before:absolute before:inset-0 before:bg-gradient-to-r 
    before:from-purple-600/0 before:via-purple-400/10 before:to-cyan-400/0
    before:translate-x-[-100%] before:transition-transform before:duration-700
    hover:before:translate-x-[100%]
    after:absolute after:inset-[1px] after:rounded-[inherit] 
    after:bg-gradient-to-b after:from-white/5 after:to-transparent
    focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-gray-900
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-purple-600 to-cyan-500
      text-white
      hover:from-purple-500 hover:to-cyan-400
    `,
    secondary: `
      bg-gradient-to-r from-gray-800/80 to-gray-700/80
      text-gray-100 border-gray-600/30
      hover:from-gray-700/80 hover:to-gray-600/80
      shadow-[0_0_20px_rgba(75,85,99,0.3)]
      hover:shadow-[0_0_40px_rgba(75,85,99,0.5)]
    `,
    neural: `
      bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-400
      text-white animate-pulse
      shadow-[0_0_30px_rgba(167,139,250,0.6)]
      hover:shadow-[0_0_50px_rgba(167,139,250,0.8)]
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  };

  const glowClasses = glowing ? `
    animate-pulse
    shadow-[0_0_30px_rgba(147,51,234,0.8),0_0_60px_rgba(147,51,234,0.4)]
  ` : '';

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glowClasses,
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Neural pulse effect */}
      <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </button>
  );
};

export default QuantumButton;