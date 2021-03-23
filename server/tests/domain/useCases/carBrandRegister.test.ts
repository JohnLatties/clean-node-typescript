import { ICarBrandScrapingData } from '../../../src/domain/useCases/registerCarBrandScraping/ICarBrandScrapingData'
import { CarBrandScrapingModel } from '../../../src/domain/useCases/registerCarBrandScraping/model'
import RegisterCarBrandRegisterScraping, { IRegisterCarBrandRegisterScraping } from '../../../src/domain/useCases/registerCarBrandScraping'
import InMemoryIarBrandRepository from '../../../src/infra/data/inMemory/InMemoryCarBrandRepository'
import { ICarBrandRepository } from '../../../src/domain/models/carBrand/ICarBranRepository'
import { InvalidCarBrandError } from '../../../src/domain/share/errors/InvalidCarBrandError'
import { fail } from '../../../src/crosscutting/either'

type SutTypes = {
  sut: IRegisterCarBrandRegisterScraping
  carBrandScrapingData: ICarBrandScrapingData
  carBrandRepository: ICarBrandRepository
}

const carBrandScrapingWithoutTitle: CarBrandScrapingModel = {
  title: '',
  detailsUrl: 'url',
  image: 'image.png',
  cars: [{
    name: 'MINI Clubman',
    detailsUrl: 'url',
    image: 'image.png',
    price: 20000
  }]
}

const carBrandScrapingWithoutImage: CarBrandScrapingModel = {
  title: 'Mini',
  detailsUrl: 'url',
  image: '',
  cars: [{
    name: 'MINI Clubman',
    detailsUrl: 'url',
    image: 'image.png',
    price: 20000
  }]
}

const carBrandScrapingWithCarWithoutName: CarBrandScrapingModel = {
  title: 'Mini',
  detailsUrl: 'url',
  image: 'image.png',
  cars: [{
    name: '',
    detailsUrl: 'url',
    image: 'image.png',
    price: 20000
  }]
}

const carBrandScrapingWithCarWithoutImage: CarBrandScrapingModel = {
  title: 'Mini',
  detailsUrl: 'url',
  image: 'image.png',
  cars: [{
    name: 'MINI Clubman',
    detailsUrl: 'url',
    image: '',
    price: 20000
  }]
}

const carBrandScrapingSuccess: CarBrandScrapingModel = {
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

const MakeCarBrandScrapingData = (testCarBrandScrapingModel: CarBrandScrapingModel): ICarBrandScrapingData => ({
  searchData: function (): Promise<CarBrandScrapingModel[]> {
    return new Promise((resolve) => resolve([testCarBrandScrapingModel]))
  }
})

const makeSut = (testCarBrandScrapingModel: CarBrandScrapingModel): SutTypes => {
  const carBrandScrapingData: ICarBrandScrapingData = MakeCarBrandScrapingData(testCarBrandScrapingModel)
  const carBrandRepository: ICarBrandRepository = InMemoryIarBrandRepository()
  const sut = RegisterCarBrandRegisterScraping(carBrandScrapingData, carBrandRepository)

  return { sut, carBrandScrapingData, carBrandRepository }
}

describe('Car Brand Register use case', () => {
  test('Should not create carBrands with invalid name', async () => {
    const { sut } = makeSut(carBrandScrapingWithoutTitle)

    const carBrandOrError = await sut.execute()
    expect(carBrandOrError)
      .toEqual(
        fail(new InvalidCarBrandError(`The name "${carBrandScrapingWithoutTitle.title}" is invalid.`))
      )
  })

  test('Should not create carBrands with invalid image', async () => {
    const { sut } = makeSut(carBrandScrapingWithoutImage)

    const carBrandOrError = await sut.execute()
    expect(carBrandOrError)
      .toEqual(
        fail(new InvalidCarBrandError(`The image "${carBrandScrapingWithoutTitle.title}" is invalid.`))
      )
  })

  test('Should not create carBrands with cars without name', async () => {
    const { sut } = makeSut(carBrandScrapingWithCarWithoutName)

    const carBrandOrError = await sut.execute()
    expect(carBrandOrError)
      .toEqual(
        fail(new InvalidCarBrandError('The car position "0" is invalid.'))
      )
  })

  test('Should not create carBrands with cars without image', async () => {
    const { sut } = makeSut(carBrandScrapingWithCarWithoutImage)

    const carBrandOrError = await sut.execute()
    expect(carBrandOrError)
      .toEqual(
        fail(new InvalidCarBrandError('The car position "0" is invalid.'))
      )
  })

  test('Should call CarBrandScrapingQuery and run "execute" function ', async () => {
    const { sut, carBrandScrapingData } = makeSut(carBrandScrapingSuccess)
    const carBrandScrapingQuerySpy = jest.spyOn(carBrandScrapingData, 'searchData')
    await sut.execute()
    expect(carBrandScrapingQuerySpy).toBeCalled()
  })

  test('Should call CarBrandRepository and run "addMany" function ', async () => {
    const { sut, carBrandRepository } = makeSut(carBrandScrapingSuccess)
    const carBrandRepositorySpy = jest.spyOn(carBrandRepository, 'addMany')
    await sut.execute()
    expect(carBrandRepositorySpy).toBeCalled()
  })

  test('Should be no car brand before receiving data form scraping', async () => {
    const { carBrandRepository } = makeSut(carBrandScrapingSuccess)
    const emptyCarBrandList = await carBrandRepository.findAll()

    expect(emptyCarBrandList.length).toBe(0)
  })

  test('Should add new car brands receiving data form scraping', async () => {
    const { sut, carBrandRepository } = makeSut(carBrandScrapingSuccess)
    const emptyCarBrandList = await carBrandRepository.findAll()
    expect(emptyCarBrandList.length).toBe(0)

    await sut.execute()
    const carbrandList = await carBrandRepository.findAll()
    expect(carbrandList.length > 0).toBe(true)
  })
})
