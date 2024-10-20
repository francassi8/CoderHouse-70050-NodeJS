import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const cartSchema = new Schema({
    products: [
        {
            pid: { type: Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, default: 1 }
        }
    ]
});
cartSchema.plugin(mongoosePaginate);
export const cartModel = model('Cart', cartSchema);