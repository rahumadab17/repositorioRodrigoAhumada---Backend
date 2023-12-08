import { Router, json } from "express"
import { productsRouter } from "./productsRouter.js"
import { initRouter } from "./initRouter.js"
import { cartsRouter } from "./cartsRouter.js"

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use('/products', productsRouter);
apiRouter.use('/carts', cartsRouter);
apiRouter.use('/dbInit', initRouter)