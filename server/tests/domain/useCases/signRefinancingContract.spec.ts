import { IRefinancingContractRepository } from '../../../src/domain/models/refinancingContract/IRefinancingContractRepository'
import SignRefinancingContract, { ISignRefinancingContract } from '../../../src/domain/useCases/signRefinancingContract'
import { SignRefinancingContractInput, SignRefinancingContractOutput } from '../../../src/domain/useCases/signRefinancingContract/model'
import InMemoryRefinancingContractRepository from '../../../src/infra/data/inMemory/InMemoryRefinancingContractRepository'

import refinancingContract from '../../__mocks__/refinancingContract.json'
import { RegisterRefinancingContractResponse } from '../../../src/domain/useCases/registerRefinancingContract/RegisterRefinancingContractResponse'

const refinancingContractRepository = InMemoryRefinancingContractRepository()

type SutTypes = {
  sut: ISignRefinancingContract
  refinancingContractRepository: IRefinancingContractRepository
}
const makeSut = (): SutTypes => {
  const sut = SignRefinancingContract(refinancingContractRepository)
  return { sut, refinancingContractRepository }
}

const makeSignRefinancingContractInputSuccess = (): SignRefinancingContractInput => {
  return {
    contractKey: refinancingContract.key
  }
}

const makeSignRefinancingContractInputProposalFail = (): SignRefinancingContractInput => {
  return {
    contractKey: 'fail'
  }
}

beforeEach(async () => {
  await refinancingContractRepository.add(refinancingContract)
})

afterEach(async () => {
  await refinancingContractRepository.delete(refinancingContract.key)
})

describe('SignRefinancingContract', () => {
  test('Should call IRefinancingContractRepository with correct values', async () => {
    const { sut, refinancingContractRepository } = makeSut()

    const carBrandRepositorySpy = jest.spyOn(refinancingContractRepository, 'findByKey')
    const refinancingContractInput = makeSignRefinancingContractInputSuccess()
    await sut.execute(refinancingContractInput)

    expect(carBrandRepositorySpy).toHaveBeenCalledWith(refinancingContractInput.contractKey)
  })

  test('Should not sign a Contract with invalid values', async () => {
    const { sut } = makeSut()

    const refinancingContractInput = makeSignRefinancingContractInputProposalFail()
    const refinancingContractOrError: RegisterRefinancingContractResponse = await sut.execute(refinancingContractInput)

    expect(refinancingContractOrError.Failed()).toBe(true)
    expect((refinancingContractOrError.value as Error).message)
      .toMatch(/Unable to sign the contract. Invalid data/)
  })

  test('Should sign a RefinancingContract when all data is correct', async () => {
    const { sut, refinancingContractRepository } = makeSut()

    const refinancingContractInput = makeSignRefinancingContractInputSuccess()
    const refinancingContractOrError: RegisterRefinancingContractResponse = await sut.execute(refinancingContractInput)

    expect(refinancingContractOrError.Fulfilled()).toBe(true)
    const contractKey = (refinancingContractOrError.value as SignRefinancingContractOutput).key
    expect(contractKey).not.toBeNull()

    const refinancingContract = await refinancingContractRepository.findByKey(contractKey)

    expect(refinancingContract?.key).toBe(contractKey)
    expect(refinancingContract?.signed).toBeTruthy()
  })
})
