import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.toLowerCase() || '';
    const category = searchParams.get('category') || 'all';
    const badge = searchParams.get('badge') || 'all';
    const sort = searchParams.get('sort') || 'popular';
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;

    let products = getProducts();

    if (q) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    if (category && category !== 'all') {
      products = products.filter((p) => p.category_id === category || p.category?.slug === category);
    }

    if (badge && badge !== 'all') {
      products = products.filter((p) => p.badge === badge);
    }

    if (maxPrice && !isNaN(maxPrice)) {
      products = products.filter((p) => p.price <= maxPrice);
    }

    if (sort === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else {
      products.sort((a, b) => b.sold_count - a.sold_count);
    }

    return NextResponse.json({
      success: true,
      total: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data produk' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.price) {
      return NextResponse.json(
        { success: false, message: 'Nama produk dan harga wajib diisi' },
        { status: 400 }
      );
    }

    const created = createProduct(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Produk berhasil ditambahkan',
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menambahkan produk' },
      { status: 500 }
    );
  }
}
