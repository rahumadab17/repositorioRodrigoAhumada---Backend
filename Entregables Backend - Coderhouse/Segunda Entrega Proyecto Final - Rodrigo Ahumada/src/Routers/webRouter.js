import { Router } from 'express';

export const webRouter = Router()

webRouter.get ('/', (req, res) => {
    res.render ('index', {titulo: 'CoderHouse - Backend - Preentrega II'})
})

webRouter.get('/products', (req, res) => {
    res.render('products')
})

webRouter.get('/cart', (req, res) => {
    res.render('cart')
})