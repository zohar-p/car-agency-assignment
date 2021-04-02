import { CustomError } from '../common/custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404

  constructor(message: string = 'Not found') {
    super(message)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}