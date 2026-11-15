'use client';

import React, { useEffect, useRef } from 'react';

type ModalSize = 'sm' | 'md' | 'lg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
}

const sizeWidths: Record<ModalSize, string> = {
  sm: '400px',
  md: '560px',
  lg: '720px',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    animation: 'fadeIn 0.15s ease',
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: '#F5F0E8',
    border: '3px solid #171717',
    boxShadow: '8px 8px 0px #171717',
    borderRadius: '10px',
    width: '100%',
    maxWidth: sizeWidths[size],
    maxHeight: '90vh',
    overflow: 'auto',
    fontFamily: "'Space Grotesk', sans-serif",
    animation: 'slideUp 0.2s ease',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '2px solid #171717',
  };

  return (
    <div style={backdropStyle} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
      <div style={modalStyle} ref={modalRef} role="dialog" aria-modal="true">
        {title && (
          <div style={headerStyle}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#171717', margin: 0 }}>{title}</h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: '2px solid #171717',
                borderRadius: '6px',
                width: 36,
                height: 36,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 700,
                color: '#171717',
              }}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        )}
        <div style={{ padding: '24px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
