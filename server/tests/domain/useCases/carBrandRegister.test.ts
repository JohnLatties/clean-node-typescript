import { ICarBrandScrapingData } from '../../../src/domain/useCases/registerCarBrandScraping/ICarBrandScrapingData'
import { CarBrandScrapingModel } from '../../../src/domain/useCases/registerCarBrandScraping/model'
import RegisterCarBrandRegisterScraping, { IRegisterCarBrandRegisterScraping } from '../../../src/domain/useCases/registerCarBrandScraping'

type SutTypes = {
  sut: IRegisterCarBrandRegisterScraping
  carBrandScrapingData: ICarBrandScrapingData
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

const MakeCarBrandScrapingData = (): ICarBrandScrapingData => ({
  searchData: function (): Promise<CarBrandScrapingModel[]> {
    return new Promise((resolve) => resolve([carBrandScraping]))
  }
})

const makeSut = (): SutTypes => {
  const carBrandScrapingData: ICarBrandScrapingData = MakeCarBrandScrapingData()
  const sut = RegisterCarBrandRegisterScraping(carBrandScrapingData)

  return { sut, carBrandScrapingData }
}

describe('Car Brand Register Service', () => {
  test('Should call CarBrandScrapingQuery and run "execute" function ', async () => {
    const { sut, carBrandScrapingData } = makeSut()
    const carBrandScrapingQuerySpy = jest.spyOn(carBrandScrapingData, 'searchData')
    await sut.execute()
    expect(carBrandScrapingQuerySpy).toBeCalled()
  })
})
