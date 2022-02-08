import { Router } from 'express'
import { serviceController } from '../controllers'
import { roleMiddleware } from '../middleware'

const serviceRouter: Router = Router()

serviceRouter.get('/', serviceController.get)
serviceRouter.post('/', roleMiddleware(['admin']), serviceController.create)
serviceRouter.patch('/', roleMiddleware(['admin']), serviceController.change)
serviceRouter.delete('/', roleMiddleware(['admin']), serviceController.delete)

export default serviceRouter
