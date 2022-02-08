import { Router } from 'express'
import { basketController } from '../controllers'
import { roleMiddleware } from '../middleware'

const basketRouter: Router = Router()

basketRouter.get('/', roleMiddleware(['admin']), basketController.get)
basketRouter.get('/current', basketController.getOne)

export default basketRouter
