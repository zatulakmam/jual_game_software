import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { StarState } from './types'

/**
 * Merge Tailwind CSS classes with conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format number to Indonesian Rupiah (e.g., Rp85.000)
 */
export function formatPrice(price: number): string {
  const formatted = price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `Rp${formatted}`
}

/**
 * Format ISO date string to Indonesian date format (e.g., "15 November 2024")
 */
export function formatDate(date: string): string {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]
  const d = new Date(date)
  const day = d.getDate()
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '...'
}

/**
 * Convert string to URL-friendly slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Calculate discount percentage between original and discounted price
 */
export function calculateDiscount(original: number, discounted: number): number {
  if (original <= 0 || discounted >= original) return 0
  return Math.round(((original - discounted) / original) * 100)
}

/**
 * Generate array of star states for rendering a rating
 */
export function generateStars(rating: number): StarState[] {
  const stars: StarState[] = []
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push('full')
    } else if (i === fullStars && hasHalf) {
      stars.push('half')
    } else {
      stars.push('empty')
    }
  }

  return stars
}

/**
 * Delay helper for async operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Get initials from a name (up to 2 chars)
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
