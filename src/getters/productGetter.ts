'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { json } from '@/lib/utils';
import { TSearchParamsData } from '@/types';

export async function getAllProducts({
  params,
}: {
  params: TSearchParamsData;
}) {
  try {
    const products = await db.product.findMany({
      take: parseInt(String(params.count)),
      skip: parseInt(String(params.skip)),
      where: {
        OR: [
          {
            name: {
              contains: params.search?.toLocaleLowerCase(),
            },
          },
          {
            sku: {
              contains: params.search?.toLocaleLowerCase(),
            },
          },
        ],
      },
      orderBy: params.sort
        ? {
            [params.sort as string]: params.order,
          }
        : {
            id: 'asc',
          },
      include: {
        Brand: true,
        Category: true,
        ProductStock: {
          select: {
            quantity: true,
          },
        },
      },
    });

    const total = await db.product.count({
      where: {
        OR: [
          {
            name: {
              contains: params.search?.toLocaleLowerCase(),
            },
          },
          {
            sku: {
              contains: params.search?.toLocaleLowerCase(),
            },
          },
        ],
      },
    });

    return {
      data: products,
      total,
      per_page: params.count,
    };
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}

export async function getProductsList() {
  try {
    const products = await db.product.findMany({
      include: {
        Brand: true,
        Category: true,
        ProductStock: {
          select: {
            storeId: true,
            shelfId: true,
            quantity: true,
          },
        },
      },
    });
    return products;
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}

export async function getProductById(id: string) {
  try {
    const product = await db.product.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        Brand: true,
        Category: true,
        ProductStock: {
          select: {
            quantity: true,
          },
        },
      },
    });

    return product;
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}

export async function getProductStocks(id: string) {
  try {
    const stocks = await db.productStock.findMany({
      where: {
        productId: parseInt(id),
      },
      include: {
        Store: true,
        Shelf: true,
      },
    });

    return stocks;
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}
