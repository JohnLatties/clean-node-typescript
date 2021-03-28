import { ICarBrandRepository } from '@domain/models/carBrand/ICarBranRepository'
import { RefinancingProposalInput } from './model'

export interface IRegisterRefinancingProposal {
  execute: (refinancingProposalInput: RefinancingProposalInput) => Promise<void>
}

function RegisterRefinancingProposal (carBrandRepository: ICarBrandRepository): IRegisterRefinancingProposal {
  const _carBrandRepository = carBrandRepository
  return {
    execute: async (refinancingProposalInput: RefinancingProposalInput) => {
      const { carBrandKey } = refinancingProposalInput
      const carBrand = await _carBrandRepository.findByKey(carBrandKey)
      console.log(carBrand)
    }
  }
}

export default RegisterRefinancingProposal
