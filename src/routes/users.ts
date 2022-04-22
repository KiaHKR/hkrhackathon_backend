import express from "express";
const router = express.Router();
import { User, validateUserCreation, validateUserUpdate } from "../models/user";
import { dbhandler} from "../database/dbhandler";
const db = new dbhandler;
import bcrypt from 'bcrypt';
import auth from '../middleware/auth';

// GET user
router.get('/', auth, async (req, res) => {
    const user = await db.getUserObject(req["user"].email);
    res.status(200).json(user);
});

// POST user
router.post('/', async (req, res) => {
    const { error } = validateUserCreation(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    let user = await db.getUserObject(req.body.email);
    if (!(user instanceof User)) return res.status(400).json({error: "Email already in use."});

    user = new User(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.year
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await db.saveUserObject(user);

    const token = user.generateAuthToken();
    res.status(200).header('x-auth-header', token).json(user);
});

// DELETE user
router.delete('/', auth, async (req, res) => {
    const user = await db.deleteUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found."});

    res.json(user);
});

// PUT user
router.put('/', auth, async (req, res) => {
    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    let user = await db.getUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found."});
    user.name = req.body.name;
    user.year = req.body.year;

    user = await db.updateUserObject(user);

    res.status(200).send(user);
});

// GET userFile
router.get('/:puzzleId', auth, async (req, res) => {
    // dbHandler: GET userObject. If not found, return error.
    // dbHandler: GET puzzleObject. If not found, return error.

    // If User has puzzle id stored, return that.

    // Else puzzleHandler: GET puzzleObject, and save it to the userObject, then return puzzleObject.

});

export = router;
