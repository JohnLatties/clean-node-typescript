
// get car brand from scraping
// save car brand on data base

import CarBrandScrapingQuery, { ICarBrandScrapingQuery } from '../../../src/application/query/carBrandScrapingQuery'
import { CarBrandScrapingModel } from '../../../src/application/query/carBrandScrapingQuery/model'
import CarBrandRegisterService, { ICarBrandRegisterService } from '../../../src/application/services/carBrandRegisterService'

type SutTypes = {
  sut: ICarBrandRegisterService
  carBrandScrapingQuery: ICarBrandScrapingQuery
}
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

const MakeCarBrandScrapingData = () => ({
  searchData: function (): Promise<CarBrandScrapingModel[]> {
    return new Promise((resolve) => resolve([carBrandScraping]))
  }
})

const makeSut = (): SutTypes => {
  const carBrandScrapingQuery: ICarBrandScrapingQuery = CarBrandScrapingQuery(MakeCarBrandScrapingData())
  const sut = CarBrandRegisterService(carBrandScrapingQuery)

  return { sut, carBrandScrapingQuery }
}

describe('Car Brand Register Service', () => {
  test('Should call CarBrandScrapingQuery and run "execute" function ', async () => {
    const { sut, carBrandScrapingQuery } = makeSut()
    const carBrandScrapingQuerySpy = jest.spyOn(carBrandScrapingQuery, 'execute')
    await sut.execute()
    expect(carBrandScrapingQuerySpy).toBeCalled()
  })
})
