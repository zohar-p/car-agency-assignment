import { Router } from 'express'
import { createCarHandler } from './handlers/createCar.handler'

export const router = Router()

router.get('/ping', (req, res) => {
  res.send('Pong')
})

router.post('/cars', createCarHandler)

router.get('/cars', async (req, res) => {
  //@ts-ignore
  const cars = (await import('../../mocks/cars.mock.json')).default
  res.json(cars)
})
