import RegisterRefinancingProposal from '@domain/useCases/registerRefinancingProposal'
import AprRepository from '@infra/data/mongo/AprRepository'
import CarBrandRepository from '@infra/data/mongo/CarBrandRepository'
import RefinancingProposalRepository from '@infra/data/mongo/RefinancingProposalRepository'
import FindRefinancingProposalController from '@presentation/controllers/proposal/findRefinancingProposalController'
import RefinancingProposalController from '@presentation/controllers/proposal/saveRefinancingProposalController'

export const createRegisterRefinancingProposalController = () => {
  const carBrandRepository = CarBrandRepository()
  const aprRepository = AprRepository()
  const refinancingProposalRepository = RefinancingProposalRepository()

  const registerRefinancingProposalUseCase = RegisterRefinancingProposal(
    carBrandRepository,
    aprRepository,
    refinancingProposalRepository)

  const refinancingProposalController = RefinancingProposalController(registerRefinancingProposalUseCase)
  return refinancingProposalController
}

export const createFindRefinancingProposalController = () => {
  const refinancingProposalRepository = RefinancingProposalRepository()
  const findRefinancingProposalController = FindRefinancingProposalController(refinancingProposalRepository)
  return findRefinancingProposalController
}
