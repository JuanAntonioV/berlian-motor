'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { TSearchParamsData } from '@/types';

export async function getAllCategories({
  params,
}: {
  params: TSearchParamsData;
}) {
  try {
    const categories = await db.category.findMany({
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

    const total = await db.user.count({
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
      data: categories,
      total,
      per_page: params.count,
    };
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}

export async function getCategoriesList() {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}
