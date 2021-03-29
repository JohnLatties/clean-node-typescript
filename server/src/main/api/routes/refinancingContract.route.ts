import { Router } from 'express'
import {
  createFindRefinancingContractController,
  createRegisterRefinancingContractController,
  createSignRefinancingContractController
} from '../../factories/refinancingContract'
import { adaptRoute } from '../../adapters/routesAdapter'

export default (router: Router): void => {
  router.post('/contracts', adaptRoute(createRegisterRefinancingContractController()))
  router.put('/contracts/:key/sign', adaptRoute(createSignRefinancingContractController()))
  router.get('/contracts/:key', adaptRoute(createFindRefinancingContractController()))
}
