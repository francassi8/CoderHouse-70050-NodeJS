import { Router } from "express";

const app = Router();

app.get('/', (req,res) => {
    res.render('productsOfCart')
})

export default app;