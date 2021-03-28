import { Router } from 'express'
import { createFindRefinancingProposalController, createRegisterRefinancingProposalController } from '../../factories/refinancingProposal'
import { adaptRoute } from '../../adapters/routesAdapter'

export default (router: Router): void => {
  router.post('/proposals', adaptRoute(createRegisterRefinancingProposalController()))
  router.get('/proposals/:key', adaptRoute(createFindRefinancingProposalController()))
}
