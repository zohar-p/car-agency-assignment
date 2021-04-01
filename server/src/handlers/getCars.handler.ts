import { Request, Response } from "express";
import { CarModel } from "../models/car.model";

export const getCarsHandler = async (req: Request, res: Response) => {
  //@ts-ignore
  const cars = (await import('../../mocks/cars.mock.json')).default
  res.json(cars)
}