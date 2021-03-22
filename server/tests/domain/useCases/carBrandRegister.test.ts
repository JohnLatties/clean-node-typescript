import { ICarBrandScrapingData } from '../../../src/domain/useCases/registerCarBrandScraping/ICarBrandScrapingData'
import { CarBrandScrapingModel } from '../../../src/domain/useCases/registerCarBrandScraping/model'
import RegisterCarBrandRegisterScraping, { IRegisterCarBrandRegisterScraping } from '../../../src/domain/useCases/registerCarBrandScraping'
import InMemoryIarBrandRepository from '../../../src/infra/data/inMemory/InMemoryCarBrandRepository'
import { ICarBrandRepository } from '../../../src/domain/models/carBrand/ICarBranRepository'

type SutTypes = {
  sut: IRegisterCarBrandRegisterScraping
  carBrandScrapingData: ICarBrandScrapingData
  carBrandRepository: ICarBrandRepository
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
  const carBrandRepository: ICarBrandRepository = InMemoryIarBrandRepository()
  const sut = RegisterCarBrandRegisterScraping(carBrandScrapingData, carBrandRepository)

  return { sut, carBrandScrapingData, carBrandRepository }
}

describe('Car Brand Register use case', () => {
  test('Should call CarBrandScrapingQuery and run "execute" function ', async () => {
    const { sut, carBrandScrapingData } = makeSut()
    const carBrandScrapingQuerySpy = jest.spyOn(carBrandScrapingData, 'searchData')
    await sut.execute()
    expect(carBrandScrapingQuerySpy).toBeCalled()
  })

  test('Should call CarBrandRepository and run "addMany" function ', async () => {
    const { sut, carBrandRepository } = makeSut()
    const carBrandRepositorySpy = jest.spyOn(carBrandRepository, 'addMany')
    await sut.execute()
    expect(carBrandRepositorySpy).toBeCalled()
  })

  test('Should be no car brand before receiving data form scraping', async () => {
    const { carBrandRepository } = makeSut()
    const emptyCarBrandList = await carBrandRepository.findAll()

    expect(emptyCarBrandList.length).toBe(0)
  })

  test('Should add new car brands receiving data form scraping', async () => {
    const { sut, carBrandRepository } = makeSut()
    const emptyCarBrandList = await carBrandRepository.findAll()
    expect(emptyCarBrandList.length).toBe(0)

    await sut.execute()
    const carbrandList = await carBrandRepository.findAll()

    expect(carbrandList.length > 0).toBe(true)
  })
})
