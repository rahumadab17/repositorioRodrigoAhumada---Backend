import { Schema, model } from 'mongoose'

const bicicletasSchema = new Schema({
    _id: { type: String, required: true },
    marca: { type: String, required: true },
    categoria: { type: String, required: true }
}, {
    strict: 'throw',
    versionKey: false,
    statics: {},
    methods: {}
})

export const dbBicicletas = model('bicicletas', bicicletasSchema)

//-bicicletas (venta)
//id: String
//marcas: String
//categorias: String
