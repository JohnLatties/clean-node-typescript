import CarBrandRepository from '@infra/data/mongo/CarBrandRepository'
import CarBrandController from '@presentation/controllers/carBrand/carBrandController'

export const createCarBrandController = () => {
  const carBrandRepository = CarBrandRepository()
  const carBrandController = CarBrandController(carBrandRepository)
  return carBrandController
}
