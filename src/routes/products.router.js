import { Router } from "express";
import productClass from '../class/Product.js';
import { __dirname  } from '../utils.js';

const app = Router();

const product = new productClass(__dirname + '/data/Products.json');

app.get('/api/products/', async (req, res) => {
    try {
        const ProductList = await product.getProductList();
        res.status(201).json({ resultado: ProductList})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

app.get('/api/products/:pid', async (req, res) => {
    try {
        const productFind = await product.getProductByID(req.params.pid)
        res.status(201).json({ result : productFind })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
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
        return res.status(500).json({ error: 'Falla al actualizar el producto. '+ error.message });
    }
});

app.delete('/api/products/:pid', async (req, res) => {
    try {
        await product.deleteProduct(req.params.pid);
        return res.status(200).json({ message: 'Item Eliminado!' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Falla al eliminar el producto. '+ error.message });
    }
});

export default app;