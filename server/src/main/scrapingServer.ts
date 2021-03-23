import RegisterCarBrandRegisterScraping from '@domain/useCases/registerCarBrandScraping'
import { MongoHelper } from '@infra/data/mongo/base'
import CarBrandRepository from '@infra/data/mongo/CarBrandRepository'
import carBrandScrapingData from '@infra/data/scraping/CarBrandScrapingData'
import config from './config'

async function start () {
  console.log('Star scraping....')
  const carBrandRepository = CarBrandRepository()
  const registerCarBrandRegisterScraping = RegisterCarBrandRegisterScraping(carBrandScrapingData, carBrandRepository)
  const result = await registerCarBrandRegisterScraping.execute()
  if (result.Failed()) {
    console.error(result.value)
  }
  if (result.Fulfilled()) {
    console.log('-----------------------')
    console.log('Done')
    console.log('-----------------------')
  }
}

MongoHelper
  .connect(config.db.url)
  .then(async () => {
    await start()
  })
  .catch(console.error)
