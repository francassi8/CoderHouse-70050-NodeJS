import { Router } from "express";
import { ticketsRepo } from '../repositories/index.js';
import { invokePassport } from "../middlewares/handleErrors.js";

const app = Router();

app.get('/:code', invokePassport('jwt'), async (req, res) => {
    try {
        const ticket = await ticketsRepo.getTicketByCode(req.params.code);
        if (!ticket) {
            return res.status(404).json({ status: "error", message: "ticket not found" });
        }
        res.status(200).json({ status: "success", resultado: ticket });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default app;