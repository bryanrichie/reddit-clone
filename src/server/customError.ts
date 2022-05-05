export enum CustomErrors {
  UserAlreadyExists = 'UserAlreadyExists',
  UserNotFound = 'UserNotFound',
  InternalServerError = 'InternalServerError',
  InvalidLoginCredentials = 'InvalidLoginCredentials',
}

interface ErrorType {
  type: CustomErrors;
  message: string;
  metadata?: {
    fields: Record<string, unknown>;
  };
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
    case CustomErrors.InvalidLoginCredentials:
      return 403;
    case CustomErrors.UserAlreadyExists:
      return 409;
    case CustomErrors.InternalServerError:
      return 500;
  }
};
