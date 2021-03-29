import request from 'supertest'
import app from '../../src/main/api'
import RefinancingContractRepository from '../../src/infra/data/mongo/RefinancingContractRepository'
import { MongoHelper } from '../../src/infra/data/mongo/base'

import refinancingContract from '../__mocks__/refinancingContract.json'

describe('Refinancing Contract Routes', () => {
  beforeAll(async () => {
    const MONGO_URL = process.env.MONGO_URL || ''
    await MongoHelper.connect(MONGO_URL)
    const refinancingContractRepository = RefinancingContractRepository()
    await refinancingContractRepository.add(refinancingContract)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return 404 if the refinancing contract was not found', async () => {
    const key = 'invalid'
    const result = await request(app)
      .get(`/api/contracts/${key}`)

    expect(result.status).toBe(404)
  })

  test('should return 200 if found a refinancing contract', async () => {
    const contract = refinancingContract
    const key = contract.key
    const result = await request(app)
      .get(`/api/contracts/${key}`)

    expect(result.status).toBe(200)
  })
})
