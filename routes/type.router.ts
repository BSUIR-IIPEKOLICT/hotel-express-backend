import { Router } from 'express'
import { typeController } from '../controllers'
import { roleMiddleware } from '../middleware'

const typeRouter: Router = Router()

typeRouter.get('/', typeController.get)
typeRouter.post('/', roleMiddleware(['admin']), typeController.create)
typeRouter.patch('/', roleMiddleware(['admin']), typeController.change)
typeRouter.delete('/', roleMiddleware(['admin']), typeController.delete)

export default typeRouter
