'use server';

import db from '@/lib/db';
import { TSearchParamsData } from '@/types';
import { ServerErrorException } from '../lib/exceptions';

export async function getAllStaffs({ params }: { params: TSearchParamsData }) {
  try {
    const staffs = await db.user.findMany({
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
            email: {
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
        Roles: {
          include: {
            Role: true,
          },
        },
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
          {
            email: {
              contains: params.search?.toLocaleLowerCase(),
            },
          },
        ],
      },
    });

    return {
      data: staffs,
      total,
      per_page: params.count,
    };
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}

export async function getStaffById(id: number) {
  try {
    const staff = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        Roles: {
          include: {
            Role: true,
          },
        },
      },
    });

    return staff;
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}
