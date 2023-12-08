import express from 'express';
import { Product } from '../models/productsMongoose.js';

export const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  let opciones = {}
  const filtro = (!req.query.filtro) ?  '' : { category: req.query.filtro }
  const itemsPorPagina = (!req.query.itemsPorPagina) ? opciones = { limit: 10, ...opciones } : opciones = { limit: req.query.itemsPorPagina, ...opciones }
  const pagina = (!req.query.pagina) ? opciones = { page: 1, ...opciones } : opciones = { page: req.query.pagina, ...opciones }
  const orden = (!req.query.order) ? '' : opciones = { sort: { 'price': req.query.order }, ...opciones }
  const paginado = await Product.paginate(filtro, opciones)
  const results = {
      status: 'success',
      payload: paginado.docs,
      totalPages: paginado.totalPages,
      prevPage: paginado.prevPage,
      nextPage: paginado.nextPage,
      page: paginado.page,
      hasPrevPage: paginado.hasPrevPage,
      hasNextPage: paginado.hasNextPage,
      prevLink: '',
      nextLink: ''
  }

  res.json(results)
  // const productos = await Producto.find()
  // res.json(productos)
})

productsRouter.get('/cat/', async (req, res) => {
  const categoryProducto = await Product.aggregate([
      { $group: {_id: "$category"}}
  ])
  res.json (categoryProducto)
})

productsRouter.get('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const product = await Product.findById(productId);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: `Producto ${productId} no encontrado` });
  }
});

productsRouter.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await Product.create(newProduct);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al intentar agregar el producto');
  }
});

productsRouter.put('/:pid', async (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  try {
    await Product.updateById(productId, updatedProduct);
    res.status(200).json({ message: 'Producto actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al editar el producto de id ${productId}`);
  }
});

productsRouter.delete('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    await Product.deleteById(productId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al eliminar el producto de id ${productId}`);
  }
});