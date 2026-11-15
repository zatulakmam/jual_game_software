'use client';

import React, { useState } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  name,
  id,
  className = '',
}) => {
  const [focused, setFocused] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: `2px solid ${error ? '#EF4444' : '#171717'}`,
    borderRadius: '6px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '15px',
    fontWeight: 500,
    color: '#171717',
    backgroundColor: disabled ? '#F3F4F6' : '#ffffff',
    outline: 'none',
    boxShadow: focused
      ? error
        ? '4px 4px 0px #EF4444'
        : '4px 4px 0px #F9ED32'
      : '2px 2px 0px #171717',
    transition: 'box-shadow 0.15s ease',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '6px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    color: '#171717',
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id || name} style={labelStyle}>
          {label}
          {required && <span style={{ color: '#EF4444', marginLeft: 4 }}>*</span>}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        style={inputStyle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && (
        <p
          style={{
            marginTop: 6,
            fontSize: '13px',
            fontWeight: 600,
            color: '#EF4444',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
