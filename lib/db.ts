import fs from 'fs';
import path from 'path';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES as INITIAL_CATEGORIES } from './data';
import type { Product, Category, Order, Voucher } from './types';

export interface DatabaseSchema {
  products: Product[];
  categories: Category[];
  orders: Order[];
  vouchers: Voucher[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

const INITIAL_VOUCHERS: Voucher[] = [
  {
    id: 'v-1',
    code: 'PIXEL20',
    discount_type: 'percentage',
    discount_value: 20,
    min_purchase: 50000,
    used_count: 142,
    is_active: true,
  },
  {
    id: 'v-2',
    code: 'NEWUSER',
    discount_type: 'fixed',
    discount_value: 10000,
    min_purchase: 25000,
    used_count: 89,
    is_active: true,
  },
  {
    id: 'v-3',
    code: 'SINZO50',
    discount_type: 'percentage',
    discount_value: 50,
    min_purchase: 100000,
    used_count: 24,
    is_active: true,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'PS-992102',
    user_id: 'guest',
    items: [
      {
        id: 'item-1',
        order_id: 'PS-992102',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        price: 85000,
        license_key: 'W269N-WFGWX-YVC9B-4J6C9-T83GX',
        download_url: 'https://www.microsoft.com/software-download/windows11',
      },
    ],
    total: 85000,
    discount_amount: 0,
    payment_method: 'QRIS',
    payment_status: 'paid',
    status: 'completed',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

function initDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content) as DatabaseSchema;
      return {
        products: parsed.products && parsed.products.length > 0 ? parsed.products : INITIAL_PRODUCTS,
        categories: parsed.categories && parsed.categories.length > 0 ? parsed.categories : INITIAL_CATEGORIES,
        orders: parsed.orders || INITIAL_ORDERS,
        vouchers: parsed.vouchers && parsed.vouchers.length > 0 ? parsed.vouchers : INITIAL_VOUCHERS,
      };
    }
  } catch (error) {
    console.error('[DB] Failed reading store.json, using fallback:', error);
  }

  const initialData: DatabaseSchema = {
    products: INITIAL_PRODUCTS,
    categories: INITIAL_CATEGORIES,
    orders: INITIAL_ORDERS,
    vouchers: INITIAL_VOUCHERS,
  };

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  } catch (error) {
    console.error('[DB] Failed writing initial store.json:', error);
  }

  return initialData;
}

function saveDb(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('[DB] Error writing to store.json:', error);
  }
}

// ================= PRODUCT METHODS =================
export function getProducts(): Product[] {
  const db = initDb();
  return db.products;
}

export function getProductBySlugOrId(identifier: string): Product | null {
  const db = initDb();
  return (
    db.products.find(
      (p) => p.slug === identifier || p.id === identifier || p.id === `prod-${identifier}`
    ) || null
  );
}

