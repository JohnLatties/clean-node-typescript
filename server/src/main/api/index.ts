import express from 'express'
import setupRoutest from './setupRoutest'

const app = express()
setupRoutest(app)
export default app
