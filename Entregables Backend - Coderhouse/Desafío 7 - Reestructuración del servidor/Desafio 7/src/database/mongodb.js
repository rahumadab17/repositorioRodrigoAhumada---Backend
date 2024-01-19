import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../config/config.js'

export async function connectMongoDb() {
    await mongoose.connect(MONGODB_CNX_STR)
    console.log(`Conectado a la base de datos en: ${MONGODB_CNX_STR}`)
}