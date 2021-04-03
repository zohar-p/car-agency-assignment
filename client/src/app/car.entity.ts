import { IBranch } from "./branch.entity";

export interface ICar {
  id: string
  type: string
  brand: string
  model: string
  year: string
  price: string
  branch: IBranch
  publishDate: string
}
