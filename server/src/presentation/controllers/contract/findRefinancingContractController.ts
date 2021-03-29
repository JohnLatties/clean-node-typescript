import { IRefinancingContractRepository } from '@domain/models/refinancingContract/IRefinancingContractRepository'
import { Controller } from '@presentation/base/controller'
import { InvalidParamError } from '@presentation/base/errors/invalidParamError'
import { badRequest, HttpRequest, HttpResponse, notFound, ok, serverError } from '@presentation/base/https'

function FindRefinancingContractController (refinancingContractRepository: IRefinancingContractRepository): Controller {
  const _refinancingContractRepository = refinancingContractRepository
  return {
    handle: async function (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const { key } = httpRequest.params
        if (!key) return badRequest(new InvalidParamError('key'))

        const result = await _refinancingContractRepository.findByKey(key)
        if (!result) return notFound(new Error(`key: ${key}`))

        return ok(result)
      } catch (error) {
        return serverError(error)
      }
    }
  }
}

export default FindRefinancingContractController
