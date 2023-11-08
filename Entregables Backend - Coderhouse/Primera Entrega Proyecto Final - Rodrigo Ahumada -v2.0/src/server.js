import express from 'express';
import { ProductManager } from './productManager.js';
import { CartManager } from './cartManager.js';
import { productsRouter } from './Routers/productsRouter.js';
import { cartsRouter } from './Routers/cartsRouter.js';

const port = 8080;

const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});