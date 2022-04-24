import express from "express";
const router = express.Router();
import auth from '../middleware/auth';
import { dbhandler } from "../database/dbhandler";
const db = new dbhandler;
import asyncMiddleware from '../middleware/async'
import {UserPuzzle} from "../models/userPuzzle";
import PuzzleHandler from "../puzzle_service/puzzleHandler";

// GET all puzzles
router.get('/', auth, asyncMiddleware(async (req, res) => {
    const puzzles = await db.getAllPuzzles();
    res.status(200).send(puzzles);
}));

// GET a puzzle     possibly not needed.
router.get('/:puzzleId', auth, asyncMiddleware(async (req, res) => {
    // GET a puzzle by id.
}));

// POST user's answer
router.post('/:puzzleId', auth, asyncMiddleware(async (req, res) => {
    const user = await db.getUserObject(req["user"].email);

    const userPuzzle = user.getPuzzle(req.params.puzzleId)
    if (!(userPuzzle instanceof UserPuzzle)) return res.status(404).json({ error: "No puzzle found." })

    const puzzleHandler = new PuzzleHandler;
    const result: { answer, information } = puzzleHandler.checkAnswer(userPuzzle.id, userPuzzle.answer, req.body.answer);

    if (userPuzzle.completed) return res.status(200).json(result);

    if (result.answer) {
        userPuzzle.correct()
        user.updatePuzzle(userPuzzle);
        const newCurrentPuzzleId = await db.getNextPuzzleId(userPuzzle.id);
        const newUserPuzzle = puzzleHandler.generatePuzzle(newCurrentPuzzleId);
        user.addPuzzle(newUserPuzzle);
    }
    if (!result.answer) {
        userPuzzle.incorrect()
        user.updatePuzzle(userPuzzle)
    }

    await db.updateUserObject(user);
    return result;
}));

export = router;
