'use client';

import React, { useState } from 'react';

type StarSize = 'sm' | 'md' | 'lg';

interface StarRatingProps {
  rating: number;
  size?: StarSize;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizePx: Record<StarSize, number> = {
  sm: 14,
  md: 20,
  lg: 28,
};

const StarIcon = ({
  filled,
  half,
  size,
  onClick,
  onMouseEnter,
}: {
  filled: boolean;
  half: boolean;
  size: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
}) => {
  const fill = filled ? '#F9ED32' : half ? 'url(#half)' : '#E5E7EB';
  const id = `half-${Math.random().toString(36).slice(2)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={{ cursor: onClick ? 'pointer' : 'default', display: 'inline-block' }}
    >
      {half && (
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="#F9ED32" />
            <stop offset="50%" stopColor="#E5E7EB" />
          </linearGradient>
        </defs>
      )}
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={half ? `url(#${id})` : fill}
        stroke="#171717"
        strokeWidth="1"
      />
    </svg>
  );
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 'md',
  interactive = false,
  onChange,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const starPx = sizePx[size];
  const displayRating = hovered !== null ? hovered : rating;

  return (
    <div
      style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}
      onMouseLeave={() => setHovered(null)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = displayRating >= star;
        const half = !filled && displayRating >= star - 0.5;
        return (
          <StarIcon
            key={star}
            filled={filled}
            half={half}
            size={starPx}
            onClick={interactive ? () => onChange?.(star) : undefined}
            onMouseEnter={interactive ? () => setHovered(star) : undefined}
          />
        );
      })}
      {!interactive && (
        <span
          style={{
            marginLeft: 4,
            fontSize: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
            fontWeight: 700,
            color: '#171717',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
