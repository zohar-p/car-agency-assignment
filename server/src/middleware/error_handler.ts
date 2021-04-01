import { NextFunction, Request, Response } from "express";
import { CustomError } from '../common/custom-error'

export const errorHandler = (err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  if (err instanceof CustomError) { return res.status(err.statusCode).send({ error: err.message }) }
  res.status(500).send({ error: `Unexpected error > ${err.message}` })
}