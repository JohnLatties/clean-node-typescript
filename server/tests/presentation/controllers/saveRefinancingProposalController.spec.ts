import RefinancingProposalController from '../../../src/presentation/controllers/proposal/saveRefinancingProposalController'
import { Controller } from '../../../src/presentation/base/controller'
import { ICarBrandRepository } from '../../../src/domain/models/carBrand/ICarBranRepository'
import InMemoryCarBrandRepository from '../../../src/infra/data/inMemory/InMemoryCarBrandRepository'
import { IAprRepository } from '../../../src/domain/models/apr/IAprRepository'
import InMemoryAprRepository from '../../../src/infra/data/inMemory/InMemoryAprRepository'
import InMemoryRefinancingProposalRepository from '../../../src/infra/data/inMemory/InMemoryRefinancingProposalRepository'
import carBrandMock from '../../__mocks__/carbrands.json'
import RegisterRefinancingProposal from '../../../src/domain/useCases/registerRefinancingProposal'

const carBrandRepository: ICarBrandRepository = InMemoryCarBrandRepository()
const aprRepository: IAprRepository = InMemoryAprRepository()
const refinancingProposalRepository = InMemoryRefinancingProposalRepository()

interface SutType {
  sut: Controller
}

const makeSut = (): SutType => {
  const registerRefinancingProposalUseCase = RegisterRefinancingProposal(carBrandRepository, aprRepository, refinancingProposalRepository)
  const sut = RefinancingProposalController(registerRefinancingProposalUseCase)
  return { sut }
}

beforeAll(async () => {
  await carBrandRepository.addMany(carBrandMock)
  await aprRepository.add({ value: 5, createdAt: new Date('2021-03-01T22:50:39.228Z') })
  await aprRepository.add({ value: 10, createdAt: new Date('2021-03-29T22:50:39.228Z') })
})

describe('SaveProposal Controller', () => {
  test('Should return 400 if no carBrandKey is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        carBrandKey: '',
        carKey: 'carKey'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(400)
  })

  test('Should return 400 if no carKey is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        carBrandKey: 'carBrandKey',
        carKey: ''
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(400)
  })

  test('Should return 400 if carKey provided is invalid', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        carBrandKey: 'carBrandKey-invalid',
        carKey: 'carBrandKey'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(400)
    expect(result.body.message).toMatch(/Missing car brand/)
  })

  test('Should return 200 if all data are correct', async () => {
    const { sut } = makeSut()
    const carBrand = carBrandMock[0]
    const httpRequest = {
      body: {
        carBrandKey: carBrand.key,
        carKey: carBrand.cars[0].key
      }
    }
    const result = await sut.handle(httpRequest)

    expect(result.statusCode).toBe(200)
    expect(result.body.key).not.toBeNull()
  })
})
