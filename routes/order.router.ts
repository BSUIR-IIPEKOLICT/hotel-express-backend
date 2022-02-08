import { Router } from 'express'
import { orderController } from '../controllers'

const orderRouter: Router = Router()

orderRouter.get('/', orderController.get)
orderRouter.post('/', orderController.create)
orderRouter.delete('/', orderController.delete)

export default orderRouter
