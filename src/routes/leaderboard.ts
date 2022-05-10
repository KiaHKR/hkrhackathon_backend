import express from "express";
const router = express.Router();

import auth from "../middleware/auth";
import asyncMiddleware from "../middleware/async";

import { User } from "../models/user";
import { Puzzle } from "../models/puzzle";

import { PuzzleHandlerDB } from "../database/puzzleHandlerDB";
const puzzleDB = new PuzzleHandlerDB();
import { UserHandlerDB } from "../database/userHandlerDB";
const userDB = new UserHandlerDB();

router.get('/', auth, asyncMiddleware(async (req, res) => {
    const users: User[] | { error: string } = await userDB.getAllUserObject();
    const puzzlesList: Puzzle[] | { error: string} = await puzzleDB.getAllVisiblePuzzles();

    if (!Array.isArray(users) || !Array.isArray(puzzlesList))
        return res.status(404).json({ error: "Problem with reading from database." });

    if (puzzlesList.length == 0 || users.length == 0)
        return res.status(404).json({ error: "Problem with reading from database." });

    const results:
        {title: string, completed: string, failed: string, firstCompletedAt: Date, firstCompletedBy: string} |
        {error: string} = generateLeaderboard(users, puzzlesList);
}));

export default router;
