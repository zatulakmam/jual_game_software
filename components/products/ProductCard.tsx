'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/lib/store';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} ditambahkan ke keranjang!`, {
      style: {
        border: '2px solid #171717',
        borderRadius: '8px',
        boxShadow: '4px 4px 0px #171717',
        background: '#F9ED32',
        color: '#171717',
        fontWeight: 'bold',
        fontFamily: "'Space Grotesk', sans-serif",
      },
      icon: '🛒',
    });
  };

  return (
    <div
      className={`group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[7px_7px_0px_#171717] ${className}`}
      style={{
        border: '3px solid #171717',
        boxShadow: '4px 4px 0px #171717',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Cover Image Container */}
      <div className="relative w-full h-48 bg-[#F5F0E8] border-b-[3px] border-[#171717] overflow-hidden">
        <img
          src={product.cover_image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // fallback if image fails
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop';
          }}
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={product.badge} />
          </div>
        )}

        {/* Category chip */}
        <div className="absolute bottom-3 right-3 z-10">
          <span
            className="text-[11px] font-bold px-2 py-0.5 rounded bg-white text-[#171717] uppercase tracking-wider"
            style={{ border: '1.5px solid #171717', boxShadow: '2px 2px 0px #171717' }}
          >
            {product.category?.name || 'Digital'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Sold count */}
          <div className="flex items-center justify-between text-xs mb-2 font-semibold text-gray-700">
            <div className="flex items-center gap-1 bg-[#F9ED32] px-1.5 py-0.5 rounded border border-[#171717]">
              <Star className="w-3.5 h-3.5 fill-[#171717] text-[#171717]" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-gray-600 font-normal">({product.review_count})</span>
            </div>
            <span className="text-gray-500">{product.sold_count.toLocaleString('id-ID')} terjual</span>
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-extrabold text-base text-[#171717] hover:text-[#FF7547] transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t-2 border-dashed border-gray-200 mt-2">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-black text-[#171717]">
              {formatPrice(product.price)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xs text-gray-400 line-through font-semibold">
                {formatPrice(product.original_price)}
              </span>
            )}
            {product.discount_percentage && (
              <span className="text-[10px] font-bold bg-[#FF7547] text-white px-1.5 py-0.2 rounded border border-[#171717]">
                -{product.discount_percentage}%
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold bg-[#F5F0E8] hover:bg-gray-200 text-[#171717] rounded-lg border-2 border-[#171717] shadow-[2px_2px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center"
            >
              <Eye className="w-3.5 h-3.5" />
              Detail
            </Link>

            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-black bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] rounded-lg border-2 border-[#171717] shadow-[2px_2px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              + Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
