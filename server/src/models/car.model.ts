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
  }
})

export const CarModel = model('Car', carSchema)