import CarBrandScrapingQuery from '../../../src/application/query/carBrandScrapingQuery'

describe('Query Car Brand Scraping', () => {
  test('Should return a list of car Brands', async () => {
    const sut = CarBrandScrapingQuery()
    const result = await sut.execute()
    expect(Array.isArray(result)).toBe(true)
  })
})
