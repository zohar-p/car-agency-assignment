import { CustomError } from '../common/custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message: string = 'Bad Request') {
    super(message)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
  
}