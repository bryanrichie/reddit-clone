import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../common/types';
import { Config, fromEnv } from '../config';
import { CustomError, CustomErrors } from '../customError';

const config: Config = fromEnv();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    throw new CustomError({ type: CustomErrors.Unauthorized, message: 'Unauthorized' });
  }

  try {
    const token = authorization.split(' ')[1];
    const verifiedToken = jwt.verify(token, config.jwtSecret);
    req.user = verifiedToken as User;
  } catch (error) {
    throw new CustomError({
      type: CustomErrors.Unauthorized,
      message: error instanceof Error ? error.message : 'Unauthorized',
    });
  }

  return next();
};