export function createProduct(productData: Partial<Product> & { name: string; price: number }): Product {
  const db = initDb();

  const slug =
    productData.slug ||
    productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  // Ensure unique slug
  let uniqueSlug = slug;
  let counter = 1;
  while (db.products.some((p) => p.slug === uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  const category = db.categories.find((c) => c.id === productData.category_id);

  const newProduct: Product = {
    id: productData.id || `prod-${Date.now()}`,
    name: productData.name,
    slug: uniqueSlug,
    description: productData.description || '',
    long_description: productData.long_description || productData.description || '',
    price: Number(productData.price),
    original_price: productData.original_price ? Number(productData.original_price) : undefined,
    discount_percentage:
      productData.original_price && productData.original_price > productData.price
        ? Math.round(((productData.original_price - productData.price) / productData.original_price) * 100)
        : undefined,
    category_id: productData.category_id || 'cat-1',
    category: category,
    images: productData.images && productData.images.length > 0 ? productData.images : [productData.cover_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop'],
    cover_image: productData.cover_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    features: productData.features || ['Lisensi Original', 'Support 24/7', 'Aktivasi Instan'],
    platform: productData.platform || ['Windows', 'macOS'],
    compatibility: productData.compatibility || 'Windows 10/11, macOS, Linux',
    license_type: productData.license_type || 'Lifetime License',
    rating: productData.rating || 5.0,
    review_count: productData.review_count || 1,
    sold_count: productData.sold_count || 0,
    is_featured: productData.is_featured ?? true,
    badge: productData.badge,
    tags: productData.tags || ['digital', 'software'],
    file_size: productData.file_size || 'Digital Access',
    version: productData.version || 'v1.0',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.products = [newProduct, ...db.products];

  // Update category product count
  if (category) {
    db.categories = db.categories.map((c) =>
      c.id === category.id ? { ...c, product_count: c.product_count + 1 } : c
    );
  }

  saveDb(db);
  return newProduct;
}

export function updateProduct(idOrSlug: string, updates: Partial<Product>): Product | null {
  const db = initDb();
  const index = db.products.findIndex((p) => p.id === idOrSlug || p.slug === idOrSlug);
  if (index === -1) return null;

  const current = db.products[index];
  const updated: Product = {
    ...current,
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (updates.category_id && updates.category_id !== current.category_id) {
    updated.category = db.categories.find((c) => c.id === updates.category_id);
  }

  db.products[index] = updated;
  saveDb(db);
  return updated;
}

export function deleteProduct(idOrSlug: string): boolean {
  const db = initDb();
  const initialLen = db.products.length;
  const target = db.products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);

  db.products = db.products.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);

  if (db.products.length < initialLen) {
    if (target?.category_id) {
      db.categories = db.categories.map((c) =>
        c.id === target.category_id ? { ...c, product_count: Math.max(0, c.product_count - 1) } : c
      );
    }
    saveDb(db);
    return true;
  }
  return false;
}

// ================= CATEGORY METHODS =================
export function getCategories(): Category[] {
  const db = initDb();
  return db.categories;
}

export function createCategory(cat: Omit<Category, 'id' | 'product_count'>): Category {
  const db = initDb();
  const slug =
    cat.slug ||
    cat.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const newCat: Category = {
    id: `cat-${Date.now()}`,
    name: cat.name,
    slug,
    description: cat.description || '',
    icon: cat.icon || 'Layers',
    color: cat.color || '#F9ED32',
    bg_color: '#171717',
    product_count: 0,
  };

  db.categories.push(newCat);
  saveDb(db);
  return newCat;
}

export function deleteCategory(idOrSlug: string): boolean {
  const db = initDb();
  const initialLen = db.categories.length;
  db.categories = db.categories.filter((c) => c.id !== idOrSlug && c.slug !== idOrSlug);
  if (db.categories.length < initialLen) {
    saveDb(db);
    return true;
  }
  return false;
}

// ================= ORDER METHODS =================
export function getOrders(): Order[] {
  const db = initDb();
  return db.orders;
}

export function createOrder(orderData: {
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: Array<{ product_id: string; quantity: number }>;
  payment_method: string;
  voucher_code?: string;
}): Order {
  const db = initDb();

  const orderId = `PS-${Math.floor(100000 + Math.random() * 900000)}`;

  const orderItems = orderData.items.map((item) => {
    const product = db.products.find((p) => p.id === item.product_id) || db.products[0];
    return {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      order_id: orderId,
      product,
      quantity: item.quantity,
      price: product.price,
      license_key: `${product.name.slice(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      download_url: 'https://example.com/download/' + product.slug,
    };
  });

  const subtotal = orderItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  let discountAmount = 0;
  if (orderData.voucher_code) {
    const v = db.vouchers.find(
      (vouch) => vouch.code === orderData.voucher_code?.toUpperCase() && vouch.is_active
    );
    if (v) {
      if (v.discount_type === 'percentage') {
        discountAmount = Math.round((subtotal * v.discount_value) / 100);
      } else {
        discountAmount = v.discount_value;
      }
      v.used_count += 1;
    }
  }

  const total = Math.max(0, subtotal - discountAmount);

  const newOrder: Order = {
    id: orderId,
    user_id: orderData.user_id || 'guest',
    items: orderItems,
    total,
    discount_amount: discountAmount,
    voucher_code: orderData.voucher_code,
    payment_method: orderData.payment_method.toUpperCase(),
    payment_status: 'paid', // Instant verification demo
    status: 'completed',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.orders = [newOrder, ...db.orders];
  saveDb(db);
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: Order['status'], paymentStatus?: Order['payment_status']): Order | null {
  const db = initDb();
  const order = db.orders.find((o) => o.id === orderId);
  if (!order) return null;

  order.status = status;
  if (paymentStatus) {
    order.payment_status = paymentStatus;
  }
  order.updated_at = new Date().toISOString();

  saveDb(db);
  return order;
}

// ================= VOUCHER METHODS =================
export function getVouchers(): Voucher[] {
  const db = initDb();
  return db.vouchers;
}

export function validateVoucher(code: string, subtotal: number): { valid: boolean; discountAmount: number; voucher?: Voucher; message: string } {
  const db = initDb();
  const voucher = db.vouchers.find(
    (v) => v.code.toUpperCase() === code.trim().toUpperCase() && v.is_active
  );

  if (!voucher) {
    return { valid: false, discountAmount: 0, message: 'Kode voucher tidak valid atau sudah kadaluarsa.' };
  }

  if (voucher.min_purchase && subtotal < voucher.min_purchase) {
    return {
      valid: false,
      discountAmount: 0,
      message: `Minimal belanja Rp${voucher.min_purchase.toLocaleString('id-ID')} untuk menggunakan voucher ini.`,
    };
  }

  let discountAmount = 0;
  if (voucher.discount_type === 'percentage') {
    discountAmount = Math.round((subtotal * voucher.discount_value) / 100);
  } else {
    discountAmount = voucher.discount_value;
  }

  return {
    valid: true,
    discountAmount,
    voucher,
    message: `Voucher ${voucher.code} berhasil diterapkan!`,
  };
}
