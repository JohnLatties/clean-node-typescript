import { Router } from 'express'
import { createRefinancingProposalController } from '../../factories/refinancingProposal'
import { adaptRoute } from '../../adapters/routesAdapter'

export default (router: Router): void => {
  router.post('/proposals', adaptRoute(createRefinancingProposalController()))
}
