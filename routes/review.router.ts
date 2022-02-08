import { Router } from 'express'
import { reviewController } from '../controllers'

const reviewRouter: Router = Router()

reviewRouter.get('/', reviewController.get)
reviewRouter.post('/', reviewController.create)
reviewRouter.patch('/', reviewController.change)
reviewRouter.delete('/', reviewController.delete)

export default reviewRouter
