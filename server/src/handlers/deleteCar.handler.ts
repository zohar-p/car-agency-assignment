import { Request, Response } from "express";
import { NotFoundError } from "../errors/not_found.err";
import { CarModel } from "../models/car.model";

export const deleteCarHandler = async (req: Request, res: Response) => {
  const carId = req.params.id
  const deletedCar = await CarModel.findByIdAndDelete(carId)
  if (!deletedCar) { throw new NotFoundError('Car not found')}
  res.status(204).send()
}