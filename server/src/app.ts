import express from 'express'
import { join } from 'path'
import cors from 'cors'
import { router } from './router'

export const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(join(__dirname, 'public')))
app.use(router)
