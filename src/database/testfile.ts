import mongoose from "mongoose";
import { dbUser } from "./models/db_users"
import { UserPuzzle } from "../models/userPuzzle"
import dotenv from "dotenv"
async function letsgo() {
    dotenv.config();

    const mongoConnection = process.env.DB_TEST_CONNECT;
    mongoose.connect(mongoConnection)

    const testuser = new dbUser({
        name: "test",
        email: "testemail2",
        password: "assword",
        year: 2022,
        currentPuzzleId: "1216546",
        userPuzzles: { "firstTestPuzzle": new UserPuzzle("firstTestPuzzle", "1 2 3", "2") },
        isAdmin: true
    })

    await testuser.save()
    console.log("jobs done.")
}

letsgo()