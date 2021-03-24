import { Router } from 'express'
import { adaptRoute } from '../../adapters/routesAdapter'
import { createCarBrandController } from '../../factories/carBrand'

export default (router: Router): void => {
  router.get('/carbrand', adaptRoute(createCarBrandController()))
}
