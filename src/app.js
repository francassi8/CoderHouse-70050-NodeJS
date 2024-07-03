import express from 'express'
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/',cartRouter);
app.use('/',productRouter);


app.listen(8085,() => {
    console.log("servidor levantado")
})