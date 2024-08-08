import { Router } from "express";
import { productModel } from "../model/product.model.js";

const app = Router();

app.get('/api/products/', async (req, res) => {
    try {
        const productList = await productModel.find();
        res.status(200).json({ resultado: productList });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.get('/api/products/:pid', async (req, res) => {
    try {
        const productFind = await productModel.findById(req.params.pid);
        if (!productFind) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ result: productFind });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

app.post('/api/products/', async (req, res) => {
    try {
        const newProduct = new productModel(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Producto añadido!', result: newProduct });
    } catch (error) {
        return res.status(500).json({ error: 'Falla al añadir el producto. Error: ' + error.message });
    }
});

app.put('/api/products/:pid', async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.pid, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json({ message: 'Producto actualizado!', result: updatedProduct });
    } catch (error) {
        return res.status(500).json({ error: 'Falla al actualizar el producto. Error: ' + error.message });
    }
});

app.delete('/api/products/:pid', async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.pid);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json({ message: 'Producto eliminado!' });
    } catch (error) {
        return res.status(500).json({ error: 'Falla al eliminar el producto. Error: ' + error.message });
    }
});

export default app;