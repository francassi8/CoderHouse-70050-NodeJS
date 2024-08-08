import { Schema, model } from "mongoose";

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

export const productModel = model('products', productSchema);