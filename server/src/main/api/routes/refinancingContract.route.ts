import { Router } from 'express'
import {
  createFindRefinancingContractController,
  createListRefinancingContractSignedController,
  createRegisterRefinancingContractController,
  createSignRefinancingContractController
} from '../../factories/refinancingContract'
import { adaptRoute } from '../../adapters/routesAdapter'

export default (router: Router): void => {
  router.post('/contracts', adaptRoute(createRegisterRefinancingContractController()))
  router.put('/contracts/:key/sign', adaptRoute(createSignRefinancingContractController()))
  router.get('/contracts/signed/', adaptRoute(createListRefinancingContractSignedController()))
  router.get('/contracts/:key', adaptRoute(createFindRefinancingContractController()))
}
