import { Router } from "express";
import ProductDAO  from "../dao/class/Product.dao.js";
//import { productModel } from "../dao/model/product.model.js";
import { invokePassport } from "../middlewares/handleErrors.js";
import { soloAdmin } from "../middlewares/authorization.js";

const app = Router();
const productDaoInstance = new ProductDAO();

app.get('/', invokePassport('jwt'), async (req, res) => {
    try {
      const { limit = 10, page = 1, sort = 'ASC', ...query } = req.query;
      const productList = await productDaoInstance.getProductList(query, limit, page, sort);
      res.json(productList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.get('/:pid', invokePassport('jwt'), async (req, res) => {
    try {
        const pid = req.params.pid;
        const productFind = await productDaoInstance.getProductByID(pid);
        if (!productFind) {
            return res.status(404).json({ status: "error", error: 'Producto no encontrado' });
        }
        res.status(200).json({ result: productFind });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

app.post('/', invokePassport('jwt'), soloAdmin, async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productDaoInstance.addProduct(product);
        res.status(201).json({ message: 'Producto añadido!', result: newProduct });
    } catch (error) {
        return res.status(500).json({ error: 'Falla al añadir el producto. Error: ' + error.message });
    }
});

app.put('/:pid', invokePassport('jwt'), soloAdmin, async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = req.body;
        const updatedProduct = await productDaoInstance.updateProduct(pid, product);
        
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json({ message: 'Producto actualizado!', result: updatedProduct });
    } catch (error) {
        return res.status(500).json({ error: 'Falla al actualizar el producto. Error: ' + error.message });
    }
});

app.delete('/:pid', invokePassport('jwt'), soloAdmin, async (req, res) => {
    try {
        const pid = req.params.pid;
        const deletedProduct = await productDaoInstance.deleteProduct(pid);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json({ message: 'Producto eliminado!' });
    } catch (error) {
        return res.status(500).json({ error: 'Falla al eliminar el producto. Error: ' + error.message });
    }
});

export default app;