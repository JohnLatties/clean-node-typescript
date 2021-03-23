
import { ICarBrandScrapingData } from '@domain/useCases/registerCarBrandScraping/ICarBrandScrapingData'
import { CarBrandScrapingModel } from '@domain/useCases/registerCarBrandScraping/model'
import config from 'src/main/config'
import { browser } from '../helper'
import { searchCarBrand } from './searchCarBrand'

const URL = config.scraping.url
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
