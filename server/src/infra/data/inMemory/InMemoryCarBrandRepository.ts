import { CarBrandData } from '@domain/models/carBrand/carBrandData'
import { ICarBrandRepository } from '@domain/models/carBrand/ICarBranRepository'

function InMemoryCarBrandRepository (): ICarBrandRepository {
  const _carBrands: CarBrandData[] = []
  return {
    findAll: async function (): Promise<CarBrandData[]> {
      return _carBrands
    },
    findByName: async function (name: string): Promise<CarBrandData | null> {
      const carBrand = await _carBrands.find(item => item.name === name)
      if (carBrand) return carBrand
      return null
    },
    exists: async function (name: string): Promise<boolean> {
      const result = await this.findByName(name)
      return !(result === null)
    },
    add: async function (carBrand: CarBrandData): Promise<void> {
      const exists = await this.exists(carBrand.name)
      if (!exists) {
        _carBrands.push(carBrand)
      }
    },
    addMany: async function (carBrands: CarBrandData[]) {
      for (const carBrand of carBrands) {
        await this.add(carBrand)
      }
    }
  }
}

export default InMemoryCarBrandRepository
