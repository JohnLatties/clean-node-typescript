import InMemoryCarBrandRepository from '../../../src/infra/data/inMemory/InMemoryCarBrandRepository'
import CatBrandController from '../../../src/presentation/controllers/carBrand/carBrandController'

describe('CarBrand Coontroller', () => {
  test('Should call respository to return data', async () => {
    const carBrandRepositoryStub = InMemoryCarBrandRepository()
    const carBrandRepositorySpy = jest.spyOn(carBrandRepositoryStub, 'findAll')

    const sut = CatBrandController(carBrandRepositoryStub)

    await sut.handle({})

    expect(carBrandRepositorySpy).toBeCalled()
  })

  test('Should return 500  when there is any error other than validation error', async () => {
    const carBrandRepositoryStub = InMemoryCarBrandRepository()

    jest
      .spyOn(carBrandRepositoryStub, 'findAll')
      .mockImplementationOnce(() => Promise.reject('fail'))

    const sut = CatBrandController(carBrandRepositoryStub)

    const result = await sut.handle({})
    expect(result.statusCode).toBe(500)
  })
})
