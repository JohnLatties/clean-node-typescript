import { IRegisterRefinancingProposal } from '@domain/useCases/registerRefinancingProposal'
import { Controller } from '@presentation/base/controller'
import { InvalidParamError } from '@presentation/base/errors/invalidParamError'
import { badRequest, HttpRequest, HttpResponse, ok, serverError } from '@presentation/base/https'

function RefinancingProposalController (registerRefinancingProposal: IRegisterRefinancingProposal): Controller {
  const _registerRefinancingProposal = registerRefinancingProposal
  return {
    handle: async function (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const { carBrandKey, carKey } = httpRequest.body
        if (!carBrandKey || !carKey) {
          const field = !carBrandKey ? 'carBrandKey' : 'carKey'
          return badRequest(new InvalidParamError(field))
        }
        const refinancingProposalResponseOrError = await _registerRefinancingProposal.execute({ carBrandKey, carKey })
        if (refinancingProposalResponseOrError.Failed()) {
          return badRequest(refinancingProposalResponseOrError.value)
        }
        return ok(refinancingProposalResponseOrError.value)
      } catch (error) {
        return serverError(error)
      }
    }
  }
}

export default RefinancingProposalController
