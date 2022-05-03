export enum CustomErrors {
  UserAlreadyExists = 'UserAlreadyExists',
  InternalServerError = 'InternalServerError',
  UnknownError = 'UnknownError',
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
    case CustomErrors.InvalidLoginCredentials:
      return 403;
    case CustomErrors.UserAlreadyExists:
      return 409;
    case CustomErrors.InternalServerError:
    case CustomErrors.UnknownError:
      return 500;
  }
};
