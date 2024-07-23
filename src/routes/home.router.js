import { Router } from "express";
import { product } from "../app.js";

const app = Router();

app.get('/', async (req,res) => {
    const listaProductos = await product.getProductList()
    res.render('home', {listaProductos})
})

export default app;