import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  disabled,
  ...props 
}) => {
  const baseStyles = "relative group flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#121213]";
  
  const variants = {
    primary: `
      text-primary border border-primary 
      bg-primary-alpha15 
      hover:bg-primary-alpha25 hover:shadow-glow-hover hover:-translate-y-0.5
      focus:ring-primary
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
    `,
    secondary: `
      text-white border border-white/20 
      bg-white/5 
      hover:bg-white/10 hover:border-white/40
      focus:ring-white
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    danger: `
      text-red-400 border border-red-400/50
      bg-red-400/10
      hover:bg-red-400/20 hover:shadow-[0_0_20px_rgba(248,113,113,0.3)]
      disabled:opacity-50
    `
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="tracking-wide">{children}</span>
    </button>
  );
};
