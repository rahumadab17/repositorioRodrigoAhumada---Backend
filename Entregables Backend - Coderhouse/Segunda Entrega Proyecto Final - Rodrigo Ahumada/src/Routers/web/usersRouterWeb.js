import { Router } from "express";
import { Usuario } from "../../../../Desafío 5/src/models/user.js";
import { onlyLoggedWeb } from "../../../../Desafío 5/src/middlewares/session.js";
import { createSalt, encriptedString } from "../../../../Desafío 5/src/config.js";
export const userRouterWeb = Router()

userRouterWeb.get('/register', (req, res) =>{
    res.render('register')
})

userRouterWeb.post('/register', async (req, res) => {
    try {
        const userExists = await Usuario.findOne({ email: req.body.email })
        if (userExists) { 
            const userExist = true
            const userMail = userExists.email
            return res.render('register', {userExist, userMail})
        }
        const salt = createSalt()
        const encripted = encriptedString(salt, req.body.password)
        
        req.body.password = encripted
        req.body.salt = salt
        const newUser = await Usuario.create(req.body)
        res.redirect('/')
    } catch (err) {
        res.redirect('/register')
    }
})

userRouterWeb.get('/profile', onlyLoggedWeb, async (req, res) => {
    const admin = (req.session['user'].level === 'admin') ? true : false
    res.render('profile', {
        titulo: 'Perfil de Usuario',
        user: req.session['user'],
        admin
    })
})