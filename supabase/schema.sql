-- =========================================================
-- PIXELSTORE POSTGRESQL DATABASE SCHEMA (SUPABASE)
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a customer profile automatically whenever Supabase Auth creates a user.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NULLIF(BTRIM(NEW.raw_user_meta_data ->> 'name'), ''), SPLIT_PART(NEW.email, '@', 1)),
    NEW.email
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Package',
  color TEXT DEFAULT '#F9ED32',
  bg_color TEXT DEFAULT '#171717',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  discount_percentage INTEGER,
  category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  cover_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  platform TEXT[] DEFAULT '{}',
  compatibility TEXT,
  license_type TEXT NOT NULL,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  sold_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  badge TEXT CHECK (badge IN ('best-seller', 'new-arrival', 'hot', 'sale')),
  tags TEXT[] DEFAULT '{}',
  file_size TEXT,
  version TEXT,
  file_url TEXT, -- Link to digital file stored in Supabase Storage
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  total NUMERIC NOT NULL,
  discount_amount NUMERIC DEFAULT 0,
  voucher_code TEXT,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('unpaid', 'pending', 'paid', 'failed')),
  order_status TEXT DEFAULT 'Menunggu Verifikasi' CHECK (order_status IN ('Menunggu Verifikasi', 'Diproses', 'Selesai', 'Dibatalkan')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  quantity INTEGER DEFAULT 1,
  license_key TEXT,
  download_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. VOUCHERS
CREATE TABLE IF NOT EXISTS public.vouchers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT CHECK (discount_type IN ('percent', 'fixed')),
  discount_value NUMERIC NOT NULL,
  min_spend NUMERIC DEFAULT 0,
  usage_count INTEGER DEFAULT 0,
  max_uses INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Customers can read their own profile and edit only non-privileged fields.
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

REVOKE ALL ON public.profiles FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.profiles TO authenticated;
GRANT UPDATE (name, phone, avatar_url) ON public.profiles TO authenticated;

-- Public can read products & categories
CREATE POLICY "Public products viewable" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public categories viewable" ON public.categories FOR SELECT USING (true);

-- User can view their own orders
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
