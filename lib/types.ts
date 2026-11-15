// Core product and category types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  long_description: string
  price: number
  original_price?: number
  discount_percentage?: number
  category_id: string
  category?: Category
  images: string[]
  cover_image: string
  features: string[]
  platform: string[]
  compatibility: string
  license_type: string
  rating: number
  review_count: number
  sold_count: number
  is_featured: boolean
  badge?: 'best-seller' | 'new-arrival' | 'hot' | 'sale'
  tags: string[]
  file_size?: string
  version?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  bg_color: string
  product_count: number
}

// Cart types
export interface CartItem {
  product: Product
  quantity: number
}

// Order types
export interface Order {
  id: string
  user_id: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded'
  payment_method: string
  payment_status: 'unpaid' | 'paid' | 'failed'
  voucher_code?: string
  discount_amount: number
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product: Product
  quantity: number
  price: number
  license_key?: string
  download_url?: string
}

// User types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin'
  created_at: string
}

// Review types
export interface Review {
  id: string
  product_id: string
  user: User
  rating: number
  comment: string
  created_at: string
}

// Voucher types
export interface Voucher {
  id: string
  code: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  min_purchase?: number
  max_uses?: number
  used_count: number
  expires_at?: string
  is_active: boolean
}

// Utility types
export type BadgeType = 'best-seller' | 'new-arrival' | 'hot' | 'sale'
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded'
export type PaymentStatus = 'unpaid' | 'paid' | 'failed'
export type UserRole = 'user' | 'admin'
export type DiscountType = 'percentage' | 'fixed'

export type StarState = 'full' | 'half' | 'empty'
