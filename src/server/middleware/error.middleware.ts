import { Request, Response, NextFunction } from 'express';
import { CustomError, CustomErrors, errorTypeToStatusCode } from '../custom-error.model';

export const isCustomError = (error: Error | CustomError) => error instanceof CustomError;

export const errorMiddleware = (
  error: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!isCustomError(error)) {
    error = new CustomError({
      type: CustomErrors.InternalServerError,
      message: error.message,
    });
  }

  const status = errorTypeToStatusCode((error as CustomError).type);
  res.status(status).json(error as CustomError);
};
