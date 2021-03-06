import { Router } from 'express'
import { asyncHandler } from './common/async-handler'
import { createCarHandler } from './handlers/cars/create-car.handler'
import { deleteCarHandler } from './handlers/cars/delete-car.handler'
import { getCarsHandler } from './handlers/cars/get-cars.handler'
import { loginHandler } from './handlers/users/login.handler'
import { updateCarHandler } from './handlers/cars/update-car.handler'
import { createBranchHandler } from './handlers/branches/create-branch.handler'
import { getBranchesHandler } from './handlers/branches/get-branches.handler'
import { deleteBranchHandler } from './handlers/branches/delete-branch.handler'

export const router = Router()

router.get('/ping', (req, res) => res.send('Pong'))

router.post('/cars', asyncHandler(createCarHandler))
router.get('/cars', asyncHandler(getCarsHandler))
router.put('/cars/:id', asyncHandler(updateCarHandler))
router.delete('/cars/:id', asyncHandler(deleteCarHandler))

router.post('/branches', asyncHandler(createBranchHandler))
router.get('/branches', asyncHandler(getBranchesHandler))
router.delete('/branches/:id', asyncHandler(deleteBranchHandler))

router.post('/login', asyncHandler(loginHandler))
