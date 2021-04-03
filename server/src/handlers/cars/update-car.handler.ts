import { Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found.err";
import { CarModel } from "../../models/car.model";

export const updateCarHandler = async (req: Request, res: Response) => {
  // TODO BEFORE PR: validate car
  const car = req.body
  const carId = req.params.id
  const updatedCar = await CarModel.findByIdAndUpdate(carId, car, { new: true })
  if (!updatedCar) { throw new NotFoundError('Car not found')}
  res.json(updatedCar)
}