import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";
import { invokePassport } from "../middlewares/handleErrors.js";

const app = Router();

app.post('/login', login);
app.post('/register', register);

app.get('/current', invokePassport('jwt'), (req, res) => {
    res.send(req.user)
})

export default app;