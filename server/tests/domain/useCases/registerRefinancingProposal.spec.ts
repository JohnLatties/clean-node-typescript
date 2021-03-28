import { ICarBrandRepository } from '../../../src/domain/models/carBrand/ICarBranRepository'
import RegisterRefinancingProposal, { IRegisterRefinancingProposal } from '../../../src/domain/useCases/registerRefinancingProposal'
import { RefinancingProposalInput } from '../../../src/domain/useCases/registerRefinancingProposal/model'
import InMemoryIarBrandRepository from '../../../src/infra/data/inMemory/InMemoryCarBrandRepository'

import carBrandMock from '../../__mocks__/carbrands.json'

type SutTypes = {
  sut: IRegisterRefinancingProposal
  carBrandRepository: ICarBrandRepository
}
const makeSut = (): SutTypes => {
  const carBrandRepository = InMemoryIarBrandRepository()
  const sut = RegisterRefinancingProposal(carBrandRepository)

  return { sut, carBrandRepository }
}

const makeRefinancingProposalInputSuccess = (): RefinancingProposalInput => {
  return {
    carBrandKey: carBrandMock[0].key,
    carKey: carBrandMock[0].cars[0].key
  }
}

describe('RegisterRefinancingProposal', () => {
  test('Should call ICarBrandRepository with correct values', async () => {
    const { sut, carBrandRepository } = makeSut()

    const carBrandRepositorySpy = jest.spyOn(carBrandRepository, 'findByKey')
    const refinancingProposalInput = makeRefinancingProposalInputSuccess()
    await sut.execute(refinancingProposalInput)

    expect(carBrandRepositorySpy).toHaveBeenCalledWith(refinancingProposalInput.carBrandKey)
  })
})
