import { MongoHelper } from '@infra/data/mongo/base'
import config from './config'

MongoHelper.connect(config.db.url)
  .then(async () => {
    const app = (await import('./api')).default
    const port = process.env.PORT || 3002
    app.listen(port, () => { console.log(`Server running at http://localhost:${port}`) })
  })
  .catch(console.error)
