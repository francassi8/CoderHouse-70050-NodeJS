import express from 'express'
import handlebars from 'express-handlebars'
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'
import {__dirname} from './utils.js'
import ViewRouters from './routes/views.route.js'

const app = express();

app.engine('handlebars', handlebars.engine()); //tipo de motor de plantilla
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/',cartRouter);
app.use('/',productRouter);
app.use('/',ViewRouters)


app.listen(8085,() => {
    console.log("servidor levantado")
})