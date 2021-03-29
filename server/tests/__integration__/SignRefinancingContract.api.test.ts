import request from 'supertest'
import app from '../../src/main/api'
import RefinancingContractRepository from '../../src/infra/data/mongo/RefinancingContractRepository'
import { MongoHelper } from '../../src/infra/data/mongo/base'

import refinancingContract from '../__mocks__/refinancingContract.json'

describe('Sign Refinancing Contract Routes', () => {
  beforeEach(async () => {
    const MONGO_URL = process.env.MONGO_URL || ''
    await MongoHelper.connect(MONGO_URL)
    const refinancingContractRepository = RefinancingContractRepository()
    await refinancingContractRepository.add(refinancingContract)
  })

  afterEach(async () => {
    const refinancingContractRepository = RefinancingContractRepository()
    await refinancingContractRepository.delete(refinancingContract.key)
    await MongoHelper.disconnect()
  })

  test('should return 404 if found some errot to sign contract', async () => {
    const key = 'invalid'
    const result = await request(app)
      .put(`/api/contracts/${key}/sign`)

    expect(result.status).toBe(404)
    expect(result.body.error).toMatch(/Unable to sign the contract./)
  })

  test('should return 200 if found a refinancing contract', async () => {
    const contract = refinancingContract
    const key = contract.key
    const result = await request(app)
      .put(`/api/contracts/${key}/sign`)

    expect(result.status).toBe(200)
    expect(result.body).toBe(refinancingContract.key)
  })
})
