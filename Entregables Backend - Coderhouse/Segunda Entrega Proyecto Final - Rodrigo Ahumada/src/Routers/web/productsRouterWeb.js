import { Router } from 'express'
import { Product } from '../../../../Desafío 5/src/models/products.js'

export const productsRouter = Router()

productsRouter.get('/products', async (req, res) => {
    if (!req.session['user']) {
        return res.redirect('/')
    }
    console.log(req.query)
    let opciones = {}
    const filtro = (!req.query.filtro) ? '' : { category: req.query.filtro }
    const itemsPorPagina = (!req.query.itemsPorPagina) ? opciones = { limit: 10, ...opciones } : opciones = { limit: req.query.itemsPorPagina, ...opciones }
    const pagina = (!req.query.pagina) ? opciones = { page: 1, ...opciones } : opciones = { page: req.query.pagina, ...opciones }
    const orden = (!req.query.order) ? '' : opciones = { sort: { 'price': req.query.order }, ...opciones }
    opciones = { lean: true, ...opciones }
    const paginado = await Product.paginate(filtro, opciones)
    const pagesNavBar = []
    for (let i = 1; i <= paginado.totalPages; i++) {
        const page = i
        const status = (i === paginado.page) ? 'active' : ''
        pagesNavBar.push({ page, status })
    }

    const results = {
        status: 'success',
        payload: paginado.docs,
        totalPages: paginado.totalPages,
        prevPage: paginado.prevPage,
        nextPage: paginado.nextPage,
        page: paginado.page,
        hasPrevPage: paginado.hasPrevPage,
        hasNextPage: paginado.hasNextPage,
        prevLink: `/?pagina=${paginado.prevPage}`,
        nextLink: `/?pagina=${paginado.nextPage}`,
        navBar: pagesNavBar
    }
    const admin = (req.session['user'].level === 'admin') ? true : false
    res.render('productos', {
        titulo: 'Lista de Productos',
        results: results,
        user: req.session['user'],
        admin
    })
})

productsRouter.get('/init', async (req, res) => {
    const dataSet = [
        { title: "Satiro Breezer", description: "Satiro Breezer Gravel/Urban 1x10", price: 999990, category: "Gravel", thumbnail: "Satirobreezer.jpg", code: "satirobr", stock: 10, status: true},
        { title: "Trek Marlin 5", description: "Trek Marlin 5 3x7", price: 399990, category: "MTB", thumbnail: "marlin5.jpg", code: "m5", stock: 10, status: true},
        { title: "Cube Attain", description: "Cube Attain Ruta 3x11", price: 1299990, category: "Ruta", thumbnail: "cubeattain.jpg", code: "cattain1", stock: 7, status: true},
        { title: "Giant Revolt 1 MY22", description: "Giant Revolt 1 MY22 2x10", price: 1249990, category: "Gravel", thumbnail: "grevolt1", code: "gr1", stock: 15, status: true},
        { title: "Oxford Orion 5", description: "Oxford Orion 5 3x7", price: 599990, category: "MTB", thumbnail: "oorion5", code: "oxfo5", stock: 15, status: true},
        { title: "Trek Marlin 7", description: "Trek Marlin 7 3x9", price: 599990, category: "MTB", thumbnail: "marlin7.jpg", code: "m7", stock: 5, status: true}
    ] 
    await Product.deleteMany()
    await Product.insertMany(dataSet)
    res.send('Base de datos creada')

})