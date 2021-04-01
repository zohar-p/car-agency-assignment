import { Request, Response } from "express";
import { CarModel } from "../models/car.model";

export const getCarsHandler = async (req: Request, res: Response) => {
  const filters = req.query
  const cars = await CarModel.find({})
  res.json(cars)
}