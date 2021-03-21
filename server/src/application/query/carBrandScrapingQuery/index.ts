import { CarBrandScrapingModel } from './model'

function CarBrandScrapingQuery () {
  return {
    execute: async function (): Promise<CarBrandScrapingModel[]> {
      const carScrap = { name: 'name', image: 'image.png', price: 1000.00, detailsUrl: 'url' }
      const carBrand: CarBrandScrapingModel = { title: 'brand', image: 'brand.png', cars: [carScrap], detailsUrl: 'url' }
      return [carBrand]
    }
  }
}

export default CarBrandScrapingQuery
