import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    stock: Number,
    category: String,
    status: {
        type: Boolean,
        default: true
    }
})
productSchema.plugin(mongoosePaginate);
export const productModel = model('products', productSchema);