import { ICarBrandScrapingData } from './ICarBrandScrapingData'

export interface IRegisterCarBrandRegisterScraping {
  execute: () => Promise<void>
}

function RegisterCarBrandRegisterScraping (carBrandScrapingData: ICarBrandScrapingData): IRegisterCarBrandRegisterScraping {
  const _carBrandScrapingData: ICarBrandScrapingData = carBrandScrapingData
  return {
    execute: async function () {
      await _carBrandScrapingData.searchData()
    }
  }
}

export default RegisterCarBrandRegisterScraping
