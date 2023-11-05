import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/carritoRouter.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

app.use('/api/products', productRouter);
app.use('/api/carrito', cartRouter);

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});