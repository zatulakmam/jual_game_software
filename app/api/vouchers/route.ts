import { NextRequest, NextResponse } from 'next/server';
import { getVouchers } from '@/lib/db';

export async function GET() {
  try {
    const vouchers = getVouchers();
    return NextResponse.json({
      success: true,
      data: vouchers,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data voucher' },
      { status: 500 }
    );
  }
}
