import { Car } from './Car'


export interface CarBrand {
  key: string
  name: string
  image: string
  cars: Car[]
}