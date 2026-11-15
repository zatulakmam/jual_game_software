import React from 'react';

type BadgeVariant = 'best-seller' | 'new-arrival' | 'hot' | 'sale' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  'best-seller': {
    backgroundColor: '#F9ED32',
    color: '#171717',
  },
  'new-arrival': {
    backgroundColor: '#55E6D1',
    color: '#171717',
  },
  hot: {
    backgroundColor: '#FF7547',
    color: '#171717',
  },
  sale: {
    backgroundColor: '#EF4444',
    color: '#ffffff',
  },
  default: {
    backgroundColor: '#E5E7EB',
    color: '#171717',
  },
};

const variantLabels: Record<BadgeVariant, string> = {
  'best-seller': '🔥 Best Seller',
  'new-arrival': '✨ New',
  hot: '⚡ Hot',
  sale: '🏷️ Sale',
  default: '',
};

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className = '' }) => {
  const displayText = children || variantLabels[variant];

  return (
    <span
      style={{
        ...variantStyles[variant],
        border: '1.5px solid #171717',
        boxShadow: '2px 2px 0px #171717',
        display: 'inline-block',
        padding: '2px 8px',
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderRadius: '4px',
        fontFamily: "'Space Grotesk', sans-serif",
        lineHeight: 1.5,
      }}
      className={className}
    >
      {displayText}
    </span>
  );
};

export default Badge;
