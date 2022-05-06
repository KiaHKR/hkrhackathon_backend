import express from "express";
const router = express.Router();
import bcrypt from 'bcrypt';

import { User } from '../models/user';

import asyncMiddleware from '../middleware/async';
import logger from "../utility_services/logger";

import * as sendEmail from '../mail_service/sendEmail';
import generateResetToken from "../utility_services/generateResetToken";
import { validateEmail, validateLogin } from "../utility_services/validateService";

import { UserHandlerDB } from "../database/userHandlerDB";
const userDB = new UserHandlerDB();

/* POST | /login
* Login.
* Takes email and password as arguments
* Returns error or token.
*/
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

/* POST | /login/reset
* Sends an email to the user, used to reset the user's password.
* Takes email as an argument.
* Returns error or status 200.
*/
router.post('/reset', asyncMiddleware(async (req, res) => {
    const { error } = validateEmail(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await userDB.getUserObject(req.body.email);
    if (!(user instanceof User)) return res.status(400).json({ error: "Failed to send mail."});

    const resetToken = generateResetToken(req.body.email);
    const link = `${process.env.SITE_URL}/user/reset?token=${resetToken}`;
    await sendEmail.sendEmail(
        req.body.email, link,
        (data: {success: boolean, message: string}) => {
            if (!data.success) {
                logger.error(data.message);
                return res.status(400).json({error: "Failed to send mail."});
            }
            res.status(200).json();
        });
}));

export = router;
