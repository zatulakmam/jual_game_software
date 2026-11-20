import { NextRequest, NextResponse } from 'next/server';
import { validateVoucher } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.code) {
      return NextResponse.json(
        { success: false, message: 'Kode voucher wajib diisi' },
        { status: 400 }
      );
    }

    const subtotal = Number(body.subtotal) || 0;
    const result = validateVoucher(body.code, subtotal);

    if (!result.valid) {
      return NextResponse.json(
        { success: false, message: result.message, discountAmount: 0 },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      discountAmount: result.discountAmount,
      voucher: result.voucher,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memvalidasi voucher' },
      { status: 500 }
    );
  }
}
