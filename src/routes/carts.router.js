import { Router } from "express";
import cartDao from '../dao/class/Cart.dao.js';
import { cartModel } from '../dao/model/cart.model.js';
import { invokePassport } from "../middlewares/handleErrors.js";
import { soloUser } from "../middlewares/authorization.js";

const app = Router();
const cartDaoInstance = new cartDao();

app.post('/', invokePassport('jwt'), async (req, res) => {
    try {
        await cartDaoInstance.createCart();
        res.status(201).json({ message: 'Carrito Creado!'})
    } catch (error) {
        return res.status(500).json({ error: 'Falla al crear el carrito'});
    }
})

app.get('/', invokePassport('jwt'), async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = '', ...query } = req.query;
        const sortManager = {
            'asc' : 1,
            'desc' : -1
        };

        const filter = {};

        for (const [key, value] of Object.entries(query)) {
            if (key in cartModel.schema.paths) {
                if (typeof value === 'string') {
                    filter[key] = { $regex: value, $options: 'i' };
                } else {
                    filter[key] = value;
                }
            }
        }

        const cartList = await cartDaoInstance.getCartList(filter, limit, page, sort);
        res.status(200).json({ status: "success", resultado: cartList });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

app.get('/:cid', invokePassport('jwt'), async (req, res) => {
    try {
        const cartFind = await cartDaoInstance.getCartByID(req.params.cid);
        if (!cartFind) {
            return res.status(404).json({ status: "error", message: "carrito no encontrado" });
        }
        res.status(201).json({ status: "success", resultado: cartFind})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

app.get('/:cid', invokePassport('jwt'), async (req, res) => {
    try {
        const cart = await cartDaoInstance.getCartByID(req.params.cid);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

app.post('/:cid/product/:pid', invokePassport('jwt'), soloUser, async (req, res) => {
    try {
        await cartDaoInstance.addProductToCart(req.params.pid,req.params.cid);
        res.status(201).json({ status: "success", message: 'item agregado a carrito!'})
    } catch (error) {
        return res.status(500).json({ status: "error", error: 'Falla al agregar producto. Error: '+error.message});
    }
})

app.delete('/:cid/product/:pid', invokePassport('jwt'), async (req, res) => {
    try {
        await cartDaoInstance.removeProductFromCart(req.params.pid,req.params.cid);
        res.status(201).json({ message: 'item eliminado del carrito!'})
    } catch (error) {
        return res.status(500).json({ error: 'Falla al eliminar producto. Error: '+error.message});
    }
})

export default app;