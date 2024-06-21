'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { TSearchParamsData } from '@/types';

export async function getAllReductionOfGoods({
  params,
}: {
  params: TSearchParamsData;
}) {
  try {
    const reductionOfGoods = await db.reductionOfGoods.findMany({
      take: parseInt(String(params.count)),
      skip: parseInt(String(params.skip)),
      where: {
        OR: [
          {
            invoiceNumber: {
              contains: params.search?.toLocaleLowerCase(),
            },
          },
          {
            reference: {
              contains: params.search?.toLocaleLowerCase(),
            },
          },
          {
            notes: {
              contains: params.search?.toLocaleLowerCase(),
            },
          },
          {
            Product: {
              name: {
                contains: params.search?.toLocaleLowerCase(),
              },
            },
          },
          {
            Store: {
              name: {
                contains: params.search?.toLocaleLowerCase(),
              },
            },
          },
          {
            Shelf: {
              name: {
                contains: params.search?.toLocaleLowerCase(),
              },
            },
          },
          {
            User: {
              name: {
                contains: params.search?.toLocaleLowerCase(),
              },
              email: {
                contains: params.search?.toLocaleLowerCase(),
              },
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
        Store: true,
        User: true,
        Shelf: true,
        Product: {
          include: {
            Category: true,
            Brand: true,
            Shelf: true,
          },
        },
      },
    });

    const total = await db.reductionOfGoods.count({
      where: {
        OR: [
          {
            invoiceNumber: {
              contains: params.search?.toLocaleLowerCase(),
            },
          },
          {
            reference: {
              contains: params.search?.toLocaleLowerCase(),
            },
          },
          {
            notes: {
              contains: params.search?.toLocaleLowerCase(),
            },
          },
          {
            Product: {
              name: {
                contains: params.search?.toLocaleLowerCase(),
              },
              sku: {
                contains: params.search?.toLocaleLowerCase(),
              },
            },
          },
          {
            Store: {
              name: {
                contains: params.search?.toLocaleLowerCase(),
              },
            },
          },
          {
            Shelf: {
              name: {
                contains: params.search?.toLocaleLowerCase(),
              },
            },
          },
          {
            User: {
              name: {
                contains: params.search?.toLocaleLowerCase(),
              },
              email: {
                contains: params.search?.toLocaleLowerCase(),
              },
            },
          },
        ],
      },
    });

    return {
      data: reductionOfGoods,
      total,
      per_page: params.count,
    };
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}

export async function getReductionOfGoodsList() {
  try {
    const reductionOfGoods = await db.reductionOfGoods.findMany();
    return reductionOfGoods;
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}

export async function getReductionOfGoodsByInvoiceNumber(
  invoiceNumber: string
) {
  try {
    const reductionOfGoods = await db.reductionOfGoods.findUnique({
      where: {
        invoiceNumber,
      },
      include: {
        Store: true,
        User: true,
        Shelf: true,
        Product: {
          include: {
            Category: true,
            Brand: true,
            Shelf: true,
          },
        },
      },
    });

    return reductionOfGoods;
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}

export async function getReductionOfGoodsId() {
  // generate goods reductionOfGoods invoice number like: GRGR-ddmmyy-0001
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear().toString().substr(-2);

  const formattedDate = `${date < 10 ? '0' + date : date}${
    month < 10 ? '0' + month : month
  }${year}`;

  const reductionOfGoods = await db.reductionOfGoods.findMany({
    where: {
      createdAt: {
        gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      },
    },
  });

  const count = reductionOfGoods.length + 1;
  const formattedCount =
    count < 10
      ? '000' + count
      : count < 100
      ? '00' + count
      : count < 1000
      ? '0' + count
      : count;

  const id = `RG-${formattedDate}-${formattedCount}`;

  const isExist = await db.reductionOfGoods.findUnique({
    where: {
      invoiceNumber: id,
    },
  });

  if (isExist) {
    return getReductionOfGoodsId();
  }

  return id;
}
