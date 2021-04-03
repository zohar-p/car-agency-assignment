import cors from 'cors'
import express from 'express'
import path from 'path'
import { errorHandler } from './middleware/error_handler'
import { router } from './router'
require('express-async-errors')
import { NotFoundError } from './errors/not-found.err'

export const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(express.static(path.join(__dirname, '/client')))
app.all('*', () => { throw new NotFoundError('Endpoint not found') })

app.use(errorHandler)
