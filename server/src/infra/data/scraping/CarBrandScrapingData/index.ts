
import { ICarBrandScrapingData } from '@application/query/carBrandScrapingQuery/ICarBrandScrapingData'
import { CarBrandScrapingModel } from '@application/query/carBrandScrapingQuery/model'
import { browser } from '../helper'
import { searchCarBrand } from './searchCarBrand'

const URL = 'https://www.withclutch.com/'
const carBrandScrapingData: ICarBrandScrapingData = {
  searchData: async function (): Promise<CarBrandScrapingModel[]> {
    const browserInstace = await browser.startBrowser()
    try {
      if (!browserInstace) {
        throw new Error('Could not create a browser instance => getCarBrand')
      }

      const brands = await searchCarBrand(browserInstace, URL)

      return brands
    } catch (error) {
      console.log(error)
      const emptyList: CarBrandScrapingModel[] = []
      return emptyList
    } finally {
      browserInstace!.close()
    }
  }
}

export default carBrandScrapingData
