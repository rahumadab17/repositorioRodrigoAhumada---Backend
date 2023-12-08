import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'

const cartSchema = new Schema({
    _id: { type: String, default: randomUUID },
    status: { type: Boolean, default: true},
    cart: [{ 
        productID: { type: String, ref: 'products' }, 
        cant: { type: Number }
        }]
}, {
    strict: 'throw',
        versionKey: false,
            methods: { }
})

cartSchema.pre('find', function (next) {
    this.populate('carts.$.productID')
    next()
})

export const Cart = model('carts', cartSchema)