import { IRefinancingContractRepository } from '@domain/models/refinancingContract/IRefinancingContractRepository'
import { Controller } from '@presentation/base/controller'
import { HttpResponse, ok, serverError } from '@presentation/base/https'

function ListRefinancingContractSignedController (refinancingContractRepository: IRefinancingContractRepository): Controller {
  const _refinancingContractRepository = refinancingContractRepository
  return {
    handle: async function (): Promise<HttpResponse> {
      try {
        const result = await _refinancingContractRepository.findAllSigned()
        return ok(result)
      } catch (error) {
        return serverError(error)
      }
    }
  }
}

export default ListRefinancingContractSignedController
