import express from "express";
const router = express.Router();
import { User } from "../models/user";
import bcrypt from 'bcrypt';
import Joi from "joi";


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    // dbHandler: GET userObject. If not found, return error.

    // validate password by using compare from bcrypt. If not valid return error.

    // create token and return it to the user.
});

function validate(request) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(50).required()
    });

    return schema.validate(request);
}

export = router;
