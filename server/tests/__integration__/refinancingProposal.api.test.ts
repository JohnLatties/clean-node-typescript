import request from 'supertest'
import app from '../../src/main/api'
import CarBrandRepository from '../../src/infra/data/mongo/CarBrandRepository'
import AprRepository from '../../src/infra/data/mongo/AprRepository'
import { MongoHelper } from '../../src/infra/data/mongo/base'

import carbrandsMock from '../__mocks__/carbrands.json'

describe('Refinancing Proposal Routes', () => {
  beforeAll(async () => {
    const MONGO_URL = process.env.MONGO_URL || ''
    await MongoHelper.connect(MONGO_URL)
    const carBrandRepository = CarBrandRepository()
    await carBrandRepository.addMany(carbrandsMock)

    const aprRepository = AprRepository()
    await aprRepository.add({ value: 5, createdAt: new Date('2021-03-01T22:50:39.228Z') })
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return 404 if carBrandKey is invalid', async () => {
    const body = {
      carBrandKey: 'invalid',
      carKey: 'invalid'
    }
    const result = await request(app)
      .post('/api/proposals')
      .send(body)

    expect(result.status).toBe(400)
  })

  test('should return 200 if all data is correct', async () => {
    const carBrand = carbrandsMock[0]
    const body = {
      carBrandKey: carBrand.key,
      carKey: carBrand.cars[0].key
    }
    const result = await request(app)
      .post('/api/proposals')
      .send(body)

    expect(result.status).toBe(200)
  })
})
