import { CarBrandData } from '@domain/models/carBrand/carBrandData'
import { ICarBrandRepository } from '@domain/models/carBrand/ICarBranRepository'
import { ICarBrandScrapingData } from './ICarBrandScrapingData'

export interface IRegisterCarBrandRegisterScraping {
  execute: () => Promise<void>
}

function RegisterCarBrandRegisterScraping (carBrandScrapingData: ICarBrandScrapingData, carBrandRepository: ICarBrandRepository): IRegisterCarBrandRegisterScraping {
  const _carBrandScrapingData: ICarBrandScrapingData = carBrandScrapingData
  const _carBrandRepository: ICarBrandRepository = carBrandRepository
  return {
    execute: async function () {
      const carBrandScrapingData = await _carBrandScrapingData.searchData()
      const carBrandsData: CarBrandData[] = carBrandScrapingData.map(scrapingItem => {
        return {
          name: scrapingItem.title,
          image: scrapingItem.image,
          cars: scrapingItem
            .cars
            .map(({ name, image, price }) => ({ name, image, price }))
        }
      })
      await _carBrandRepository.addMany(carBrandsData)
    }
  }
}

export default RegisterCarBrandRegisterScraping
