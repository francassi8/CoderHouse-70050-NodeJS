import { Router } from "express";
import { cartsRepo, ticketsRepo, productsRepo } from '../repositories/index.js';
import { cartModel } from '../dao/model/cart.model.js';
import { invokePassport } from "../middlewares/handleErrors.js";
import { soloUser } from "../middlewares/authorization.js";

const app = Router();

app.post('/:uid', invokePassport('jwt'), async (req, res) => {
    try {
        const userID = req.user._id;
        const newCart = await cartsRepo.createCart(userID);
        return res.status(200).json({ message: 'Carrito Creado!', result: newCart });
    } catch (error) {
        return res.status(500).json({ error: error.message });
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

        const cartList = await cartsRepo.getCartList(filter, limit, page, sort);
        res.status(200).json({ status: "success", resultado: cartList });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

app.get('/:cid', invokePassport('jwt'), async (req, res) => {
    try {
        const cartFind = await cartsRepo.getCartByID(req.params.cid);
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
        const cart = await cartsRepo.getCartByID(req.params.cid);
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
        await cartsRepo.addProductToCart(req.params.pid,req.params.cid);
        res.status(201).json({ status: "success", message: 'item agregado a carrito!'})
    } catch (error) {
        return res.status(500).json({ status: "error", error: 'Falla al agregar producto. Error: '+error.message});
    }
})

app.delete('/:cid/product/:pid', invokePassport('jwt'), async (req, res) => {
    try {
        await cartsRepo.removeProductFromCart(req.params.pid,req.params.cid);
        res.status(201).json({ message: 'item eliminado del carrito!'})
    } catch (error) {
        return res.status(500).json({ error: 'Falla al eliminar producto. Error: '+error.message});
    }
})

app.post('/:cid/purchase', invokePassport('jwt'), soloUser, async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartsRepo.getCartByID(cid);
      if (!cart) {
        return res.status(500).json({ error: 'Carrito no encontrado' });
      }
      const products = await ticketsRepo.getProductsInCart(cart);
      let processedProducts = [];
      let unprocessedProducts = [];
      for (const product of products) {
        if (product.pid.stock >= product.quantity) {
            const updatedProduct = await productsRepo.updateStock(product.pid, product.quantity);
            await cartsRepo.removeProductFromCart(product.pid._id,cid,true);
            processedProducts.push({
                pid: product.pid,
                quantity: product.quantity,
                name: product.name,
                price: product.price,
                stock: updatedProduct.stock,
            });
        } else {
          unprocessedProducts.push(product);
        }
      }
      if (processedProducts.length > 0) {
        const ticket = await ticketsRepo.createTicket(cart, processedProducts);
        return res.status(201).json({ status: 'success', message: 'Compra Procesada!', ticket , processedProducts});
      } else {
        return res.status(200).json({ status: 'success', message: 'Compra no procesada', unprocessedProducts });
      }
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  });

export default app;