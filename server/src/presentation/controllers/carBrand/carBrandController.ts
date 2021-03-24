import { ICarBrandRepository } from '@domain/models/carBrand/ICarBranRepository'
import { Controller } from '@presentation/base/controller'
import { HttpResponse, ok, serverError } from '@presentation/base/https'

function CatBrandController (carBrandRepository: ICarBrandRepository): Controller {
  const _carBrandRepository = carBrandRepository
  return {
    handle: async function (): Promise<HttpResponse> {
      try {
        const result = await _carBrandRepository.findAll()
        return ok(result)
      } catch (error) {
        return serverError(error)
      }
    }

  }
}

export default CatBrandController
