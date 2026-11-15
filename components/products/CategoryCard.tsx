'use client';

import React from 'react';
import Link from 'next/link';
import {
  Monitor,
  Gamepad2,
  Zap,
  Code2,
  Palette,
  FileText,
  Puzzle,
  Package,
  ArrowRight,
} from 'lucide-react';
import type { Category } from '@/lib/types';

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Gamepad2,
  Zap,
  Code2,
  Palette,
  FileText,
  Puzzle,
};

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, className = '' }) => {
  const IconComponent = iconMap[category.icon] || Package;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`group block p-5 rounded-xl transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[7px_7px_0px_#171717] ${className}`}
      style={{
        backgroundColor: category.color || '#F9ED32',
        border: '3px solid #171717',
        boxShadow: '4px 4px 0px #171717',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center bg-white border-2 border-[#171717] shadow-[2px_2px_0px_#171717] transition-transform duration-200 group-hover:rotate-6"
        >
          <IconComponent className="w-6 h-6 text-[#171717]" />
        </div>
        <span
          className="text-xs font-black px-2.5 py-1 rounded bg-[#171717] text-white border border-[#171717]"
        >
          {category.product_count} Produk
        </span>
      </div>

      <h3 className="font-black text-lg text-[#171717] mb-1.5 group-hover:underline">
        {category.name}
      </h3>

      <p className="text-xs font-medium text-[#171717] opacity-80 mb-4 line-clamp-2">
        {category.description}
      </p>

      <div className="flex items-center text-xs font-black text-[#171717] gap-1 group-hover:translate-x-1 transition-transform">
        <span>Jelajahi Kategori</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
};

export default CategoryCard;
