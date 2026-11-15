'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  defaultValue?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search products...',
  onSearch,
  defaultValue = '',
  className = '',
  size = 'md',
}) => {
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const heights: Record<string, string> = { sm: '36px', md: '44px', lg: '52px' };
  const fontSizes: Record<string, string> = { sm: '13px', md: '15px', lg: '16px' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  const handleClear = () => {
    setValue('');
    onSearch?.('');
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: heights[size],
          border: `2px solid #171717`,
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxShadow: focused ? '4px 4px 0px #F9ED32' : '2px 2px 0px #171717',
          transition: 'box-shadow 0.15s ease',
          overflow: 'hidden',
        }}
      >
        {/* Search icon */}
        <div style={{ padding: '0 10px 0 14px', color: '#6B7280', display: 'flex', flexShrink: 0 }}>
          <Search size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: fontSizes[size],
            fontWeight: 500,
            color: '#171717',
          }}
        />

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              padding: '0 10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6B7280',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}

        {/* Search button */}
        <button
          type="submit"
          style={{
            height: '100%',
            padding: `0 ${size === 'lg' ? 20 : 14}px`,
            backgroundColor: '#F9ED32',
            border: 'none',
            borderLeft: '2px solid #171717',
            cursor: 'pointer',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: fontSizes[size],
            fontWeight: 700,
            color: '#171717',
            flexShrink: 0,
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
