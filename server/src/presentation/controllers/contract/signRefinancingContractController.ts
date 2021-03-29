import { ISignRefinancingContract } from '@domain/useCases/signRefinancingContract'
import { Controller } from '@presentation/base/controller'
import { InvalidParamError } from '@presentation/base/errors/invalidParamError'
import { badRequest, HttpRequest, HttpResponse, notFound, ok, serverError } from '@presentation/base/https'

function SignRefinancingContractController (signRefinancingContract: ISignRefinancingContract): Controller {
  const _signRefinancingContract = signRefinancingContract
  return {
    handle: async function (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const { key } = httpRequest.params
        if (!key) return badRequest(new InvalidParamError('key'))

        const signOrError = await _signRefinancingContract.execute({ contractKey: key })
        if (signOrError.Failed()) return notFound(new Error(signOrError.value.message))

        return ok(signOrError.value.key)
      } catch (error) {
        return serverError(error)
      }
    }
  }
}

export default SignRefinancingContractController
