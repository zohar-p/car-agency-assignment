import express from 'express'
import path from 'path'
import cors from 'cors'
import { router } from './router'
import mongoose from 'mongoose'
const { MONGO_CONNECTION_STRING } = process.env

export const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(express.static(path.join(__dirname, '/../../public')))

if (!MONGO_CONNECTION_STRING) { throw new Error('Mongo connection string is missing from env vars')}
mongoose.connect(
  MONGO_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) { throw err }
    console.log('Connected to Mongo successfully')
  }
)
