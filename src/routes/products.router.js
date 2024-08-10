import { Router } from "express";
import { productModel } from "../model/product.model.js";

const app = Router();

app.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = '', ...query } = req.query;
        const sortManager = {
            'asc' : 1,
            'desc' : -1
        };

        const filter = {};

        for (const [key, value] of Object.entries(query)) {
            if (key in productModel.schema.paths) {
                if (typeof value === 'string') {
                    filter[key] = { $regex: value, $options: 'i' };
                } else {
                    filter[key] = value;
                }
            }
        }

        const productList = await productModel.paginate(
            filter,
            {
                limit: parseInt(limit),
                page: parseInt(page),
                ...(sort && { sort: { price: sortManager[sort] } })
            }
        );

        res.status(200).json({ status: "success", resultado: productList });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.get('/:pid', async (req, res) => {
    try {
        const productFind = await productModel.findById(req.params.pid);
        if (!productFind) {
            return res.status(404).json({ status: "error", error: 'Producto no encontrado' });
        }
        res.status(200).json({ result: productFind });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

app.post('/', async (req, res) => {
    try {
        const newProduct = new productModel(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Producto añadido!', result: newProduct });
    } catch (error) {
        return res.status(500).json({ error: 'Falla al añadir el producto. Error: ' + error.message });
    }
});

app.put('/:pid', async (req, res) => {
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

app.delete('/:pid', async (req, res) => {
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