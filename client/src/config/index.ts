import dotenv from 'dotenv'
dotenv.config()

export default {
  BASE_URL: process.env.API_URL || 'http://localhost:3002/'
}