import express from "express";
const router = express.Router();
import auth from '../middleware/auth';
import {dbhandler} from "../database/dbhandler";
const db = new dbhandler;
import asyncMiddleware from '../middleware/async'

// GET all puzzles
router.get('/', auth, asyncMiddleware(async (req, res) => {
    const puzzles = await db.getAllPuzzles();
//    if (puzzles.length === 0) return res.status(404).json({ error: "No puzzles in the database." });

    res.status(200).send(puzzles);
}));

// GET a puzzle
router.get('/:puzzleId', auth, asyncMiddleware(async (req, res) => {
    // GET a puzzle by id.


}));

// POST user's answer
router.post('/:puzzleId', auth, asyncMiddleware(async (req, res) => {
    // dbHandler: GET userObject. If not found, return error.

   // If user has not the puzzleId, return error.

   // check the answer against the stored value and return appropriate response.
}));

export = router;
