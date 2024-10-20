import { Router } from "express";
import { productModel } from "../dao/model/product.model.js";

const app = Router();

app.get('/', async (req, res) => {
    try {
        const listaProductos = await productModel.find().lean(); 
        res.render('home', { listaProductos });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default app;