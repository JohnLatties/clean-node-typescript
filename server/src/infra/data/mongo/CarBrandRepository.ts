import { MongoHelper } from './base'
import { CarBrandData } from '@domain/models/carBrand/carBrandData'
import { ICarBrandRepository } from '@domain/models/carBrand/ICarBranRepository'

function CarBrandRepository (): ICarBrandRepository {
  async function getCollection () {
    return (await MongoHelper.getCollection('carBrands'))
  }
  return {
    findAll: async function (): Promise<CarBrandData[]> {
      const carBrandsCollection = await getCollection()
      const result = await carBrandsCollection.find().sort({ name: 1 }).toArray()
      return result
    },
    findByName: async function (name: string): Promise<CarBrandData | null> {
      const carBrandsCollection = await getCollection()
      const result = await carBrandsCollection.findOne({ name })
      return result
    },
    findByKey: async function (key: string): Promise<CarBrandData | null> {
      const carBrandsCollection = await getCollection()
      const result = await carBrandsCollection.findOne({ key })
      return result
    },
    exists: async function (name: string): Promise<boolean> {
      const result = await this.findByName(name)
      return !(result === null)
    },
    add: async function (carBrand: CarBrandData): Promise<void> {
      const carBrandsCollection = await getCollection()
      const exists = await this.exists(carBrand.name)
      if (!exists) {
        await carBrandsCollection.insertOne({ ...carBrand })
      }
    },
    addMany: async function (carBrands: CarBrandData[]) {
      for (const carBrand of carBrands) {
        await this.add(carBrand)
      }
    }
  }
}

export default CarBrandRepository
