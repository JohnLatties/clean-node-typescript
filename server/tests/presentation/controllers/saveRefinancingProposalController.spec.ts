import RefinancingProposalController from '../../../src/presentation/controllers/proposal/saveRefinancingProposalController'
import { Controller } from '../../../src/presentation/base/controller'

interface SutType {
  sut: Controller
}

const makeSut = (): SutType => {
  const sut = RefinancingProposalController()
  return { sut }
}

describe('SaveProposal Controller', () => {
  test('Should return 400 if no carBrandId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        carBrandId: '',
        carName: 'carBrandId'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(400)
  })

  test('Should return 400 if no carName is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        carBrandId: 'carBrandId',
        carName: ''
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(400)
  })
})
