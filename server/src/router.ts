import { Router } from 'express'
import { asyncHandler } from './common/async-handler'
import { createCarHandler } from './handlers/createCar.handler'
import { updateCarHandler } from './handlers/updateCar.handler'

export const router = Router()

router.get('/ping', (req, res) => {
  res.send('Pong')
})

router.post('/cars', asyncHandler(createCarHandler))
router.get('/cars', async (req, res) => {
  //@ts-ignore
  const cars = (await import('../../mocks/cars.mock.json')).default
  res.json(cars)
})
router.put('/cars/:id', asyncHandler(updateCarHandler))
