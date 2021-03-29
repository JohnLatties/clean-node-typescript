import RegisterRefinancingContract from '@domain/useCases/registerRefinancingContract'
import SignRefinancingContract from '@domain/useCases/signRefinancingContract'
import RefinancingContractRepository from '@infra/data/mongo/RefinancingContractRepository'
import RefinancingProposalRepository from '@infra/data/mongo/RefinancingProposalRepository'
import FindRefinancingContractController from '@presentation/controllers/contract/findRefinancingContractController'
import ListRefinancingContractSignedController from '@presentation/controllers/contract/lsitRefinancingContractSignedController'
import RefinancingContractController from '@presentation/controllers/contract/saveRefinancingContractController'
import SignRefinancingContractController from '@presentation/controllers/contract/signRefinancingContractController'

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

export const createSignRefinancingContractController = () => {
  const refinancingContractRepository = RefinancingContractRepository()
  const signRefinancingContract = SignRefinancingContract(refinancingContractRepository)
  const findRefinancingContractController = SignRefinancingContractController(signRefinancingContract)
  return findRefinancingContractController
}

export const createListRefinancingContractSignedController = () => {
  const refinancingContractRepository = RefinancingContractRepository()
  const listRefinancingContractSignedController = ListRefinancingContractSignedController(refinancingContractRepository)
  return listRefinancingContractSignedController
}
