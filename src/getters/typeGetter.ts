'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { TSearchParamsData } from '@/types';

export async function getAllTypes({ params }: { params: TSearchParamsData }) {
  try {
    const types = await db.types.findMany({
      take: parseInt(String(params.count)),
      skip: parseInt(String(params.skip)),
      where: {
        OR: [
          {
            name: {
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
    });

    const total = await db.types.count({
      where: {
        OR: [
          {
            name: {
              contains: params.search?.toLocaleLowerCase(),
            },
          },
        ],
      },
    });

    return {
      data: types,
      total,
      per_page: params.count,
    };
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}

export async function getTypesList() {
  try {
    const types = await db.types.findMany();
    return types;
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}
