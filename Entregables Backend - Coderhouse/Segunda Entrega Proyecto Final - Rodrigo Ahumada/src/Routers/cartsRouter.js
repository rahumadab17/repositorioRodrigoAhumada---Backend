import express from 'express'
import { Cart } from '../models/cartsMongoose.js';

export const cartsRouter = express.Router();

cartsRouter.get('/', async (req, res) => {

  const carts = await Cart.find().populate('cart.productID')
  res.json(carts)
})

cartsRouter.get('/activeCarts', async (req, res) => {

  const cart = await Cart.aggregate([
      { $match: { "status": true } },
      { $unwind: "$cart" },
      {
          $lookup: {
              from: "products",
              localField: "cart.productID",
              foreignField: "_id",
              as: 'dataProduct'
          }
      },
      { $unwind: "$dataProduct" },
      {
          $group: {
              _id: "$_id",
              total: { $sum: { $multiply: ["$cart.cant", "$dataProduct.price"] } }
          }
      },
      {
          $project: {
              _id: 1,
              total: 1
          }
      }

  ])
  res.json(cart)
})


cartsRouter.get('/:cid', async (req, res) => {
  const cartById = await Cart.findById(req.params.cid).populate('cart.productID')
  if (!cartById) {
      return res.status(404).json({ message: 'El carrito buscado no existe en la base de datos' })
  }
  res.json(cartById)
})

cartsRouter.post('/', async (req, res) => {
  try {
      const newCart = await Cart.create(req.body)
      res.status(201).json(newCart)
  } catch (error) {
      res.status(401).json({ message: error.message })
  }
})

cartsRouter.put('/:cid/producto/:pid', async (req, res) => {
  const cant = req.body.cant
  const product = await Cart.findByIdAndUpdate(
      req.params.cid,
      { $set: { "cart.$[elem].cant": cant }},
      { arrayFilters: [{ "elem._id": req.params.pid }]},
      { new: true }
  )
  res.status(201).json({ message: 'Producto Actualizado', info: product})
})

cartsRouter.put('/:cid/add/:pid', async (req, res) => {
  const createdCart = await Cart.findById(req.params.cid)
  if (!createdCart) {
      res.json({message: "not found"})
      return
  }
  const availableProduct = await Cart.find({
      _id: req.params.cid,
      cart: { $elemMatch: { productID: req.params.pid } }
  })

  if (availableProduct.length > 0) {
      const updateProduct = await Cart.findByIdAndUpdate(
          req.params.cid,
          { $inc: { "cart.$[elem].cant": 1 }},
          { arrayFilters: [{ "elem.productID": req.params.pid }]},
          { new: true }
      )
      res.status(201).json({ message: 'Producto Actualizado', info: updateProduct })        
  } else {
      const addProduct = await Cart.findByIdAndUpdate(
          req.params.cid,
          { $push: { cart: { productID: req.params.pid, cant: 1 } } },
          { new: true }
      ).lean()
      res.status(201).json({ message: 'Producto Agregado', info: addProduct })        
  }
})

cartsRouter.delete('/:cid', async (req, res) => {
  const delCart = await Cart.findByIdAndDelete(
      req.params.cid,
      { new: true }
  )
  if (!delCart) {
      return res.status(401).json(`El cart con ID ${req.params.cid} no existe`)
  }
  res.status(201).json({ message: 'Cart Eliminado', info: delCart })
})

cartsRouter.delete('/:cid/producto/:pid', async (req, res) => {
  const delProdInCart = await Cart.findByIdAndUpdate(
      req.params.cid,
      { $pull: { cart: { _id: req.params.pid } } },
      { new: true }
  )
  if (!delProdInCart) {
      return res.status(401).json(`El producto con ID ${req.params.pid} no existe en el cart ${req.params.cid}`)
  }
  res.status(201).json({ message: 'Producto Eliminado del cart', info: delProdInCart })
})
