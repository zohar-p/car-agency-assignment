import express from 'express'
import path from 'path'
import cors from 'cors'
import { router } from './router'

export const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(express.static(path.join(__dirname, '/../../public')))
