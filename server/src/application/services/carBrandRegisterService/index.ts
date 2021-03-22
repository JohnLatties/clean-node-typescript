import { ICarBrandScrapingQuery } from '@application/query/carBrandScrapingQuery'

export interface ICarBrandRegisterService {
  execute: () => Promise<void>
}

function CarBrandRegisterService (carBrandScrapingQuery: ICarBrandScrapingQuery): ICarBrandRegisterService {
  const _carBrandScrapingQuery: ICarBrandScrapingQuery = carBrandScrapingQuery
  return {
    execute: async function () {
      await _carBrandScrapingQuery.execute()
    }
  }
}

export default CarBrandRegisterService
