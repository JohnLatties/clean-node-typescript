import dev from './dev'
import staging from './staging'
import production from './production'
import { IConfig } from './IConfig'

function getConfig (): IConfig {
  const env = process.env.NODE_ENV
  switch (env) {
    case 'production':
      return production
    case 'staging':
      return staging
    default:
      return dev
  }
}

export default { ...getConfig() }
