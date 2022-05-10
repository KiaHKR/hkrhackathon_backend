import express from "express";
const router = express.Router();

import auth from "../middleware/auth";
import asyncMiddleware from "../middleware/async";

import { PuzzleHandlerDB } from "../database/puzzleHandlerDB";
const puzzleDB = new PuzzleHandlerDB();

/*GET | /leaderboard
* return leaderboard scores
* */
router.get('/', auth, asyncMiddleware(async (req, res) => {
    const puzzles: any[] | { error: string } = await puzzleDB.getLeaderboard();
    if (!Array.isArray(puzzles)) return res.status(404).json({ error: "Something went wrong while generating leaderboard." });

    const leaderboard = [];
    puzzles.forEach(puzzle => {
        const puzzleStats = {
            title: puzzle.puzzle,
            completed: puzzle.timesCompleted,
            failed: puzzle.wrongSubmissions,
            firstCompletedAt: puzzle.timeFinished,
            firstCompletedBy: puzzle.firstToFinish
        }
        leaderboard.push(puzzleStats);
    });

    return res.status(200).json(leaderboard);
}));

export default router;
