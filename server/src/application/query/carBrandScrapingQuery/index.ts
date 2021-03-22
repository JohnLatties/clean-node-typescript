import { ICarBrandScrapingData } from './ICarBrandScrapingData'
import { CarBrandScrapingModel } from './model'

export interface ICarBrandScrapingQuery {
  execute: () => Promise<CarBrandScrapingModel[]>
}

function CarBrandScrapingQuery (carBrandScrapingData: ICarBrandScrapingData): ICarBrandScrapingQuery {
  const _carBrandScrapingData = carBrandScrapingData
  return {
    execute: async function (): Promise<CarBrandScrapingModel[]> {
      const result = await _carBrandScrapingData.searchData()
      return result
    }
  }
}

export default CarBrandScrapingQuery
