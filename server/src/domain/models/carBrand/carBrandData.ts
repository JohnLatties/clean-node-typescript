import { CarData } from './carData'

export interface CarBrandData {
  key?: string
  name: string
  image: string
  cars: CarData[]
}
