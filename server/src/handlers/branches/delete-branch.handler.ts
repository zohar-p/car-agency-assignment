import { Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found.err";
import { BranchModel } from "../../models/branch.model";

export const deleteBranchHandler = async (req: Request, res: Response) => {
  const branchId = req.params.id
  const deletedBranch = await BranchModel.findByIdAndDelete(branchId)
  if (!deletedBranch) { throw new NotFoundError('branch not found')}
  res.status(204).send({})
}