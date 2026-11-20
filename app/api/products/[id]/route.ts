import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlugOrId, updateProduct, deleteProduct } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = getProductBySlugOrId(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil detail produk' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = updateProduct(id, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Produk tidak ditemukan untuk diperbarui' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Produk berhasil diperbarui',
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui produk' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = deleteProduct(id);

    if (!success) {
      return NextResponse.json(
        { success: false, message: 'Produk tidak ditemukan atau sudah dihapus' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Produk berhasil dihapus dari katalog',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus produk' },
      { status: 500 }
    );
  }
}
