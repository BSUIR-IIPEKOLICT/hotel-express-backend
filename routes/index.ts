import { Router } from 'express'
import buildingRouter from './building.router'
import serviceRouter from './service.router'
import typeRouter from './type.router'
import roomRouter from './room.router'
import orderRouter from './order.router'
import basketRouter from './basket.router'
import userRouter from './user.router'
import reviewRouter from './review.router'

const apiRouter: Router = Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/building', buildingRouter)
apiRouter.use('/type', typeRouter)
apiRouter.use('/service', serviceRouter)
apiRouter.use('/room', roomRouter)
apiRouter.use('/basket', basketRouter)
apiRouter.use('/order', orderRouter)
apiRouter.use('/review', reviewRouter)

export default apiRouter
