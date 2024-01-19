import { Router } from "express";
import { Usuario } from "../../models/user.js";
import { onlyLoggedWeb } from "../../middlewares/auth.js";
import { createSalt, encriptedString } from "../../config.js";
export const userRouterWeb = Router()

userRouterWeb.get('/register', (req, res) => {
    res.render('register')
})

userRouterWeb.post('/register', async (req, res) => {
    try {
        const userExists = await Usuario.findOne({ email: req.body.email })
        if (userExists) {
            const userExist = true
            const userMail = userExists.email
            return res.render('register', { userExist, userMail })
        }
        const salt = createSalt()
        const encripted = encriptedString(salt, req.body.password)

        req.body.password = encripted
        req.body.salt = salt
        const newUser = await Usuario.create(req.body)

        req.login(newUser, error => {
            if (error) {
                res.redirect('/register')
            }
            res.redirect('/profile')

        })
    } catch (err) {
        res.redirect('/register')
    }
})

userRouterWeb.get('/profile', onlyLoggedWeb, async (req, res) => {
    // const isAdmin = (req.session['user'].level === 'admin') ? true : false
    res.render('profile', {
        titulo: 'Perfil de Usuario',
        user: req.user
        // user: req.session['user'],
        // isAdmin
    })
})