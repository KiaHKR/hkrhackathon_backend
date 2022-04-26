import { User } from "../models/user"
import { UserPuzzle } from "../models/userPuzzle"; // userObject
import { Schema, model, connect } from 'mongoose';
import * as dotenv from "dotenv";

export class dbhandler {

    constructor() {
        dotenv.config();
        this.boot();
    }
    async boot() {
        await connect(process.env.DB_CONNECT)
        console.log('Database connected.')
    }

    async saveUserObject(user) {
        // saves a user to the database.
        console.log("saveUserObject confirm")
        return new User("joe", "joe@mama.se", "$2b$10$vhvR5lWTjyE2XQPw0AkClup7TVCHPZvxeKGTNvSlR2Oumj0CGeEN2", 2022)
    }

    async getUserObject(email) {
        // fetches a single user from the database and sends an object back.
        console.log("getUserObject confirm")
        const userPuzzle = new UserPuzzle("test", "123123123", "3")
        const user = new User("joe", "joe@mama.se", "$2b$10$vhvR5lWTjyE2XQPw0AkClup7TVCHPZvxeKGTNvSlR2Oumj0CGeEN2", 2022)
        user.addPuzzle(userPuzzle);
        return user
    }

    async getAllUserObject() {
        // returns an array of all users in the database
        console.log("getAllUserObject confirm")
        return [new User("joe", "joe@mama.se", "$2b$10$vhvR5lWTjyE2XQPw0AkClup7TVCHPZvxeKGTNvSlR2Oumj0CGeEN2", 2022), new User("john", "john@doe.se", "$2b$10$vhvR5lWTjyE2XQPw0AkClup7TVCHPZvxeKGTNvSlR2Oumj0CGeEN2", 2022)]
    }

    async deleteUserObject(email) {
        // deletes user from the database, ADMIN ONLY
        console.log("deleteUserObject confirm")
        return new User("joe", "joe@mama.se", "$2b$10$vhvR5lWTjyE2XQPw0AkClup7TVCHPZvxeKGTNvSlR2Oumj0CGeEN2", 2022)
    }

    async updateUserObject(user) {
        // updates a user in the database.
        console.log("updateUserObject confirm")
        return new User("joe", "joe@mama.se", "$2b$10$vhvR5lWTjyE2XQPw0AkClup7TVCHPZvxeKGTNvSlR2Oumj0CGeEN2", 2022)
    }

    // Puzzle related calls
    async savePuzzle(puzzle) {
        // Saves a puzzle to the database.
        console.log("savePuzzle confirm")
    }

    async getPuzzle(puzzleId) {
        // returns a puzzle from the database.
        console.log("getPuzzle confirm")
    }

    async getAllPuzzles() {
        // returns an array of all users from the database.
        console.log("getAllPuzzles confirmed")
    }

    async updatePuzzle(puzzle) {
        // updates a puzzle in the database.
        console.log("updatePuzzle confirmed")
    }

    async deletePuzzle(id) {
        // deletes a puzzle from the database.
        console.log("detelePuzzle confirmed")
    }

    async getNextPuzzleId(id?: string) {
        // Function to return next puzzle's Id. IF no param present sent the first puzzle.
        return undefined
    }
}
