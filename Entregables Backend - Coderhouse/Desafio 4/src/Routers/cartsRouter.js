import express from 'express'
import { cartManager } from '../server.js';

export const cartsRouter = express.Router();

cartsRouter.post('/', (req, res) => {
  try {
    const cart = cartManager.newCart()
    res.json(cart)
  } catch (error) {
    console.log(error); // Agrega este console.log para obtener información sobre el error
    res.send('Error al crear este carrito')
  }
});

cartsRouter.get('/:cid', (req, res) => {
  const {cid} = req.params;
  try {
      const cart = cartManager.getCartProducts(Number(cid));
      res.json (cart)
  } catch (error) {
      res.send('Error al intentar enviar los productos del carrito')
  }
})

cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const {cid, pid} = req.params
  try {
    cartManager.addProductToCart(Number(cid), pid);
    res.send('Producto agregado exitosamente')
  } catch (error) {
    console.log(error)
    res.send('Error al intentar guardar producto en el carrito')
  }
})

