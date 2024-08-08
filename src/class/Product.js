import { productModel } from "../model/product.model.js";

class ProductManager {
    constructor() {
        this.productList = [];
    }

    async getProductList() {
        const list = await productModel.find();
        if (list.length > 0) {
            this.productList = list;
            return this.productList;
        } else {
            return [];
        }
    }

    async getProductByID(pid) {
        const productId = typeof pid === 'string' ? parseInt(pid, 10) : pid;

        const product = await productModel.findOne({ id: productId });
        if (!product) {
            throw new Error('El producto con id ' + productId + ' no existe');
        } else {
            return product;
        }        
    }

    async addProduct(product) {
        let errorMessage = '';

        if (!product.title) {
            errorMessage = 'Nombre';
        }
        if (!product.description) {
            errorMessage += ' Descripcion';
        }
        if (!product.price) {
            errorMessage += ' Precio';
        }
        if (!product.stock) {
            errorMessage += ' Stock';
        }
        if (!product.category) {
            errorMessage += ' Categoria';
        }

        if (errorMessage) {
            throw new Error('Se requieren los siguientes campos: ' + errorMessage);
        }

        await product.save();

        return product;
    }

    async updateProduct(updatedProduct, pid) {
        const productId = typeof pid === 'string' ? parseInt(pid, 10) : pid;

        const updated = await productModel.findOneAndUpdate(
            { id: productId },
            { $set: updatedProduct },
            { new: true }
        );

        if (!updated) {
            throw new Error('El producto con id ' + productId + ' no existe');
        }

        return updated;
    }

    async deleteProduct(pid) {
        const deleted = await productModel.findOneAndDelete({ _id: pid });
        if (!deleted) {
            throw new Error('El producto con id ' + pid + ' no existe');
        }

        return deleted;
    }
}

export default ProductManager;