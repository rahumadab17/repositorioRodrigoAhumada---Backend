import session from 'express-session'
import connectMongo from 'connect-mongo'
import { MONGODB_STR_CNX } from '../config.js'

const store = connectMongo.create({
    mongoUrl: MONGODB_STR_CNX,
    ttl: 360
})

export const activeSession = session({
    store,
    secret: 'SecretCode',
    resave: true,
    saveUninitialized: true
})

export function onlyLogged (req, res, next) {
    if (!req.session['user']) {
        return res.status(400).json({status: 'Error', message: 'Inicie Sesión'})
    }
    next()
}

export function onlyLoggedWeb (req, res, next) {
    if (!req.session['user']) {
        return res.redirect('/')
    }
    next()
}