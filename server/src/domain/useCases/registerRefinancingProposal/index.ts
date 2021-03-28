import { success, fail } from '@crosscutting/either'
import { IAprRepository } from '@domain/models/apr/IAprRepository'
import { ICarBrandRepository } from '@domain/models/carBrand/ICarBranRepository'
import { IRefinancingProposalRepository } from '@domain/models/refinancingProposal/IRefinancingProposalRepository'
import { RefinancingProposal } from '@domain/models/refinancingProposal/RefinancingProposal'
import { InvalidRefinancingProposalError } from '@domain/share/errors/InvalidRefinancingProposalError'
import { RefinancingProposalInput } from './model'
import { RegisterRefinancingProposalResponse } from './RegisterRefinancingProposalResponse'

export interface IRegisterRefinancingProposal {
  execute: (refinancingProposalInput: RefinancingProposalInput) => Promise<RegisterRefinancingProposalResponse>
}

function RegisterRefinancingProposal (
  carBrandRepository: ICarBrandRepository,
  aprRepository: IAprRepository,
  refinancingProposalRepository: IRefinancingProposalRepository
): IRegisterRefinancingProposal {
  const _carBrandRepository = carBrandRepository
  const _aprRepository = aprRepository
  const _refinancingProposalRepository = refinancingProposalRepository
  return {
    execute: async (refinancingProposalInput: RefinancingProposalInput) => {
      const { carBrandKey, carKey } = refinancingProposalInput
      const carBrand = await _carBrandRepository.findByKey(carBrandKey)
      const car = carBrand?.cars.find(item => item.key === carKey)
      const apr = await _aprRepository.findLast() || { value: 0 }

      const carBrandProposal = { key: carBrand?.key!, name: carBrand?.name!, image: carBrand?.image! }
      const carProposal = { key: car?.key!, name: car?.name!, price: car?.price!, image: car?.image! }
      const refinancingProposaOrError = RefinancingProposal.create(carBrandProposal, carProposal, apr.value)

      if (refinancingProposaOrError.Failed()) {
        return fail(new InvalidRefinancingProposalError((refinancingProposaOrError.value).message))
      }

      const refinancingProposa = refinancingProposaOrError.value
      await _refinancingProposalRepository.add(refinancingProposa)

      return success({ key: refinancingProposa.key })
    }
  }
}

export default RegisterRefinancingProposal
