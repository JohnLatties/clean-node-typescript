import { fail, success } from '@crosscutting/either'
import { CarBrand } from '@domain/models/carBrand/carBrand'
import { CarBrandData } from '@domain/models/carBrand/carBrandData'
import { ICarBrandRepository } from '@domain/models/carBrand/ICarBranRepository'
import { InvalidCarBrandError } from '@domain/share/errors/InvalidCarBrandError'
import { InvalidCarError } from '@domain/share/errors/InvalidCarError'
import { InvalidTextError } from '@domain/share/errors/InvalidTextError'
import { ICarBrandScrapingData } from './ICarBrandScrapingData'
import { RegisterCarBrandScrapingResponse } from './registerCarBrandScrapingResponse'

export interface IRegisterCarBrandRegisterScraping {
  execute: () => Promise<RegisterCarBrandScrapingResponse>
}

function RegisterCarBrandRegisterScraping (carBrandScrapingData: ICarBrandScrapingData, carBrandRepository: ICarBrandRepository): IRegisterCarBrandRegisterScraping {
  const _carBrandScrapingData: ICarBrandScrapingData = carBrandScrapingData
  const _carBrandRepository: ICarBrandRepository = carBrandRepository
  return {
    execute: async function () {
      const carBrandScrapingData = await _carBrandScrapingData.searchData()
      const carBrandsOrError = carBrandScrapingData.map(scrapingItem => {
        return CarBrand.create({
          name: scrapingItem.title,
          image: scrapingItem.image,
          cars: scrapingItem
            .cars
            .map(({ name, image, price }) => ({ name, image, price }))
        })
      })

      const carBrandError = carBrandsOrError.find(carBrand => carBrand.Failed())
      if (carBrandError) {
        return fail(new InvalidCarBrandError((carBrandError.value as InvalidTextError | InvalidCarError).message))
      }

      return success(await _carBrandRepository.addMany(carBrandsOrError.map(carBrand => carBrand.value as CarBrandData)))
    }
  }
}

export default RegisterCarBrandRegisterScraping
