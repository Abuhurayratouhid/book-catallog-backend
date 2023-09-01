import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const createUser = async (payload: User): Promise<User> => {
  const result = await prisma.user.create({ data: payload });

  return result;
};

const loginUser = async (loginData: { email: string; password: string }) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: loginData.email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }

  const { id, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  //   console.log('service file:', isUserExist, 'Token:', accessToken);

  return {
    accessToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
};
