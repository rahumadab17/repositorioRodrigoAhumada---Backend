import express from 'express';
import ProductManager from '../productManager.js';

const router = express.Router();
const productManager = new ProductManager('productos.json');

router.get('/', (req, res) => {
    const { limit } = req.query;
  if (limit) {
    const limitedProducts = productManager.getProducts().slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(productManager.getProducts());
  }
});

router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  productManager.addProduct(newProduct);
  res.status(201).json(newProduct);
});


router.put('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body;
  productManager.updateProduct(productId, updatedProduct);
  res.status(200).json({ message: 'Producto actualizado' });
});
  

router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  productManager.deleteProduct(productId);
  res.status(204).send();
});

export default router;
