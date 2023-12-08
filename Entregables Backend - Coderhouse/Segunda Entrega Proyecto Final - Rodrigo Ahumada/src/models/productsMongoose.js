import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
    _id: { type: String, default: randomUUID },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, required: true }
}, {
    versionKey: false,
    strict: 'throw'
})

productSchema.plugin(mongoosePaginate)

export const Product = model('products', productSchema)