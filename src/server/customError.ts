export enum CustomErrors {
  UserNotFound = 'UserNotFound',
  Unauthorized = 'Unauthorized',
  InvalidLoginCredentials = 'InvalidLoginCredentials',
  UserAlreadyExists = 'UserAlreadyExists',
  InternalServerError = 'InternalServerError',
}

interface ErrorType {
  type: CustomErrors;
  message: string;
  metadata?: Record<string, unknown>;
}

export class CustomError extends Error {
  type: ErrorType['type'];
  message: ErrorType['message'];
  metadata: ErrorType['metadata'];

  constructor(args: ErrorType) {
    super();
    this.type = args.type;
    this.message = args.message;
    this.metadata = args.metadata;
  }
}

export const errorTypeToStatusCode = (type: CustomErrors) => {
  switch (type) {
    case CustomErrors.UserNotFound:
      return 400;
    case CustomErrors.Unauthorized:
      return 401;
    case CustomErrors.InvalidLoginCredentials:
      return 403;
    case CustomErrors.UserAlreadyExists:
      return 409;
    case CustomErrors.InternalServerError:
      return 500;
  }
};
