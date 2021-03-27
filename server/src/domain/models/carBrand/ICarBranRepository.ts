import { CarBrandData } from './carBrandData'

export interface ICarBrandRepository {
  findAll: () => Promise<CarBrandData[]>,
  findByName: (name: string) => Promise<CarBrandData | null>
  findByKey: (key: string) => Promise<CarBrandData | null>
  exists: (name: string) => Promise<boolean>
  add: (carBrands: CarBrandData) => Promise<void>
  addMany: (carBrands: CarBrandData[]) => Promise<void>
}
