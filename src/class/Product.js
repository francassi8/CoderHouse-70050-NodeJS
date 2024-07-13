import fs from 'node:fs'

class product {
    constructor(path){
        this.path = path;
        this.productList = [];
    }

    async getProductList(){
        const list = await fs.promises.readFile(this.path, 'utf-8')
        if(list){
            this.productList = [... JSON.parse(list).data]
            return [... this.productList]
        }else{
            throw new Error('No hay productos');
        }
    }

    async getProductByID(pid){
        await this.getProductList()
        const productId = typeof pid === 'string' ? parseInt(pid, 10) : pid;

        const productExists = this.productList.some(product => product.id === productId);
        if (!productExists) {
            throw new Error('El producto con id ' + productId + ' no existe');
        }else{
            return this.productList.find(product => product.id === productId)
        }        
    }

    async addProduct(product){
        let errorMessage = '';

        if (!product.title) {
            errorMessage = 'Nombre';
        }
        if (!product.description) {
            errorMessage = errorMessage + ' Descripcion';
        }
        if (!product.price) {
            errorMessage = errorMessage + ' Precio';
        }
        if (!product.stock) {
            errorMessage = errorMessage + ' Stock';
        }
        if (!product.category) {
            errorMessage = errorMessage + ' Categoria';
        }

        if (errorMessage)
            throw new Error('Se requieren los siguientes campos: '+errorMessage);

        this.productList = await this.getProductList();
        let newId;
        if (this.productList.length > 0) {
            newId = Math.max(...this.productList.map(product => product.id))+1
        } else {
            newId = 1
        }

        const productWithId = {
            id: newId,
            status: true,
            thumbnails: [],
            ...product
         };

        this.productList.push(productWithId);
        await  fs.promises.writeFile(this.path, JSON.stringify({ data: this.productList}))
    }

    async updateProduct(updatedProduct, pid) {
        this.productList = await this.getProductList();
        const productId = typeof pid === 'string' ? parseInt(pid, 10) : pid;

        const productExists = this.productList.some(product => product.id === productId);
        if (!productExists) {
            throw new Error('El producto con id ' + productId + ' no existe');
        }

        const index = this.productList.findIndex(product => product.id === productId);
        
        if (index !== -1) {
            this.productList[index] = {
                ...this.productList[index],
                ...updatedProduct 
            };
        }
       
        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.productList }));
    }

    async deleteProduct(pid) {
        this.productList = await this.getProductList();
        const productId = typeof pid === 'string' ? parseInt(pid, 10) : pid;

        const productExists = this.productList.some(product => product.id === productId);
        if (!productExists) {
            throw new Error('El producto con id ' + productId + ' no existe');
        }

        const productsFiltered = this.productList.filter(product => product.id !== productId);
       
        await fs.promises.writeFile(this.path, JSON.stringify({ data: productsFiltered }));
    }
}

export default product