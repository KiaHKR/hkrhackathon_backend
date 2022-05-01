import express from "express";
const router = express.Router();
import { User, validateUserCreation, validateUserUpdate } from "../models/user";
import bcrypt from 'bcrypt';

import auth from '../middleware/auth';
import asyncMiddleware from '../middleware/async'

import PublicUser from "../models/publicUser";
import PuzzleHandler from "../puzzle_service/puzzleHandler";
import { UserPuzzle } from "../models/userPuzzle";
import { PuzzleHandlerDB } from "../database/puzzleHandlerDB";
const puzzleDB = new PuzzleHandlerDB();
import { UserHandlerDB } from "../database/userHandlerDB";
const userDB = new UserHandlerDB();

// GET user
router.get('/',  auth, asyncMiddleware(async (req, res) => {
    const user: User | { error: string } = await userDB.getUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found."})

    const publicUser = new PublicUser;
    publicUser.fromUser(user);
    res.status(200).json(publicUser);
}));

// POST user
router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validateUserCreation(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    let user = await userDB.getUserObject(req.body.email);
    if (user instanceof User) return res.status(400).json({error: "Email already in use."});

    user = new User(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.year
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const currentPuzzleId: string | { error: string } = await puzzleDB.getNextPuzzleId();
    if (typeof currentPuzzleId !== 'string') return res.status(404).json({ error: "Next puzzle id not found."});

    const userPuzzle = PuzzleHandler.generatePuzzle(currentPuzzleId as string);
    user.addPuzzle(userPuzzle);

    await userDB.saveUserObject(user);
    const publicUser = new PublicUser;
    publicUser.fromUser(user)

    const token = user.generateAuthToken();
    res.status(200).header('x-auth-header', token).json(publicUser);
}));

// DELETE user
router.delete('/', auth, asyncMiddleware(async (req, res) => {
    const user = await userDB.deleteUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found."});

    const publicUser = new PublicUser;
    publicUser.fromUser(user)

    res.json(publicUser);
}));

// PUT user
router.put('/', auth, asyncMiddleware(async (req, res) => {
    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    let user = await userDB.getUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found."});
    user.name = req.body.name;
    user.year = req.body.year;

    user = await userDB.updateUserObject(user);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found."})

    const publicUser = new PublicUser;
    publicUser.fromUser(user)

    res.status(200).send(publicUser);
}));

// GET userFile
router.get('/:puzzleId', auth, asyncMiddleware(async (req, res) => {
    const user = await userDB.getUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "User not found."});

    const userPuzzle = user.getPuzzle(req.params.puzzleId);
    if (!(userPuzzle instanceof UserPuzzle)) return res.status(404).json({ error: "No puzzle found." });

    res.status(200).json({ userInput: userPuzzle.userInput });
}));

export = router;
