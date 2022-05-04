import express from "express";
const router = express.Router();

import auth from '../middleware/auth';
import admin from '../middleware/admin';
import asyncMiddleware from '../middleware/async'

import { User, validateUserUpdate } from '../models/user';
import PublicUser from "../models/publicUser";

import { UserHandlerDB } from "../database/userHandlerDB";
import { PuzzleHandlerDB } from "../database/puzzleHandlerDB";
import Joi from "joi";
import PuzzleHandler from "../puzzle_service/puzzleHandler";
const userDB = new UserHandlerDB();
const puzzleDB = new PuzzleHandlerDB();

// DELETE user.
router.delete('/:email', [auth, admin], asyncMiddleware(async (req, res) => {
    const user = await userDB.deleteUserObject(req.params.email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });

    const publicUser = new PublicUser;
    publicUser.fromUser(user)

    res.status(200).send(publicUser);
}));

// UPDATE user.
router.put('/:email', [auth, admin], asyncMiddleware(async (req, res) => {
    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let user = await userDB.getUserObject(req.params.email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });
    user.name = req.body.name;
    user.year = req.body.year;
    user.isAdmin = req.body.isAdmin;
    user.currentPuzzleId = req.body.currentPuzzleId;

    user = await userDB.updateUserObject(user);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });

    const publicUser = new PublicUser;
    publicUser.fromUser(user)

    res.status(200).send(publicUser);
}));

// GET user.
router.get('/:email', [auth, admin], asyncMiddleware(async (req, res) => {
    const user = await userDB.getUserObject(req.params.email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });

    const publicUser = new PublicUser;
    publicUser.fromUser(user)

    res.status(200).send(publicUser);
}));

// GET ALL users
router.get('/', [auth, admin], asyncMiddleware(async (req, res) => {
    const users: User[] | { error: string } = await userDB.getAllUserObject();
    if (!Array.isArray(users)) return res.status(404).json({ error: "No users in the database." });

    const publicUsers = [];
    users.forEach((user) => {
        const publicUser = new PublicUser;
        publicUser.fromUser(user)
        publicUsers.push(publicUser);
    });

    res.status(200).send(publicUsers);
}));

// GET THE ORDER ARRAY
router.get('/puzzles', [auth, admin], asyncMiddleware(async (req, res) => {
    const orderArray = await puzzleDB.getOrderArray();
    if (!Array.isArray(orderArray)) return res.status(404).json({ error: "ORDER ARRAY not found." });

    res.status(200).send(orderArray);
}));

// SAVE THE ORDER ARRAY
router.post('/puzzles', [auth, admin], asyncMiddleware(async (req, res) => {
    const { error } = validateOrderArray(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await puzzleDB.saveOrderArray(req.body.orderArray);
    res.status(200).send(result);
}));

// MODIFY user's puzzles.
router.put('/update/:email', [auth, admin], asyncMiddleware(async (req, res) => {
    const { error } = validateUserPuzzleUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user: User | { error: string } = await userDB.getUserObject(req.params.email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });

    user.removePuzzles();

    const puzzles: string[] = req.body.puzzles;

    puzzles.forEach(puzzleId => {
        const userPuzzle = PuzzleHandler.generatePuzzle(puzzleId);
        userPuzzle.correct();
        user.addPuzzle(userPuzzle);
    });

    user.currentPuzzleId = req.bosy.newPuzzleId;

    const result = await userDB.updateUserObject(user);

    return res.status(200).json(result);
}));


export = router;

function validateOrderArray(orderArray) {
    const schema = Joi.object({
        orderArray: Joi.array().required()
    });

    return schema.validate(orderArray);
}

function validateUserPuzzleUpdate(input) {
    const schema = Joi.object({
        puzzles: Joi.array().required().min(1),
        newPuzzleId: Joi.string().required()
    });

    return schema.validate(input);
}
