'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { TStatItem } from '@/types';

export async function getStats() {
  try {
    const totalStock = await db.productStock.count();
    const totalStockIn = await db.goodsReceipt.aggregate({
      _sum: {
        quantity: true,
      },
    });
    const totalStockOut = await db.reductionOfGoods.aggregate({
      _sum: {
        quantity: true,
      },
    });
    const totalProduct = await db.product.count();

    const stats: TStatItem[] = [
      {
        id: 'total-stock',
        name: 'Total Stok',
        value: totalStock,
        description: 'Dari keseluruhan',
        type: 'number',
      },
      {
        id: 'total-stock-in',
        name: 'Total Stok Masuk',
        value: totalStockIn._sum.quantity || 0,
        description: 'Dari keseluruhan',
        type: 'number',
      },
      {
        id: 'total-stock-out',
        name: 'Total Stok Keluar',
        value: totalStockOut._sum.quantity || 0,
        description: 'Dari keseluruhan',
        type: 'number',
      },
      {
        id: 'total-product',
        name: 'Total Produk',
        value: totalProduct,
        description: 'Dari keseluruhan',
        type: 'number',
      },
    ];

    return stats;
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}
