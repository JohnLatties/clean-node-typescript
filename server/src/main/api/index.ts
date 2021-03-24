import express from 'express'
import setupRoutest from './setupRoutest'

const app = express()
app.use(express.json())
setupRoutest(app)
export default app
