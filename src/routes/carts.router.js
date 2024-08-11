import { Router } from "express";
import cartClass from '../class/Cart.js';
import { __dirname  } from '../utils.js';

const app = Router();
const cart = new cartClass(__dirname + '/data/Cart.json', __dirname + '/data/Products.json');

app.post('/', async (req, res) => {
    try {
        await cart.createCart();
        res.status(201).json({ message: 'Carrito Creado!'})
    } catch (error) {
        return res.status(500).json({ error: 'Falla al crear el carrito'});
    }
})

app.get('/', async (req, res) => {
    try {
        const cartList = await cart.getCartList();
        res.status(201).json({ resultado: cartList})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

app.get('/:cid', async (req, res) => {
    try {
        const cartFind = await cart.getCartByID(req.params.cid);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "carrito no encontrado" });
        }
        res.status(201).json({ status: "success", resultado: cartFind})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

app.get('/:cid', async (req, res) => {
    try {
        const cart = await cartModel.findById(req.params.cid).populate('products.pid');
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

app.post('/:cid/product/:pid', async (req, res) => {
    try {
        await cart.addProductToCart(req.params.pid,req.params.cid);
        res.status(201).json({ message: 'item agregado a carrito!'})
    } catch (error) {
        return res.status(500).json({ error: 'Falla al agregar producto. Error: '+error.message});
    }
})

app.delete('/:cid/product/:pid', async (req, res) => {
    try {
        await cart.removeProductFromCart(req.params.pid,req.params.cid);
        res.status(201).json({ message: 'item eliminado del carrito!'})
    } catch (error) {
        return res.status(500).json({ error: 'Falla al eliminar producto. Error: '+error.message});
    }
})

export default app;