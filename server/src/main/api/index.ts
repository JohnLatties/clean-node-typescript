import express from 'express'
import cors from 'cors'
import setupRoutest from './setupRoutest'

const app = express()
app.use(cors())
app.use(express.json())
setupRoutest(app)
export default app
