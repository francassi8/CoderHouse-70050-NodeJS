import { Router } from "express";
import cartClass from '../class/Cart.js';
import { __dirname  } from '../utils.js';

const app = Router();
const cart = new cartClass(__dirname + '/data/Cart.json');

app.post('/api/carts/', async (req, res) => {
    try {
        await cart.createCart();
        res.status(201).json({ message: 'Carrito Creado!'})
    } catch (error) {
        return res.status(500).json({ error: 'Falla al crear el carrito'});
    }
})

app.get('/api/carts/', async (req, res) => {
    const cartList = await cart.getCartList();
    res.status(201).json({ resultado: cartList})
})

app.get('/api/carts/:cid', async (req, res) => {
    const cartFind = await cart.getCartByID(req.params.cid);
    res.status(201).json({ resultado: cartFind})
})

app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    try {
        await cart.addProductToCart(req.params.pid,req.params.cid);
        res.status(201).json({ message: 'item agregado a carrito!'})
    } catch (error) {
        return res.status(500).json({ error: 'Falla al agregar producto. Error: '+error.message});
    }
})

export default app;