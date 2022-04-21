import express from "express";
const router = express.Router();
import { User, validateUser } from "../models/user";
import { dbhandler} from "../database/dbhandler";
const db = new dbhandler;
import bcrypt from 'bcrypt';
import auth from '../middleware/auth';

// GET a user
router.get('/', auth, async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = await db.getUserObject(req.user.email);
    res.status(200).json(user);
});

// POST a user
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    // dbHandler: GET userObject. If not found, return error.

    // Create the userObject
    let user = new User(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.year
    );

    // Hash password.
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // dbHandler: SAVE userObject. return error/userObject.

    // Return a token to the user.
    const token = user.generateAuthToken();
    res.status(200).header('x-auth-header', token).send(user);
});

// DELETE A USER
router.delete('/', auth, async (req, res) => {
    // dbHandler: DELETE userObject. If not found, return error/userObject.
});

// PUT A USER
router.put('/', auth, async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    // dbHandler: GET userObject. If not found, return error.

    // update values.

    // dbHandler: UPDATE userObject. return error/userObject.
});

export = router;
