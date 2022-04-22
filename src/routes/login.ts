import express from "express";
const router = express.Router();
import { dbhandler } from "../database/dbhandler";
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import Joi from "joi";
import asyncMiddleware from '../middleware/async'

router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    const db = new dbhandler;
    const user = await db.getUserObject(req.body.email);
    if (!(user instanceof User)) return res.status(400).json({ error: "Invalid email or password."});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid email or password."});

    const userToken = user.generateAuthToken();
    res.json({ token: userToken });
}));

function validate(request) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(50).required()
    });
    return schema.validate(request);
}

export = router;
