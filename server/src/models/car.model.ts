import { model, Schema } from "mongoose";


const carSchema = new Schema({
  // TODO BEFORE PR: add enums
  type: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  publishDate: {
    type: Date,
    default: new Date()
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  }
})

carSchema.set('toJSON', {
  transform: function (doc: any, ret: any) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

export const CarModel = model('Car', carSchema)