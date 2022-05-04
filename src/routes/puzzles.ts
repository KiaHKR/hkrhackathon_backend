import express from "express";
const router = express.Router();

import auth from '../middleware/auth';
import asyncMiddleware from '../middleware/async'

import { UserPuzzle } from "../models/userPuzzle";
import PuzzleHandler from "../puzzle_service/puzzleHandler";
import { PuzzleHandlerDB } from "../database/puzzleHandlerDB";
const puzzleDB = new PuzzleHandlerDB();
import { UserHandlerDB } from "../database/userHandlerDB";
import { User } from "../models/user";
const userDB = new UserHandlerDB();

// GET all puzzles
router.get('/', auth, asyncMiddleware(async (req, res) => {
    const puzzles = await puzzleDB.getAllPuzzles();
    if (!Array.isArray(puzzles)) return res.status(404).json({ error: "No users in the database." });

    res.status(200).send(puzzles);
}));

// POST user's answer
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
        console.log(currentPuzzleId)
        const newUserPuzzle = PuzzleHandler.generatePuzzle(currentPuzzleId as string);
        user.addPuzzle(newUserPuzzle);
    }
    if (!result.answer) {
        userPuzzle.incorrect()
    }

    await userDB.updateUserObject(user);
    return res.status(200).json(result);
}));

export = router;
