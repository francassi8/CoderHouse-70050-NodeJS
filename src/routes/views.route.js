import { Router } from "express";
const app = Router();

app.get('/', (req, res) => {
    res.render('home', {
        productos: [{
            nombre: 'shampoo',
            precio: '500'   
        },
        {
            nombre: 'jabon',
            descripcion: 'sapone para il corpo',
            precio: '300'   
        }]
    })
})

export default app;