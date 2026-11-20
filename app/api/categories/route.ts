import { NextRequest, NextResponse } from 'next/server';
import { getCategories, createCategory } from '@/lib/db';

export async function GET() {
  try {
    const categories = getCategories();
    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data kategori' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json(
        { success: false, message: 'Nama kategori wajib diisi' },
        { status: 400 }
      );
    }

    const created = createCategory(body);
    return NextResponse.json(
      {
        success: true,
        message: 'Kategori berhasil ditambahkan',
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal menambahkan kategori' },
      { status: 500 }
    );
  }
}
