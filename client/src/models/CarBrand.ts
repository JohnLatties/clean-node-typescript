import { Car } from './Cat'


export interface CarBrand {
  _id: string
  name: string
  image: string
  cars: Car[]
}