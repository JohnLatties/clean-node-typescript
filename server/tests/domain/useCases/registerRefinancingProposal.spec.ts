import { ICarBrandRepository } from '../../../src/domain/models/carBrand/ICarBranRepository'
import { IAprRepository } from '../../../src/domain/models/apr/IAprRepository'
import { IRefinancingProposalRepository } from '../../../src/domain/models/refinancingProposal/IRefinancingProposalRepository'
import RegisterRefinancingProposal, { IRegisterRefinancingProposal } from '../../../src/domain/useCases/registerRefinancingProposal'
import { RefinancingProposalCreated, RefinancingProposalInput } from '../../../src/domain/useCases/registerRefinancingProposal/model'
import InMemoryCarBrandRepository from '../../../src/infra/data/inMemory/InMemoryCarBrandRepository'
import InMemoryAprRepository from '../../../src/infra/data/inMemory/InMemoryAprRepository'
import InMemoryRefinancingProposalRepository from '../../../src/infra/data/inMemory/InMemoryRefinancingProposalRepository'

import carBrandMock from '../../__mocks__/carbrands.json'
import { RegisterRefinancingProposalResponse } from '../../../src/domain/useCases/registerRefinancingProposal/RegisterRefinancingProposalResponse'
import { InvalidCarProposalError } from '../../../src/domain/share/errors/InvalidCarProposalError'
import { InvalidRefinancingProposalError } from '../../../src/domain/share/errors/InvalidRefinancingProposalError'

const carBrandRepository: ICarBrandRepository = InMemoryCarBrandRepository()
const aprRepository: IAprRepository = InMemoryAprRepository()
const refinancingProposalRepository = InMemoryRefinancingProposalRepository()

type SutTypes = {
  sut: IRegisterRefinancingProposal
  carBrandRepository: ICarBrandRepository
  aprRepository: IAprRepository
  refinancingProposalRepository: IRefinancingProposalRepository
}
const makeSut = (): SutTypes => {
  const sut = RegisterRefinancingProposal(carBrandRepository, aprRepository, refinancingProposalRepository)
  return { sut, carBrandRepository, aprRepository, refinancingProposalRepository }
}

const makeRefinancingProposalInputSuccess = (): RefinancingProposalInput => {
  return {
    carBrandKey: carBrandMock[0].key,
    carKey: carBrandMock[0].cars[0].key
  }
}

const makeRefinancingProposalInputCarBandFail = (): RefinancingProposalInput => {
  return {
    carBrandKey: 'fail',
    carKey: carBrandMock[0].cars[0].key
  }
}

const makeRefinancingProposalInputCarFail = (): RefinancingProposalInput => {
  return {
    carBrandKey: carBrandMock[0].key,
    carKey: 'fail'
  }
}

beforeAll(async () => {
  await carBrandRepository.addMany(carBrandMock)
  await aprRepository.add({ value: 5, createdAt: new Date('2021-03-01T22:50:39.228Z') })
  await aprRepository.add({ value: 10, createdAt: new Date('2021-03-29T22:50:39.228Z') })
})

describe('RegisterRefinancingProposal', () => {
  test('Should call ICarBrandRepository with correct values', async () => {
    const { sut, carBrandRepository } = makeSut()

    const carBrandRepositorySpy = jest.spyOn(carBrandRepository, 'findByKey')
    const refinancingProposalInput = makeRefinancingProposalInputSuccess()
    await sut.execute(refinancingProposalInput)

    expect(carBrandRepositorySpy).toHaveBeenCalledWith(refinancingProposalInput.carBrandKey)
  })

  test('Should call findLast of IAprRepository', async () => {
    const { sut, aprRepository } = makeSut()

    const aprRepositorySpy = jest.spyOn(aprRepository, 'findLast')
    const refinancingProposalInput = makeRefinancingProposalInputSuccess()
    await sut.execute(refinancingProposalInput)

    expect(aprRepositorySpy).toHaveBeenCalled()
  })

  test('Should not create a RefinancingProposal with invalid CarrBrand', async () => {
    const { sut } = makeSut()

    const refinancingProposalInput = makeRefinancingProposalInputCarBandFail()
    const refinancingProposalOrError: RegisterRefinancingProposalResponse = await sut.execute(refinancingProposalInput)

    expect(refinancingProposalOrError.Failed()).toBe(true)
    expect((refinancingProposalOrError.value as InvalidRefinancingProposalError).message).toMatch(/Missing car brand/)
  })

  test('Should not create a RefinancingProposal with invalid Carr', async () => {
    const { sut } = makeSut()

    const refinancingProposalInput = makeRefinancingProposalInputCarFail()
    const refinancingProposalOrError: RegisterRefinancingProposalResponse = await sut.execute(refinancingProposalInput)

    expect(refinancingProposalOrError.Failed()).toBe(true)
    expect((refinancingProposalOrError.value as InvalidCarProposalError).message).toMatch(/Missing car./)
  })

  test('Should not create a RefinancingProposal with invalid APR', async () => {
    const { sut, aprRepository } = makeSut()

    jest.spyOn(aprRepository, 'findLast').mockReturnValueOnce(Promise.resolve({ value: 0, createdAt: new Date() }))

    const refinancingProposalInput = makeRefinancingProposalInputSuccess()
    const refinancingProposalOrError: RegisterRefinancingProposalResponse = await sut.execute(refinancingProposalInput)

    expect(refinancingProposalOrError.Failed()).toBe(true)
    expect(refinancingProposalOrError.Fulfilled()).toBe(false)
    expect((refinancingProposalOrError.value as InvalidRefinancingProposalError).message).toMatch(/The APR "0" is invalid./)
  })

  test('Should create a RefinancingProposal when all data is correct', async () => {
    const { sut, refinancingProposalRepository, aprRepository } = makeSut()

    const refinancingProposalInput = makeRefinancingProposalInputSuccess()
    const refinancingProposalOrError: RegisterRefinancingProposalResponse = await sut.execute(refinancingProposalInput)

    expect(refinancingProposalOrError.Fulfilled()).toBe(true)
    const proposalKey = (refinancingProposalOrError.value as RefinancingProposalCreated).key
    expect(proposalKey).not.toBeNull()

    const refinancingProposal = await refinancingProposalRepository.findByKey(proposalKey)
    const apr = await aprRepository.findLast()

    expect(refinancingProposal?.key).toBe(proposalKey)
    expect(refinancingProposal?.carBrand.key).toBe(refinancingProposalInput.carBrandKey)
    expect(refinancingProposal?.car.key).toBe(refinancingProposalInput.carKey)
    expect(refinancingProposal?.proposalNumber).not.toBeNull()
    expect(refinancingProposal?.apr).toBe(apr?.value)
    expect(refinancingProposal?.paymentOptions.length).toBe(2)
  })
})
