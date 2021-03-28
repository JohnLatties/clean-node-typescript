import FindRefinancingProposalController from '../../../src/presentation/controllers/proposal/findRefinancingProposalController'
import { Controller } from '../../../src/presentation/base/controller'
import InMemoryRefinancingProposalRepository from '../../../src/infra/data/inMemory/InMemoryRefinancingProposalRepository'
import refinancingProposal from '../../__mocks__/refinancingProposal.json'

const refinancingProposalRepository = InMemoryRefinancingProposalRepository()

interface SutType {
  sut: Controller
}

const makeSut = (): SutType => {
  const sut = FindRefinancingProposalController(refinancingProposalRepository)
  return { sut }
}

beforeAll(async () => {
  refinancingProposalRepository.add(refinancingProposal)
})

describe('Find Proposal Controller', () => {
  test('Should return 404 if the refinancing proposal was not found', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        key: 'invalid'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(404)
  })

  test('Should return 400 if no key is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        key: null
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(400)
  })

  test('Should return 200 if found a refinancing proposal', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        key: refinancingProposal.key
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(200)
  })
})
