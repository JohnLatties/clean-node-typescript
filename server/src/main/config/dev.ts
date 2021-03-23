import { IConfig } from './IConfig'
import dotenv from 'dotenv'
dotenv.config()

const config: IConfig = {
  scraping: {
    url: process.env.SCRAPING_URL || ''
  },
  db: {
    url: 'mongodb://localhost:27017/auto-refinance_local'
  }
}

export default config
