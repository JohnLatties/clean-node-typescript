import { CarBrandScrapingModel } from '../../../../src/domain/useCases/registerCarBrandScraping/model'
import { ICarBrandScrapingData } from '../../../../src/domain/useCases/registerCarBrandScraping/ICarBrandScrapingData'

const carBrandScraping: CarBrandScrapingModel = {
  title: 'Mini',
  detailsUrl: 'url',
  image: 'image.png',
  cars: [{
    name: 'MINI Clubman',
    detailsUrl: 'url',
    image: 'image.png',
    price: 20000
  }]
}

const ICarBrandScrapingDataMock = () => ({
  searchData: function (): Promise<CarBrandScrapingModel[]> {
    return new Promise((resolve) => resolve([carBrandScraping]))
  }
})

describe('Query Car Brand Scraping', () => {
  test('Should have a method to get data', () => {
    const mock: ICarBrandScrapingData = ICarBrandScrapingDataMock()

    expect(mock.searchData).toBeInstanceOf(Function)
  })

  test('Should return a list of car Brands', async () => {
    const sut: ICarBrandScrapingData = ICarBrandScrapingDataMock()
    const result = await sut.searchData()

    expect(Array.isArray(result)).toBe(true)
    expect(result)
      .toEqual(expect
        .arrayContaining([
          expect.objectContaining({
            title: carBrandScraping.title
          }),
          expect.objectContaining({
            image: carBrandScraping.image
          })
        ]))
  })
})
