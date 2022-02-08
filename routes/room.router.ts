import { Router } from 'express'
import { roomController } from '../controllers'
import { roleMiddleware } from '../middleware'

const roomRouter: Router = Router()

roomRouter.get('/', roomController.get)
roomRouter.post('/', roleMiddleware(['admin']), roomController.create)
roomRouter.patch('/', roleMiddleware(['admin']), roomController.change)
roomRouter.delete('/', roleMiddleware(['admin']), roomController.delete)

export default roomRouter
