'use client';

import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#F9ED32',
    color: '#171717',
    border: '2px solid #171717',
    boxShadow: '4px 4px 0px #171717',
  },
  secondary: {
    backgroundColor: '#A78BFA',
    color: '#171717',
    border: '2px solid #171717',
    boxShadow: '4px 4px 0px #171717',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#171717',
    border: '2px solid #171717',
    boxShadow: '4px 4px 0px #171717',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#171717',
    border: '2px solid transparent',
    boxShadow: 'none',
  },
  danger: {
    backgroundColor: '#EF4444',
    color: '#ffffff',
    border: '2px solid #171717',
    boxShadow: '4px 4px 0px #171717',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '6px 12px', fontSize: '13px', fontWeight: 700 },
  md: { padding: '10px 20px', fontSize: '15px', fontWeight: 700 },
  lg: { padding: '14px 28px', fontSize: '17px', fontWeight: 700 },
};

const Spinner = ({ size }: { size: ButtonSize }) => {
  const dim = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;
  return (
    <svg
      style={{ width: dim, height: dim, marginRight: 8, animation: 'spin 1s linear infinite' }}
      viewBox="0 0 24 24"
      fill="none"
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 60" strokeLinecap="round" />
    </svg>
  );
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  href,
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    fontFamily: "'Space Grotesk', sans-serif",
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled && !loading) {
      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
  };

  const content = (
    <>
      {loading && <Spinner size={size} />}
      {children}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link
        href={href}
        style={baseStyle}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      style={baseStyle}
      className={className}
      onClick={!disabled && !loading ? onClick : undefined}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </button>
  );
};

export default Button;
