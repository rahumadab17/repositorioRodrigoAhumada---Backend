import { Router } from "express";
import { Usuario } from "../../../../Desafío 5/src/models/user.js";
import { encriptedString } from "../../../../Desafío 5/src/config.js";

export const sessionRouterWeb = Router()

sessionRouterWeb.get('/login', (req, res) => {
    res.render('login', { titulo: 'Inicio de Sesión' })
})

sessionRouterWeb.post('/login', async (req, res) => {
    const { email, password } = req.body
    const usuario = await Usuario.findOne({ email }).lean()
    if (!usuario) { 
        const retryLogin = true
        return res.render('login', {retryLogin})
    }
    const chkPwd = encriptedString(usuario.salt, password)
    if (usuario.password != chkPwd) {
        const retryLogin = true
        return res.render('login', {retryLogin})
    }

    const userInfo = {
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        level: usuario.level
    }
    const admin = (usuario.level === 'admin') ? true : false

    req.session['user'] = userInfo
    res.render('index', {titulo: 'e-commerce', user: req.session['user'], admin})
})

sessionRouterWeb.post('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.send('Algo salio mal')
        }
        res.redirect('/')
    })
})