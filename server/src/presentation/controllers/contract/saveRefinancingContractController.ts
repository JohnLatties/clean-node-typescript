import { IRegisterRefinancingContract } from '@domain/useCases/registerRefinancingContract'
import { Controller } from '@presentation/base/controller'
import { InvalidParamError } from '@presentation/base/errors/invalidParamError'
import { badRequest, HttpRequest, HttpResponse, ok, serverError } from '@presentation/base/https'

function RefinancingContractController (registerRefinancingContract: IRegisterRefinancingContract): Controller {
  const _registerRefinancingContract = registerRefinancingContract
  return {
    handle: async function (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const { proposalKey, paymentPlan } = httpRequest.body
        if (!proposalKey || !paymentPlan) {
          const field = !proposalKey ? 'proposalKey' : 'paymentPlan'
          return badRequest(new InvalidParamError(field))
        }
        const refinancingContractResponseOrError = await _registerRefinancingContract.execute({ proposalKey, paymentPlan })
        if (refinancingContractResponseOrError.Failed()) {
          return badRequest(refinancingContractResponseOrError.value)
        }
        return ok(refinancingContractResponseOrError.value)
      } catch (error) {
        return serverError(error)
      }
    }
  }
}

export default RefinancingContractController
