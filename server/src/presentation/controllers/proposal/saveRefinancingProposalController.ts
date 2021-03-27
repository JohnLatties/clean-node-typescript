import { Controller } from '@presentation/base/controller'
import { InvalidParamError } from '@presentation/base/errors/invalidParamError'
import { badRequest, HttpRequest, HttpResponse, ok, serverError } from '@presentation/base/https'

function RefinancingProposalController (): Controller {
  return {
    handle: async function (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const { carBrandId, carName } = httpRequest.body
        if (carBrandId || carName) {
          const field = !carBrandId ? 'carBrandId' : 'carName'
          return badRequest(new InvalidParamError(field))
        }
        return ok({})
      } catch (error) {
        return serverError(error)
      }
    }
  }
}

export default RefinancingProposalController
