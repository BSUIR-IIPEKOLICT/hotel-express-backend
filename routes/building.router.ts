import { Router } from 'express'
import { buildingController } from '../controllers'
import { roleMiddleware } from '../middleware'

const buildingRouter: Router = Router()

buildingRouter.get('/', buildingController.get)
buildingRouter.post('/', roleMiddleware(['admin']), buildingController.create)
buildingRouter.patch('/', roleMiddleware(['admin']), buildingController.change)
buildingRouter.delete('/', roleMiddleware(['admin']), buildingController.delete)

export default buildingRouter
