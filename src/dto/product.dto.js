export class ProductDTO {
    constructor(title, description, code, price, stock, category, status) {
      this.title = title;
      this.description = description;
      this.code = code;
      this.price = price;
      this.stock = stock;
      this.category = category;
      this.status = status;
    }
  }