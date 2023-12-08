import express from 'express';
import cartsRouter from './cartsRouter.js';
import productsRouter from './productsRouter.js';

export const apiRouter = express.Router();

apiRouter.use('/carts', cartsRouter);
apiRouter.use('/products', productsRouter);
