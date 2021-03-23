import { IConfig } from './IConfig'

const config: IConfig = {
  scraping: {
    url: process.env.SCRAPING_URL || ''
  },
  db: {
    url: 'mongodb://localhost:27017/auto-refinance_local'
  }
}

export default config
