import { Router } from 'express'
import {
  createFindRefinancingContractController,
  createRegisterRefinancingContractController
} from '../../factories/refinancingContract'
import { adaptRoute } from '../../adapters/routesAdapter'

export default (router: Router): void => {
  router.post('/contracts', adaptRoute(createRegisterRefinancingContractController()))
  router.get('/contracts/:key', adaptRoute(createFindRefinancingContractController()))
}
