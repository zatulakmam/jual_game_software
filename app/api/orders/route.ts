import { NextRequest, NextResponse } from 'next/server';
import { getOrders, createOrder } from '@/lib/db';

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data pesanan' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.customer_name || !body.customer_email || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Data pesanan dan item tidak lengkap' },
        { status: 400 }
      );
    }

    const order = createOrder({
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone || '',
      items: body.items,
      payment_method: body.payment_method || 'QRIS',
      voucher_code: body.voucher_code,
      user_id: body.user_id,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Pesanan berhasil dibuat dan diverifikasi',
        data: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal memproses pesanan' },
      { status: 500 }
    );
  }
}
