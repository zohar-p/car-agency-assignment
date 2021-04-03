import { Request, Response } from "express";
import { BranchModel } from "../../models/branch.model";

export const getBranchesHandler = async (req: Request, res: Response) => {
  const branches = await BranchModel.find({})
  res.status(200).json(branches)
}