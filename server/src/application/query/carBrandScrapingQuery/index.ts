import { ICarBrandScrapingData } from './ICarBrandScrapingData'
import { CarBrandScrapingModel } from './model'

function CarBrandScrapingQuery (carBrandScrapingData: ICarBrandScrapingData) {
  const _carBrandScrapingData = carBrandScrapingData
  return {
    execute: async function (): Promise<CarBrandScrapingModel[]> {
      const result = await _carBrandScrapingData.searchData()
      return result
    }
  }
}

export default CarBrandScrapingQuery
