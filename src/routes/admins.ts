import express from "express";
const router = express.Router();

import auth from '../middleware/auth';
import admin from '../middleware/admin';
import asyncMiddleware from '../middleware/async'
import {
    validateOrderArray,
    validateUserPuzzleUpdate,
    validateUserUpdate
} from "../utility_services/validateService";

import { User } from '../models/user';
import PublicUser from "../models/publicUser";
import PuzzleHandler from "../puzzle_service/puzzleHandler";

import { UserHandlerDB } from "../database/userHandlerDB";
import { PuzzleHandlerDB } from "../database/puzzleHandlerDB";
const userDB = new UserHandlerDB();
const puzzleDB = new PuzzleHandlerDB();

/* DELETE | /admin/:email
* Removes the user in the db. req.params is used to determine the user's email.
* Takes no arguments.
* Returns error or public user object.
*/
router.delete('/:email', [auth, admin], asyncMiddleware(async (req, res) => {
    const user = await userDB.deleteUserObject(req.params.email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });

    const publicUser = new PublicUser;
    publicUser.fromUser(user)

    res.status(200).send(publicUser);
}));

/* PUT | /admin/:email
* Updates the user in the db. req.params is used to determine the user's email.
* Takes name, year, isAdmin and currentPuzzleId as arguments.
* Returns error or public user object.
*/
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

/* GET | /admin/:email
* Gets the user from the db. req.params is used to determine the user's email.
* Takes no arguments.
* Returns error or public user object.
*/
router.get('/:email', [auth, admin], asyncMiddleware(async (req, res) => {
    const user = await userDB.getUserObject(req.params.email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });

    const publicUser = new PublicUser;
    publicUser.fromUser(user)

    res.status(200).send(publicUser);
}));

/* GET | /admin/
* Gets all the users from the db.
* Takes no arguments.
* Returns error or public user object array.
*/
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

/* GET | /admin/get/puzzles
* Gets the puzzle order as from the db.
* Takes no arguments.
* Returns error or an array of strings.
*/
router.get('/get/puzzles', [auth, admin], asyncMiddleware(async (req, res) => {
    const orderArray = await puzzleDB.getOrderArray();

    if (!Array.isArray(orderArray)) return res.status(404).json({ error: "ORDER ARRAY not found." });

    res.status(200).json(orderArray);
}));

/* POST | /admin/save/puzzles
* Saves the puzzle order to the db.
* Takes a list of puzzle id's as an argument.
* Returns error or a list.
*/
router.post('/save/puzzles', [auth, admin], asyncMiddleware(async (req, res) => {
    const { error } = validateOrderArray(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await puzzleDB.saveOrderArray(req.body.orderArray);
    res.status(200).json(result);
}));

/* PUT | /update/:email
* Updates user's puzzle list and updates the db. req.params is used to determine the user's email.
* Takes puzzles and currentPuzzleId as arguments.
* Returns error or public user object.
*/
router.put('/update/:email', [auth, admin], asyncMiddleware(async (req, res) => {
    const { error } = validateUserPuzzleUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user: User | { error: string } = await userDB.getUserObject(req.params.email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });

    const puzzles: string[] = req.body.puzzles;
    if (puzzles[puzzles.length-1] !== req.body.newPuzzleId) return res.status(400).json(
        { error: "Current puzzle ID does not match the last puzzle in the list." }
    );

    user.removePuzzles();
    puzzles.forEach(puzzleId => {
        const userPuzzle = PuzzleHandler.generatePuzzle(puzzleId);
        userPuzzle.correct();
        user.addPuzzle(userPuzzle);
    });

    user.currentPuzzleId = req.body.newPuzzleId;

    const updatedUser = await userDB.updateUserObject(user);
    if (!(updatedUser instanceof User)) return res.status(404).json({ error: "Error while updating the database." });

    const publicUser = new PublicUser;
    publicUser.fromUser(updatedUser);

    return res.status(200).json(publicUser);
}));

export = router;
