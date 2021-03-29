import RegisterRefinancingContract from '@domain/useCases/registerRefinancingContract'
import RefinancingContractRepository from '@infra/data/mongo/RefinancingContractRepository'
import RefinancingProposalRepository from '@infra/data/mongo/RefinancingProposalRepository'
import FindRefinancingContractController from '@presentation/controllers/contract/findRefinancingContractController'
import RefinancingContractController from '@presentation/controllers/contract/saveRefinancingContractController'

export const createRegisterRefinancingContractController = () => {
  const refinancingContractRepository = RefinancingContractRepository()
  const refinancingProposalRepository = RefinancingProposalRepository()

  const registerRefinancingContractUseCase = RegisterRefinancingContract(
    refinancingContractRepository,
    refinancingProposalRepository)

  const refinancingContractController = RefinancingContractController(registerRefinancingContractUseCase)
  return refinancingContractController
}

export const createFindRefinancingContractController = () => {
  const refinancingContractRepository = RefinancingContractRepository()
  const findRefinancingContractController = FindRefinancingContractController(refinancingContractRepository)
  return findRefinancingContractController
}
