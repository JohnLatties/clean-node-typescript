import request from 'supertest'
import app from '../../src/main/api'
import RefinancingContractRepository from '../../src/infra/data/mongo/RefinancingContractRepository'
import { MongoHelper } from '../../src/infra/data/mongo/base'

import refinancingContractList from '../__mocks__/refinancingContractList.json'

describe('List Refinancing Contract Signed Routes', () => {
  beforeEach(async () => {
    const MONGO_URL = process.env.MONGO_URL || ''
    await MongoHelper.connect(MONGO_URL)
    const refinancingContractRepository = RefinancingContractRepository()
    for (const item of refinancingContractList) {
      await refinancingContractRepository.add(item)
    }
  })

  afterEach(async () => {
    const refinancingContractRepository = RefinancingContractRepository()
    for (const item of refinancingContractList) {
      await refinancingContractRepository.delete(item.key)
    }

    await MongoHelper.disconnect()
  })

  test('should return 200 with a list of signed contracts', async () => {
    const result = await request(app)
      .get('/api/contracts/signed/')

    const signed = refinancingContractList.filter(item => item.signed)

    expect(result.status).toBe(200)
    expect(result.body.length).toBe(signed.length)
  })
})
