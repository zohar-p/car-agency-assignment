import { Request, Response } from "express";
import { CarModel } from "../../models/car.model";

export const createCarHandler = async (req: Request, res: Response) => {
  const car = req.body
  const createdCar = await CarModel.create(car)
    .then(async createdCar => await CarModel.populate(createdCar, 'branch'))
  res.status(201).json(createdCar)
}