import request from 'supertest'
import app from '../../src/main/api'
import RefinancingProposalRepository from '../../src/infra/data/mongo/RefinancingProposalRepository'
import { MongoHelper } from '../../src/infra/data/mongo/base'

import refinancingProposal from '../__mocks__/refinancingProposal.json'

describe('Refinancing Proposal Routes', () => {
  beforeAll(async () => {
    const MONGO_URL = process.env.MONGO_URL || ''
    await MongoHelper.connect(MONGO_URL)
    const refinancingProposalRepository = RefinancingProposalRepository()
    await refinancingProposalRepository.add(refinancingProposal)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return 404 if the refinancing proposal was not found', async () => {
    const key = 'invalid'
    const result = await request(app)
      .get(`/api/proposals/${key}`)

    expect(result.status).toBe(404)
  })

  test('should return 200 if found a refinancing proposal', async () => {
    const proposal = refinancingProposal
    const key = proposal.key
    const result = await request(app)
      .get(`/api/proposals/${key}`)

    expect(result.status).toBe(200)
  })
})
