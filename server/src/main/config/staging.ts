import { IConfig } from './IConfig'

const config: IConfig = {
  scraping: {
    url: process.env.SCRAPING_URL || ''
  },
  db: {
    url: process.env.MONGO_URL || ''
  }
}

export default config
