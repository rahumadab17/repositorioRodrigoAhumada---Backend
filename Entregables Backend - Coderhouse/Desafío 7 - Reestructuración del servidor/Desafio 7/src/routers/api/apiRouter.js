import { Router, json, urlencoded } from 'express'
import { usersRouter } from './usersRouter.js'
import { metodosPersonalizados } from '../../middlewares/methods.js'
import { sessionsRouter } from './sessionsRouter.js'
import { errorManager } from '../../middlewares/errorManager.js'
import { cartRouter } from './cartRouter.js'
import {productsRouter} from './productsRouter.js'

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended:true}))

apiRouter.use(metodosPersonalizados)

apiRouter.use('/users', usersRouter)
apiRouter.use('/sessions', sessionsRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', cartRouter)

apiRouter.use(errorManager)