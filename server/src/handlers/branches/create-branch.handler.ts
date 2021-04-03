import { Request, Response } from "express";
import { BranchModel } from "../../models/branch.model";

export const createBranchHandler = async (req: Request, res: Response) => {
  const branch = req.body
  const createdBranch = await BranchModel.create(branch)
  res.status(201).json(createdBranch)
}