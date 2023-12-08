import { Schema, model } from 'mongoose'

const clientesSchema = new Schema({
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true }
}, {
    strict: 'throw',
    versionKey: false,
    statics: {},
    methods: {}
})

export const dbClientes = model('clientes', clientesSchema)

//-clientes 
//id: String
//nombre: String
//telefono: String
//email: String
