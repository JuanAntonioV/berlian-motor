'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';

export async function getRoleList() {
  try {
    const roles = await db.roles.findMany();
    return roles;
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}
