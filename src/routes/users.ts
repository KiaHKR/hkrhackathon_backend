import express from "express";
const router = express.Router();
import bcrypt from 'bcrypt';

import auth from '../middleware/auth';
import reset from '../middleware/resetPassword'
import asyncMiddleware from '../middleware/async'
import {
    validateUserCreation,
    validatePasswordUpdate,
    validatePassword,
    validateUserUpdate
} from '../utility_services/validateService'

import { User } from "../models/user";
import PublicUser from "../models/publicUser";
import PuzzleHandler from "../puzzle_service/puzzleHandler";
import { UserPuzzle } from "../models/userPuzzle";

import { PuzzleHandlerDB } from "../database/puzzleHandlerDB";
const puzzleDB = new PuzzleHandlerDB();
import { UserHandlerDB } from "../database/userHandlerDB";
const userDB = new UserHandlerDB();

/* GET | /user/
* Get the user from db. Token is used to determine the user's email.
* Takes no arguments.
* Returns error or public user object.
*/
router.get('/', auth, asyncMiddleware(async (req, res) => {
    const user: User | { error: string } = await userDB.getUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." })

    const publicUser = new PublicUser;
    publicUser.fromUser(user);
    res.status(200).json(publicUser);
}));

/* POST | /user/
* Creates a user for the db. Token is used to determine the user's email.
* Takes name, email, password, and year as arguments.
* Returns error or public user object.
*/
// router.post('/', asyncMiddleware(async (req, res) => {
//     const { error } = validateUserCreation(req.body);
//     if (error) return res.status(400).json({ error: error.details[0].message });
//
//     let user = await userDB.getUserObject(req.body.email);
//     if (user instanceof User) return res.status(400).json({ error: "Email already in use." });
//
//     user = new User(
//         req.body.name,
//         req.body.email,
//         req.body.password,
//         req.body.year
//     );
//
//     const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT));
//     user.password = await bcrypt.hash(user.password, salt);
//
//     const currentPuzzleId: string | { error: string } = await puzzleDB.getFirstPuzzleId();
//     if (typeof currentPuzzleId !== 'string') return res.status(404).json({ error: "Next puzzle id not found." });
//
//     const userPuzzle = PuzzleHandler.generatePuzzle(currentPuzzleId as string);
//     user.addPuzzle(userPuzzle);
//
//     await userDB.saveUserObject(user);
//
//     const publicUser = new PublicUser;
//     publicUser.fromUser(user)
//
//     const token = user.generateAuthToken();
//     res.status(200).setHeader('x-auth-header', token).json(publicUser);
// }));

/* DELETE | /user/
* Removes the user for the db. Token is used to determine the user's email.
* Takes no arguments.
* Returns error or public user object.
*/
router.delete('/', auth, asyncMiddleware(async (req, res) => {
    const user = await userDB.deleteUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });

    const publicUser = new PublicUser;
    publicUser.fromUser(user)

    res.json(publicUser);
}));

/* PUT | /user/
* Updates the user in the db. Token is used to determine the user's email.
* Takes name and year as arguments.
* Returns error or public user object.
*/
router.put('/', auth, asyncMiddleware(async (req, res) => {
    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let user = await userDB.getUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });
    user.name = req.body.name;
    user.year = req.body.year;

    user = await userDB.updateUserObject(user);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." })

    const publicUser = new PublicUser;
    publicUser.fromUser(user)

    res.status(200).send(publicUser);
}));

/* GET | /user/:puzzleId
* Gets the user puzzle indicated in the url from the db. Token is used to determine the user's email.
* Takes puzzleId as an argument, this from req.params
* Returns error or user specific puzzle data.
*/
router.get('/:puzzleId', auth, asyncMiddleware(async (req, res) => {
    const user = await userDB.getUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "User not found." });

    const userPuzzle = user.getPuzzle(req.params.puzzleId);
    if (!(userPuzzle instanceof UserPuzzle)) return res.status(404).json({ error: "No puzzle found." });

    res.status(200).json({ userInput: userPuzzle.userInput });
}));

/* PUT | /user/
* Updates the user's password to the db. Token is used to determine the user's email.
* Takes newPassword and oldPassword as arguments.
* Returns error or public user object.
*/
router.post('/password', auth, asyncMiddleware(async (req, res) => {
    const { error } = validatePasswordUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user: User | { error: string } = await userDB.getUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });

    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!validPassword) return res.status(400).json({ error: "Wrong password." });

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT));
    user.password = await bcrypt.hash(req.body.newPassword, salt);

    await userDB.updateUserObject(user);

    const publicUser = new PublicUser;
    publicUser.fromUser(user);
    res.status(200).json(publicUser);
}));

/* PUT | /user/reset
* Updates the user's password to the db. Reset token is used to determine the user's email and as a guard in this API.
* Takes password as argument.
* Returns error or public user object.
*/
router.put('/reset', [auth, reset], asyncMiddleware(async (req, res) => {
    const { error } = validatePassword(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user: User | { error: string } = await userDB.getUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT));
    user.password = await bcrypt.hash(req.body.password, salt);

    await userDB.updateUserObject(user);

    const publicUser = new PublicUser;
    publicUser.fromUser(user);
    res.status(200).json(publicUser);
}));

export default router;
