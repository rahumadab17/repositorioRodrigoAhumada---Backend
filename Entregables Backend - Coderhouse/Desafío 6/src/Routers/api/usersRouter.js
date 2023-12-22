import { Router } from "express";
import { Usuario } from "../../models/user.js";
import { onlyLogged } from "../../middlewares/auth.js";
import { createSalt, encriptedString } from "../../config.js";

export const userRouter = Router()

userRouter.get('/profile', onlyLogged, async (req, res) => {
    const userInfo = await Usuario.findOne({ email: req.session['user'].email }, { password: 0 }).lean()
    res.status(200).json({ status: 'Success', payload: userInfo })
})

userRouter.post('/register', async (req, res) => {
    try {
        const salt = createSalt()
        const encripted = encriptedString(salt, req.body.password)
        
        req.body.password = encripted
        req.body.salt = salt
        const newUser = await Usuario.create(req.body)
        res.status(201).json({ status: "Success", payload: newUser })
    } catch (err) {
        res.status(500).json({ status: "Error", mesagge: err.mesagge })
    }
})