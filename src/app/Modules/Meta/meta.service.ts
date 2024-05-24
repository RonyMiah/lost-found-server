import { userRole } from '@prisma/client';
import { IAuthUser } from '../../interfaces/common';
import prisma from '../../../shared/prisma';

const fetchDatabaseMetadata = async (user: IAuthUser) => {
  if (user?.role === userRole.ADMIN || userRole.SUPPER_ADMIN) {
    const totalLostItems = await prisma.lostItem.count();

    const totalFoundItems = await prisma.foundItem.count();

    const totalClaimItems = await prisma.claim.count();

    return {
      totalLostItems,
      totalFoundItems,
      totalClaimItems,
    };
  }
};

export const MetaServices = {
  fetchDatabaseMetadata,
};
