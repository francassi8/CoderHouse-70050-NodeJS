import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";
import passport from "passport"

const app = Router();

app.post('/login', login);
app.post('/register', register);

app.get('/current', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.send(req.user)
})

export default app;