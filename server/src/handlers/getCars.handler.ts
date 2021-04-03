import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { CarModel } from "../models/car.model";

const generateQuery = (filters: Record<string, string>): FilterQuery<typeof CarModel> => {
  const query: Partial<FilterQuery<typeof CarModel>> = {}
  if (filters.type) { query.type = filters.type }
  if (filters.brand) { query.brand = filters.brand }
  if (filters.model) { query.model = filters.model }
  if (+filters.minPrice) { query.price = {$gte: filters.minPrice}}
  if (+filters.maxPrice) { query.price = {...query.price, $lte: filters.maxPrice}}
  if (+filters.minYear) { query.year = {$gte: filters.minYear}}
  if (+filters.maxYear) { query.year = {...query.year, $lte: filters.maxYear}}
  return query as FilterQuery<typeof CarModel>
}

export const getCarsHandler = async (req: Request, res: Response) => {
  const { sort, offset, ...filters } = req.query as Record<string, string>
  const query = generateQuery(filters)
  const cars = await CarModel
    .find(query)
    .sort({ [sort]: 1 })
    .skip(+offset || 0)
    .limit(12)
  res.json(cars)
}