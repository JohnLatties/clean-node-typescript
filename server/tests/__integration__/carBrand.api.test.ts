import request from 'supertest'
import app from '../../src/main/api'
import CarBrandRepository from '../../src/infra/data/mongo/CarBrandRepository'
import { MongoHelper } from '../../src/infra/data/mongo/base'

import carbrandsMock from '../__mocks__/carbrands.json'

describe('Register Routes', () => {
  beforeAll(async () => {
    const MONGO_URL = process.env.MONGO_URL || ''
    console.log('process.env.MONGO_URL', MONGO_URL)
    await MongoHelper.connect(MONGO_URL)
    const carBrandRepository = CarBrandRepository()
    await carBrandRepository.addMany(carbrandsMock)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return car brands on success', async () => {
    await request(app)
      .get('/api/carbrands')
      .expect(200)
      .then(res => {
        expect(carbrandsMock.length).toBe(res.body.length)
      })
  })
})
