import express from "express";
const router = express.Router();
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import Joi from "joi";
import asyncMiddleware from '../middleware/async';
import { UserHandlerDB } from "../database/userHandlerDB";
import * as sendEmail from "../mail_service/sendEmail";
const userDB = new UserHandlerDB();
import generateResetToken from "../utility_services/generateResetToken";

// Login
router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await userDB.getUserObject(req.body.email);
    if (!(user instanceof User)) return res.status(400).json({ error: "Invalid email or password." });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid email or password." });

    const userToken = user.generateAuthToken();
    res.status(200).json({ token: userToken });
}));

// Reset password request.
router.post('/reset', asyncMiddleware(async (req, res) => {
    const { error } = validateReset(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await userDB.getUserObject(req.body.email);
    if (!(user instanceof User)) return res.status(400).json({ error: "Failed to send mail."});

    const resetToken = generateResetToken(req.body.email);
    const link = `${process.env.SITE_URL}/user/reset?token=${resetToken}`;
    const result: {success: boolean, message: string} = await sendEmail.sendEmail(req.body.email, link);

    if (!result.success) return res.status(400).json({ error: "Failed to send mail."});

    res.status(200).json();
}));

function validateLogin(request) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(50).required()
    });
    return schema.validate(request);
}

function validateReset(request) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email()
    });
    return schema.validate(request);
}

export = router;
