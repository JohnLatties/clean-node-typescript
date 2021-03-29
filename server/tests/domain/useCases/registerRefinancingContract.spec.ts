import { IRefinancingProposalRepository } from '../../../src/domain/models/refinancingProposal/IRefinancingProposalRepository'
import { IRefinancingContractRepository } from '../../../src/domain/models/refinancingContract/IRefinancingContractRepository'
import RegisterRefinancingContract, { IRegisterRefinancingContract } from '../../../src/domain/useCases/registerRefinancingContract'
import { RefinancingContractCreated, RefinancingContractInput } from '../../../src/domain/useCases/registerRefinancingContract/model'
import InMemoryRefinancingProposalRepository from '../../../src/infra/data/inMemory/InMemoryRefinancingProposalRepository'
import InMemoryRefinancingContractRepository from '../../../src/infra/data/inMemory/InMemoryRefinancingContractRepository'

import { InvalidPaymentPlan } from '../../../src/domain/share/errors/InvalidPaymentPlan'

import refinancingProposal from '../../__mocks__/refinancingProposal.json'
import { RegisterRefinancingContractResponse } from '../../../src/domain/useCases/registerRefinancingContract/RegisterRefinancingContractResponse'

const refinancingProposalRepository = InMemoryRefinancingProposalRepository()
const refinancingContractRepository = InMemoryRefinancingContractRepository()

type SutTypes = {
  sut: IRegisterRefinancingContract
  refinancingContractRepository: IRefinancingContractRepository
  refinancingProposalRepository: IRefinancingProposalRepository
}
const makeSut = (): SutTypes => {
  const sut = RegisterRefinancingContract(refinancingContractRepository, refinancingProposalRepository)
  return { sut, refinancingContractRepository, refinancingProposalRepository }
}

const makeRefinancingContractInputSuccess = (): RefinancingContractInput => {
  return {
    proposalKey: refinancingProposal.key,
    paymentPlan: refinancingProposal.paymentOptions[0].months
  }
}

const makeRefinancingContractInputProposalFail = (): RefinancingContractInput => {
  return {
    proposalKey: 'fail',
    paymentPlan: refinancingProposal.paymentOptions[0].months
  }
}

const makeRefinancingContractInputPaymentPlanFail = (): RefinancingContractInput => {
  return {
    proposalKey: refinancingProposal.key,
    paymentPlan: 0
  }
}

beforeEach(async () => {
  await refinancingProposalRepository.add(refinancingProposal)
})

afterEach(async () => {
  await refinancingProposalRepository.delete(refinancingProposal.key)
})

describe('RegisterRefinancingContract', () => {
  test('Should call refinancingProposalRepository with correct values', async () => {
    const { sut, refinancingProposalRepository } = makeSut()

    const carBrandRepositorySpy = jest.spyOn(refinancingProposalRepository, 'findByKey')
    const refinancingContractInput = makeRefinancingContractInputSuccess()
    await sut.execute(refinancingContractInput)

    expect(carBrandRepositorySpy).toHaveBeenCalledWith(refinancingContractInput.proposalKey)
  })

  test('Should not create a RefinancingProposal with invalid porposal', async () => {
    const { sut } = makeSut()

    const refinancingContractInput = makeRefinancingContractInputProposalFail()
    const refinancingContractOrError: RegisterRefinancingContractResponse = await sut.execute(refinancingContractInput)

    expect(refinancingContractOrError.Failed()).toBe(true)
    expect((refinancingContractOrError.value as Error).message)
      .toMatch(/The refinancing contract is invalid. Invalid data/)
  })

  test('Should not create a RefinancingContract with invalid Payment plane', async () => {
    const { sut } = makeSut()

    const refinancingContractInput = makeRefinancingContractInputPaymentPlanFail()
    const refinancingContractOrError: RegisterRefinancingContractResponse = await sut.execute(refinancingContractInput)

    expect(refinancingContractOrError.Failed()).toBe(true)
    expect((refinancingContractOrError.value as InvalidPaymentPlan).message)
      .toMatch(/The refinancing contract is invalid. The payment/)
  })

  test('Should create a RefinancingContract when all data is correct', async () => {
    const { sut, refinancingContractRepository, refinancingProposalRepository } = makeSut()

    const refinancingContractInput = makeRefinancingContractInputSuccess()
    const refinancingContractOrError: RegisterRefinancingContractResponse = await sut.execute(refinancingContractInput)

    expect(refinancingContractOrError.Fulfilled()).toBe(true)
    const ContractKey = (refinancingContractOrError.value as RefinancingContractCreated).key
    expect(ContractKey).not.toBeNull()

    const refinancingContract = await refinancingContractRepository.findByKey(ContractKey)
    const refinancingProposal = await refinancingProposalRepository.findByKey(refinancingContractInput.proposalKey)

    expect(refinancingContract?.key).toBe(ContractKey)
    expect(refinancingContract?.proposal.key).toBe(refinancingContractInput.proposalKey)
    expect(refinancingContract?.paymentPlan.months).toBe(refinancingContractInput.paymentPlan)
    expect(refinancingProposal?.contractKey).toBe(refinancingContract?.key)
  })
})
