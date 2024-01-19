import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'

const schemaCart = new Schema({
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

schemaCart.pre('find', function (next) {
    this.populate('cart.$.productID')
    next()
})

export const Cart = model('cart', schemaCart)