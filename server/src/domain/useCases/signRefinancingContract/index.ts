import { fail, success } from '@crosscutting/either'
import { IRefinancingContractRepository } from '@domain/models/refinancingContract/IRefinancingContractRepository'
import { RefinancingContract } from '@domain/models/refinancingContract/RefinancingContract'
import { InvalidSignRefinancingContractError } from '@domain/share/errors/InvalidSignRefinancingContractError'
import { SignRefinancingContractInput } from './model'
import { SignRefinancingContractResponse } from './SignRefinancingContractResponse'

export interface ISignRefinancingContract {
  execute: (signRefinancingContractInput: SignRefinancingContractInput) => Promise<SignRefinancingContractResponse>
}

function SignRefinancingContract (
  refinancingContractRepository: IRefinancingContractRepository
): ISignRefinancingContract {
  const _refinancingContractRepository = refinancingContractRepository
  return {
    execute: async function (signRefinancingContractInput: SignRefinancingContractInput) {
      const { contractKey } = signRefinancingContractInput

      const contract = await _refinancingContractRepository.findByKey(contractKey)

      const contractOrError = RefinancingContract.bindFrom(contract!)
      if (contractOrError.Failed()) {
        return fail(new InvalidSignRefinancingContractError((contractOrError.value as Error).message))
      }

      const contractEntity = contractOrError.value as RefinancingContract
      contractEntity.sign()

      _refinancingContractRepository.update(contractEntity.key, contractEntity)

      return success({ key: contractKey })
    }
  }
}

export default SignRefinancingContract
