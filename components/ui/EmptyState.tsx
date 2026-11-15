'use client';

import React from 'react';
import Button from './Button';

interface ActionConfig {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
}

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ActionConfig;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 32px',
        textAlign: 'center',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Decorative box */}
      <div style={{ position: 'relative', marginBottom: 32 }}>
        {/* Background decorative squares */}
        <div
          style={{
            position: 'absolute',
            top: -8,
            left: -8,
            width: 96,
            height: 96,
            backgroundColor: '#A78BFA',
            border: '2px solid #171717',
            borderRadius: 8,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            width: 96,
            height: 96,
            backgroundColor: '#55E6D1',
            border: '2px solid #171717',
            borderRadius: 8,
            zIndex: 1,
          }}
        />
        {/* Main icon box */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: 96,
            height: 96,
            backgroundColor: '#F9ED32',
            border: '3px solid #171717',
            boxShadow: '4px 4px 0px #171717',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
          }}
        >
          {icon || '📭'}
        </div>
      </div>

      <h3
        style={{
          fontSize: '24px',
          fontWeight: 800,
          color: '#171717',
          margin: '0 0 12px',
        }}
      >
        {title}
      </h3>

      {description && (
        <p
          style={{
            fontSize: '15px',
            fontWeight: 500,
            color: '#6B7280',
            maxWidth: 400,
            lineHeight: 1.6,
            margin: '0 0 28px',
          }}
        >
          {description}
        </p>
      )}

      {action && (
        <Button
          variant={action.variant || 'primary'}
          onClick={action.onClick}
          href={action.href}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
