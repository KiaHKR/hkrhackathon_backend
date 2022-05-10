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
    const leaderboard: any[] | { error: string } = await puzzleDB.getLeaderboard();
    if (!Array.isArray(leaderboard)) return res.status(404).json({ error: "Something went wrong while generating leaderboard." });

    return res.status(200).json(leaderboard);
}));

export default router;
