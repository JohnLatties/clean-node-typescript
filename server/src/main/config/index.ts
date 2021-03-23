import dotenv from 'dotenv'
import dev from './dev'
import staging from './staging'
import production from './production'
import { IConfig } from './IConfig'
dotenv.config()

function getConfig (): IConfig {
  const env = process.env.NODE_ENV
  const config = () => {
    switch (env) {
      case 'production':
        return production
      case 'staging':
        return staging
      default:
        return dev
    }
  }
  return config()
}

export default getConfig()
