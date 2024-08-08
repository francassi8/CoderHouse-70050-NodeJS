import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            pid: { type: Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, default: 1 }
        }
    ]
});

export const cartModel = model('Cart', cartSchema);