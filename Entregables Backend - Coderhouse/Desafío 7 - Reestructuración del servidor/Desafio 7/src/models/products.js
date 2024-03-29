import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'
import mongoosePaginate from 'mongoose-paginate-v2'

const schemaProduct = new Schema ({
    _id: { type: String, default: randomUUID},
    title: { type: String, require: true },
    description: { type: String, require: true },
    code: { type: String, require: true },
    price: { type: Number, require: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, require: true },
    category: { type: String, require: true },
    image: { type: String, default: '' }
}, {
    strict: 'throw',
    versionKey: false,
})

schemaProduct.plugin(mongoosePaginate)

export const Product = model('products', schemaProduct)