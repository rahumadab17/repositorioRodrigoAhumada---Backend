import { Router, json, urlencoded } from "express";
import { sessionRouterWeb } from "./sessionRouterWeb.js";
import { userRouterWeb } from "./usersRouterWeb.js";
import { productsRouter } from "../web/productsRouterWeb.js";

export const webRouter = Router()

webRouter.use(json())
webRouter.use(urlencoded({ extended: true }))

webRouter.use(sessionRouterWeb)
webRouter.use(userRouterWeb)
webRouter.use(productsRouter)

webRouter.get('/', (req, res) => {
    if (!req.session['user']) {
        res.render('login', {titulo: 'Sign In'})
    } else {
        const isAdmin = (req.session['user'].level === 'admin') ? true : false
        res.render('index', {titulo: 'e-commerce', user: req.session['user'], isAdmin})
    }
})
