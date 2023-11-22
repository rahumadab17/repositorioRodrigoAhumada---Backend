import express from "express";
import { ProductManager } from "../productManager.js";

const productManager = new ProductManager

export const webRouter = express.Router()

webRouter.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.render('home', { products: products }); 
})

webRouter.get('/realTimeProducts', (req, res) => {
    const products = productManager.getProducts();
    res.render('realTimeProducts', { products: products });
  });

webRouter.post('/realTimeProducts', (req, res) => {
  try {
    const newProduct = req.body;
    productManager.addProduct(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.send('Error al intentar agregar el producto')
  }
});

webRouter.put('/:pid', (req, res) => {
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

webRouter.delete('/:pid', (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    productManager.deleteProduct(productId);
    res.status(204).send();
    console.log('Producto eliminado satisfactoriamente')
  } catch (error) {
    res.send(`Error al eliminar el producto de id ${pid}`)
  }
});
