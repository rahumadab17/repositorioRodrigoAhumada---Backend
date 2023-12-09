import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'

const cartSchema = new Schema({
    _id: { type: String, default: randomUUID },
    cart: [{ 
        productID: { type: Schema.Types.ObjectId, ref: 'products' }, // Cambiado de 'productID' a 'product'
        cant: { type: Number }
    }]
}, {
    strict: 'throw',
    versionKey: false,
    methods: {}
});

cartSchema.pre('find', function (next) {
    this.populate('cart.productID')
    next()
})

export const Cart = model('carts', cartSchema)