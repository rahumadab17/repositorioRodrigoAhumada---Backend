import { Router } from "express";
import { Usuario } from "../../models/user.js";
import { encriptedString } from "../../config.js";
export const sessionRouter = Router()

sessionRouter.post('/login', async (req, res) => {

    const { email, password } = req.body
    const usuario = await Usuario.findOne({ email }).lean()
    const chkPwd = encriptedString(usuario.salt, password)
    
    if (!usuario || usuario.password != chkPwd) {
        return res.status(400).json({ status: 'Error', message: 'Error al iniciar sesión' })
    }

    const userInfo = {
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido
    }

    req.session['user'] = userInfo
    res.status(201).json({ status: 'Success', message: 'Usuario Loguedao' })
})

sessionRouter.get('/', (req, res) => {
    if (req.session['user']) {
        return res.json(req.session['user'])
    }
    res.status(400).json({status: 'Error', message: 'No hay seción iniciada'})
})

sessionRouter.post('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.status(500).json({ status: 'Error', message: error })
        }
        res.status(200).json({ status: 'Success', message: 'Loguot Existoso' })
    })
})