import { model, Schema } from "mongoose";

const userCollection = 'user';

const userSchema = new Schema({
    nombre: String,
    apellido: String,
    email: {
        type: String,
        unique: true
    },
    edad: Number,
    password: String,
    cart: { type: Schema.Types.ObjectId, ref: 'Cart'},
    role: {type: String, default: 'user'}
})

export const UserModel = model (userCollection, userSchema)