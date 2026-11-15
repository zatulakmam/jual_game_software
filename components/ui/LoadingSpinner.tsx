import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizePx: Record<SpinnerSize, number> = {
  sm: 20,
  md: 36,
  lg: 56,
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const px = sizePx[size];

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes brutSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <svg
        width={px}
        height={px}
        viewBox="0 0 50 50"
        style={{ animation: 'brutSpin 0.8s linear infinite' }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#171717"
          strokeWidth="4"
          opacity="0.15"
        />
        <path
          d="M25 5 A20 20 0 0 1 45 25"
          fill="none"
          stroke="#F9ED32"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M45 25 A20 20 0 0 1 25 45"
          fill="none"
          stroke="#A78BFA"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M25 45 A20 20 0 0 1 5 25"
          fill="none"
          stroke="#55E6D1"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
