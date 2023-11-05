import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  // Lógica para crear un nuevo carrito
});

router.get('/:cid', (req, res) => {
  // Lógica para listar los productos de un carrito por su ID
});

router.post('/:cid/product/:pid', (req, res) => {
  // Lógica para agregar un producto a un carrito
});

export default router;
