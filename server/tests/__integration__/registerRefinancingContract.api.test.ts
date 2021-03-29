import request from 'supertest'
import app from '../../src/main/api'
import RefinancingProposalRepository from '../../src/infra/data/mongo/RefinancingProposalRepository'
import { MongoHelper } from '../../src/infra/data/mongo/base'

import refinancingProposal from '../__mocks__/refinancingProposal.json'

describe('Refinancing Proposal Routes', () => {
  beforeEach(async () => {
    const MONGO_URL = process.env.MONGO_URL || ''
    await MongoHelper.connect(MONGO_URL)
    const refinancingProposalRepository = RefinancingProposalRepository()
    await refinancingProposalRepository.add(refinancingProposal)
  })

  afterEach(async () => {
    const refinancingProposalRepository = RefinancingProposalRepository()
    await refinancingProposalRepository.delete(refinancingProposal.key)
    await MongoHelper.disconnect()
  })

  test('should return 404 if carBrandKey is invalid', async () => {
    const body = {
      proposalKey: 'invalid',
      paymentPlan: 0
    }
    const result = await request(app)
      .post('/api/contracts')
      .send(body)

    expect(result.status).toBe(400)
  })

  test('should return 200 if all data is correct', async () => {
    const body = {
      proposalKey: refinancingProposal.key,
      paymentPlan: refinancingProposal.paymentOptions[0].months
    }
    const result = await request(app)
      .post('/api/contracts')
      .send(body)

    expect(result.status).toBe(200)
  })
})
