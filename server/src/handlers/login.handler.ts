import { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request.err";

export const loginHandler = async (req: Request, res: Response) => {
  const { password } = req.body
  const correctPassword = password === 'admin'
  if (correctPassword) {
    res.status(200).send({})
  } else {
    throw new BadRequestError('Incorrect password')
  }
}
