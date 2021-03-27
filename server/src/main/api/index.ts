import express from 'express'
import cors from 'cors'
import setupRoutest from './setupRoutest'

const app = express()

app.use(express.json())
app.use(cors({ origin: '*' }))
setupRoutest(app)
export default app
