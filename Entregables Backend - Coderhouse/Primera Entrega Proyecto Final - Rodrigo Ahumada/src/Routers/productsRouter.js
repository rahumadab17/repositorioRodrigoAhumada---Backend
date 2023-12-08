import express from 'express'
import { productManager } from '../server.js';

export const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
    const { limit } = req.query;
  if (limit) {
    const limitedProducts = productManager.getProducts().slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(productManager.getProducts());
  }
});

productsRouter.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: `Producto ${pid} no encontrado` });
  }
});

productsRouter.post('/', (req, res) => {
  try {
    const newProduct = req.body;
    productManager.addProduct(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.send('Error al intentar agregar el producto')
  }
});


productsRouter.put('/:pid', (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const updatedProduct = req.body;
    productManager.updateProduct(productId, updatedProduct);
    res.status(200).json({ message: 'Producto actualizado' });
  } catch (error) {
    console.log(error);
    res.send(`Error al editar el producto de id ${pid}`)
  }
});
  

productsRouter.delete('/:pid', (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    productManager.deleteProduct(productId);
    res.status(204).send();
  } catch (error) {
    res.send(`Error al eliminar el producto de id ${pid}`)
  }

});