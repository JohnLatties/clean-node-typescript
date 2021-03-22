import { CarBrandScrapingModel } from './model'

export interface ICarBrandScrapingData {
  searchData: () => Promise<CarBrandScrapingModel[]>
}
