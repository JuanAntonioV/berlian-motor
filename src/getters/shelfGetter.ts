'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { TSearchParamsData } from '@/types';

export async function getAllShelfs({ params }: { params: TSearchParamsData }) {
  try {
    const shelfs = await db.shelf.findMany({
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

    const total = await db.shelf.count({
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
      data: shelfs,
      total,
      per_page: params.count,
    };
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}

export async function getShelfsList() {
  try {
    const shelfs = await db.shelf.findMany({
      where: {
        status: true,
      },
    });
    return shelfs;
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}
