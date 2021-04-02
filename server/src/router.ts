import { Router } from 'express'
import { asyncHandler } from './common/async-handler'
import { createCarHandler } from './handlers/createCar.handler'
import { deleteCarHandler } from './handlers/deleteCar.handler'
import { getCarsHandler } from './handlers/getCars.handler'
import { loginHandler } from './handlers/login.handler'
import { updateCarHandler } from './handlers/updateCar.handler'

export const router = Router()

router.get('/ping', (req, res) => {
  res.send('Pong')
})

router.post('/cars', asyncHandler(createCarHandler))
router.get('/cars', asyncHandler(getCarsHandler))
router.put('/cars/:id', asyncHandler(updateCarHandler))
router.delete('/cars/:id', asyncHandler(deleteCarHandler))
router.post('/login', asyncHandler(loginHandler))
