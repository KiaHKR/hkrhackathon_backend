import { User } from "../models/user"
import { UserPuzzle } from "../models/userPuzzle"; // userObject
import { Schema, model, connect } from 'mongoose';
import * as dotenv from "dotenv";
import { dbUser } from "./models/db_users"
import { dbPuzzle } from "./models/db_puzzles";

export class dbhandler {
    // Upon creating the class, the boot method connects to the db.
    constructor() {
        dotenv.config();
        this.boot();
    }

    async boot() {
        await connect(process.env.DB_CONNECT)
        console.log('Database connected.')
    }

    userDeconstruct(user) {
        return { name: user._name, email: user._email, password: user._password, year: user._year, currentTask: user._currentTask, userPuzzles: user._userPuzzles, isAdmin: user._isAdmin }
    }

    async saveUserObject(user) { // tested and working, missing existing check
        const userInfo = this.userDeconstruct(user)
        const newUser = new dbUser(userInfo
        )
        await newUser.save();
        console.log("saveUserObject confirm.")
        return newUser
    }

    async getUserObject(email) { // tested and working
        // fetches a single user from the database and sends an object back.
        const user = await dbUser.findOne({ email: email })
        if (user) {
            console.log("getUserObject confirm.")
            return user
        } else {
            console.log("getUserObject confirm.")
            return 'User not found.'
        }
    }

    async getAllUserObject() { // tested and working
        // returns an array of all users in the database
        const users = await dbUser.find();
        console.log("getAllUserObject confirm.");
        return users
    }

    async deleteUserObject(email) { // Returns deleted count. If 0, error. If 1, success.
        // deletes user from the database, ADMIN ONLY
        const confirmation = await dbUser.deleteOne({ email: email })
        console.log("deleteUserObject confirm.")
        return confirmation.deletedCount
    }

    async updateUserObject(user) { // discuss with Aki, currently searches by email. Tested and working
        // updates a user in the database.
        const userInfo = this.userDeconstruct(user)
        const res = await dbUser.findOneAndUpdate({ email: userInfo.email }, { name: userInfo.name, email: userInfo.email, password: userInfo.password, year: userInfo.year, currentTask: userInfo.currentTask, userPuzzles: userInfo.userPuzzles, isAdmin: userInfo.isAdmin });
        if (res) {
            console.log("updateUserObject confirm.")

            return res
        } else {
            console.log("updateUserObject confirm.")

            return "User update failed, user not found."
        }
    }

    // Puzzle related calls
    async savePuzzle(puzzle) {
        // Saves a puzzle to the database.
        console.log("savePuzzle confirm.")
    }

    async getPuzzle(puzzleId) {
        // returns a puzzle from the database.
        console.log("getPuzzle confirm.")
    }

    async getAllPuzzles() {
        // returns an array of all users from the database.
        console.log("getAllPuzzles confirmed.")
    }

    async updatePuzzle(puzzle) {
        // updates a puzzle in the database.
        console.log("updatePuzzle confirmed.")
    }

    async deletePuzzle(id) {
        // deletes a puzzle from the database.
        console.log("detelePuzzle confirmed.")
    }

    async getNextPuzzleId(id?: string) {
        // Function to return next puzzle's Id. IF no param present sent the first puzzle.
        return undefined
    }
}
