import express from 'express'
import {ProductManager} from './productManager.js';
import path from 'path';

const rootDir = process.cwd();
const filePath = path.join(rootDir, '\\bodega.json');
console.log(filePath)

const app = express();
const port = 8080;

const productManager = new ProductManager(filePath);


app.get('/products', async (req, res) => {
  const { limit } = req.query;
  if (limit) {
    const limitedProducts = await productManager.getProducts().slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(productManager.getProducts());
  }
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = await productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});