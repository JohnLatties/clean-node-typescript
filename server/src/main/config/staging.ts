import { IConfig } from './IConfig'
import dotenv from 'dotenv'
dotenv.config()

const config: IConfig = {
  scraping: {
    url: process.env.SCRAPING_URL || ''
  },
  db: {
    url: process.env.MONGO_DB_URL || ''
  }
}

export default config
