import CarBrandScrapingQuery from '../../../src/application/query/carBrandScrapingQuery'
import { ICarBrandScrapingData } from '../../../src/application/query/carBrandScrapingQuery/ICarBrandScrapingData'
import { CarBrandScrapingModel } from '../../../src/application/query/carBrandScrapingQuery/model'

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

const ICarBrandScrapingDataMock = jest.fn(() => ({
  searchData: function (): Promise<CarBrandScrapingModel[]> {
    return new Promise((resolve) => resolve([carBrandScraping]))
  }
}))

describe('Query Car Brand Scraping', () => {
  test('Should have a method to get data', () => {
    const mock: ICarBrandScrapingData = new ICarBrandScrapingDataMock()
    const sut = CarBrandScrapingQuery(mock)

    expect(sut.execute).toBeInstanceOf(Function)
  })

  test('Should return a list of car Brands', async () => {
    const mock: ICarBrandScrapingData = new ICarBrandScrapingDataMock()
    const sut = CarBrandScrapingQuery(mock)
    const result = await sut.execute()

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
