import mongoose from "mongoose";
import { dbUser } from "./models/db_users"
import { UserPuzzle } from "../models/userPuzzle"
import dotenv from "dotenv"
import { PuzzleHandlerDB } from "./puzzleHandlerDB";
async function letsgo() {
    dotenv.config();

    const mongoConnection = process.env.DB_CONNECT;
    mongoose.connect(mongoConnection)
    let puzzhand = new PuzzleHandlerDB;
    let res = await puzzhand.getAllPuzzles();


    console.log("jobs done.")
}

letsgo()