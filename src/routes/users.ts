import express from "express";
const router = express.Router();
import { User, validateUser } from "../models/user";
import bcrypt from 'bcrypt';


// GET all the users
router.get('/', async (req, res) => {
    // Get all the customers from the dbHandler.

    // Construct the userObjects.

    // Return the array.
});

// GET a user
router.get('/:email', async (req, res) => {
    // Call dbHandler with the email, if not found return an error.

    // Construct the userObject and return it
});

// POST a user
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    // Check from the dbHandler if user already exists, if so return error.

    // Create the userObject
    let user = new User(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.year
    );

    // Hash password.
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    // Send the userObject to the dbHandler.

    // Return a token to the user.
});

// DELETE A USER
router.delete('/:email', async (req, res) => {
    // call dbHandler with the email, if not found return an error.
});

// PUT A USER
router.put('/:email', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    // Check from the dbHandler if user exists, if NOT return error.

    // if there is a user, update values and send it back.
    let user;
});
