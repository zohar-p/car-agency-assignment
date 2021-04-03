import { model, Schema } from "mongoose";


const branchSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
})

branchSchema.set('toJSON', {
  transform: function (doc: any, ret: any) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

export const BranchModel = model('Branch', branchSchema)