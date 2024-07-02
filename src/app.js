import express from 'express'
import productClass from './class/Product.js';
import cartClass from './class/Cart.js';
import { __dirname  } from './utils.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const product = new productClass(__dirname + '/data/Products.json');
const cart = new cartClass(__dirname + '/data/Cart.json');

app.get('/api/products/', async (req, res) => {
    const ProductList = await product.getProductList();
    res.status(201).json({ resultado: ProductList}) 
})

app.get('/api/products/:pid', async (req, res) => {
    const productFind = await product.getProductByID(req.params.pid)
    res.status(201).json({ result : productFind })
})

app.post('/api/products/', async (req, res) => {
    try {
        const newProduct = req.body;
        await product.addProduct(newProduct);
        res.status(201).json({ message: 'Añadido!'})
    } catch (error) {
        //console.error('Error:', error);
        return res.status(500).json({ error: 'Falla al actualizar el producto. Error:'+ error.message });
    }
});

app.put('/api/products/:pid', async (req, res) => {
    try {
        await product.updateProduct(req.body,req.params.pid);
        return res.status(200).json({ message: 'Item Actualizado!' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Falla al actualizar el producto' });
    }
});

app.delete('/api/products/:pid', async (req, res) => {
    try {
        await product.deleteProduct(req.params.pid);
        return res.status(200).json({ message: 'Item Eliminado!' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Falla al eliminar el producto' });
    }
});

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

app.listen(8085,() => {
    console.log("servidor levantado")
})