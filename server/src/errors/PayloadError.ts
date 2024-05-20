import { ErrorHandling, ErrorHandlingConstructor } from './ErrorHandling';

export class PayloadError extends ErrorHandling {
  constructor({ message = 'PayloadError', errors, statusCode = 400 }: ErrorHandlingConstructor) {
    super({ message, errors, statusCode });
    this.statusCode = statusCode;
    this.name = 'PayloadError';
    this.errors = errors;
  }
}
