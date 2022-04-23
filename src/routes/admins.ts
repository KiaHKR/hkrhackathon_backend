import express from "express";
const router = express.Router();
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import { dbhandler } from "../database/dbhandler";
import { User, validateUserUpdate } from '../models/user';
const db = new dbhandler;
import asyncMiddleware from '../middleware/async'
import PublicUser from "../models/publicUser";

// DELETE user.
router.delete('/:email', [auth, admin], asyncMiddleware(async (req, res) => {
    const user = await db.deleteUserObject(req.params.email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found."});

    const publicUser = new PublicUser;
    publicUser.fromUser(user)
    
    res.status(200).send(publicUser);
}));

// UPDATE user.
router.put('/:email', [auth, admin], asyncMiddleware(async (req, res) => {
    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    let user = await db.getUserObject(req.params.email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found."});
    user.name = req.body.name;
    user.year = req.body.year;
    user.isAdmin = req.body.isAdmin;

    user = await db.updateUserObject(user);

    const publicUser = new PublicUser;
    publicUser.fromUser(user)

    res.status(200).send(publicUser);
}));

// GET user.
router.get('/:email', [auth, admin], asyncMiddleware(async (req, res) => {
    const user = await db.getUserObject(req.params.email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found."});

    const publicUser = new PublicUser;
    publicUser.fromUser(user)

    res.status(200).send(publicUser);
}));

// GET ALL users
router.get('/', [auth, admin], asyncMiddleware(async (req, res) => {
    const users: User[] = await db.getAllUserObject();
    if (users.length === 0) return res.status(404).json({error: "No users in the database."});
    
    const publicUsers = [];
    users.forEach((user) => {
        const publicUser = new PublicUser;
        publicUser.fromUser(user)
        publicUsers.push(publicUser);
    });
    
    res.status(200).send(publicUsers);
}));

// POST PUZZLES

export = router;
