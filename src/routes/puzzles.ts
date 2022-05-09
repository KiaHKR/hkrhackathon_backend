import express from "express";
const router = express.Router();

import auth from '../middleware/auth';
import asyncMiddleware from '../middleware/async'

import { User } from "../models/user";
import { UserPuzzle } from "../models/userPuzzle";
import PuzzleHandler from "../puzzle_service/puzzleHandler";

import { PuzzleHandlerDB } from "../database/puzzleHandlerDB";
const puzzleDB = new PuzzleHandlerDB();
import { UserHandlerDB } from "../database/userHandlerDB";
const userDB = new UserHandlerDB();

/* GET | /puzzles
* Gets all the puzzles in the db that are marked visible.
* Takes no arguments.
* Returns error or an array of puzzles.
*/
router.get('/', auth, asyncMiddleware(async (req, res) => {
    const puzzles = await puzzleDB.getAllVisiblePuzzles();
    if (!Array.isArray(puzzles)) return res.status(404).json({ error: "No puzzles in the database." });

    res.status(200).send(puzzles);
}));

/* GET | /puzzles/:puzzleId
* Compares users guess to puzzle's answer, if correct also generates the next puzzle in the event.
* req.params is used to determine the puzzle id. Token is used to determine user's email.
* Takes guess as an argument.
* Returns error or public user object.
*/
router.post('/:puzzleId', auth, asyncMiddleware(async (req, res) => {
    const user = await userDB.getUserObject(req["user"].email);
    if (!(user instanceof User)) return res.status(404).json({ error: "Email not found." });

    const userPuzzle = user.getPuzzle(req.params.puzzleId);
    if (!(userPuzzle instanceof UserPuzzle)) return res.status(404).json({ error: "No puzzle found." });

    const result: { answer: boolean, information: string } = PuzzleHandler.checkAnswer(userPuzzle.id, userPuzzle.answer, req.body.guess);

    if (userPuzzle.completed) return res.status(200).json(result);

    if (result.answer) {
        userPuzzle.correct()
        const currentPuzzleId: string | { error: string } = await puzzleDB.getNextPuzzleId(userPuzzle.id);
        if (typeof currentPuzzleId !== 'string') return res.status(404).json({ error: "Next puzzle id not found." });

        const newUserPuzzle = PuzzleHandler.generatePuzzle(currentPuzzleId as string);
        user.addPuzzle(newUserPuzzle);
    }
    if (!result.answer) {
        userPuzzle.incorrect();
    }

    await userDB.updateUserObject(user);
    return res.status(200).json(result);
}));

export default router;
