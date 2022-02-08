import { Router } from 'express'
import { userController } from '../controllers'
import { authMiddleware, roleMiddleware } from '../middleware'

const userRouter: Router = Router()

userRouter.get('/', roleMiddleware(['admin']), userController.getAll)
userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.post('/auth', authMiddleware, userController.auth)
userRouter.patch('/', roleMiddleware(['admin']), userController.changeRole)
userRouter.delete('/', roleMiddleware(['admin']), userController.delete)

export default userRouter
