import { success, fail } from '@crosscutting/either'
import { IRefinancingContractRepository } from '@domain/models/refinancingContract/IRefinancingContractRepository'
import { RefinancingContract } from '@domain/models/refinancingContract/RefinancingContract'
import { IRefinancingProposalRepository } from '@domain/models/refinancingProposal/IRefinancingProposalRepository'
import { RefinancingProposal } from '@domain/models/refinancingProposal/RefinancingProposal'
import { InvalidRefinancingContractError } from '@domain/share/errors/InvalidRefinancingContractError'
import { RefinancingContractInput } from './model'
import { RegisterRefinancingContractResponse } from './RegisterRefinancingContractResponse'

export interface IRegisterRefinancingContract {
  execute: (refinancingContractInput: RefinancingContractInput) => Promise<RegisterRefinancingContractResponse>
}

function RegisterRefinancingContract (
  refinancingContractRepository: IRefinancingContractRepository,
  refinancingProposalRepository: IRefinancingProposalRepository
): IRegisterRefinancingContract {
  const _refinancingContractRepository = refinancingContractRepository
  const _refinancingProposalRepository = refinancingProposalRepository
  return {
    execute: async (refinancingContractInput: RefinancingContractInput) => {
      const { proposalKey, paymentPlan } = refinancingContractInput
      const proposal = await _refinancingProposalRepository.findByKey(proposalKey)
      const paymentPlanSelected = proposal?.paymentOptions.find(item => item.months === paymentPlan)

      const parseEntityOrError = RefinancingProposal.bindFrom(proposal!)
      if (parseEntityOrError.Failed()) {
        return fail(new InvalidRefinancingContractError(parseEntityOrError.value.message))
      }

      const refinancingContractOrError = RefinancingContract.create(proposal!, paymentPlanSelected!)

      if (refinancingContractOrError.Failed()) {
        return fail(new InvalidRefinancingContractError(refinancingContractOrError.value.message))
      }

      const refinancingContrac = refinancingContractOrError.value as RefinancingContract

      const refinancingProposalEntity = parseEntityOrError.value as RefinancingProposal

      refinancingProposalEntity.linkContract(refinancingContrac.key)

      await _refinancingContractRepository.add(refinancingContrac)

      await _refinancingProposalRepository.update(refinancingProposalEntity.key, refinancingProposalEntity)

      return success({ key: refinancingContrac.key })
    }
  }
}

export default RegisterRefinancingContract
