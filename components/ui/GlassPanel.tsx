import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function GlassPanel({ children, className = '', ...props }: GlassPanelProps) {
  return (
    <div
      className={`bg-glass-bg border border-glass-border backdrop-blur-glass rounded-2xl shadow-glass ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
