export type ErrorHandlingConstructor = {
  message?: string;
  errors?: string[];
  statusCode?: number;
};

export type ErrorHandlingResponse = Required<ErrorHandlingConstructor> & {
  stack?: string;
  name: string;
};

export abstract class ErrorHandling extends Error {
  statusCode?: number;
  errors?: string[];

  constructor({ message, errors, statusCode }: ErrorHandlingConstructor) {
    super(message ? message : 'ErrorHandling');
    this.statusCode = statusCode ? statusCode : 500;
    this.name = 'ErrorHandling';
    this.errors = errors ? errors : [];

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
