import { Request, Response } from "express";
import { CarModel } from "../models/car.model";

export const createCarHandler = async (req: Request, res: Response) => {
  // TODO BEFORE PR: validate car
  const car = req.body
  const createdCar = await CarModel.create(car)
  res.status(201).json(createdCar)
}