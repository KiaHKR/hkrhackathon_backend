import { User } from "../models/user"
import { UserPuzzle } from "../models/userPuzzle"; // userObject
import { Schema, model, connect } from 'mongoose';
import * as dotenv from "dotenv";
import { dbUser } from "./models/db_users"
import { dbPuzzle } from "./models/db_puzzles";

/** Class for handling all db interactions */
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

    puzzleDeconstruct(puzzle) {
       return { id:puzzle._id, title:puzzle._title, story:puzzle._story, examples:puzzle._examples, template:puzzle._template, answer:puzzle._answer }
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
        const puzzleData = this.puzzleDeconstruct(puzzle)
        const newPuzzle = new dbPuzzle(puzzleData)
        await newPuzzle.save();        
        console.log("savePuzzle confirm.")
        return newPuzzle
    }

    async getPuzzle(puzzleId) {
        // returns a puzzle from the database.
        const puzzle = await dbPuzzle.findOne({ id:puzzleId })
        if (puzzle) {
            console.log("getPuzzle confirm.")
            return puzzle
        } else {
            console.log("getPuzzle confirm.")
            return 'Puzzle not found.'
        }
    }
    

    async getAllPuzzles() {
        // returns an array of all users from the database.
        const puzzles = await dbPuzzle.find();
        console.log("getAllPuzzles confirm.");
        return puzzles
    }

    async updatePuzzle(puzzle) {
        const puzzleData = this.puzzleDeconstruct(puzzle)
        const res = await dbPuzzle.findOneAndUpdate({ id: puzzleData.id }, { title:puzzleData.title, story:puzzleData.story, examples:puzzleData.examples, template:puzzleData.template, answer:puzzleData.answer });
        if (res) {
            console.log("updatePuzzle confirm.")
            return res
        } else {
            console.log("updatePuzzle confirm.")
            return "Puzzle update failed, puzzle not found."
        }
    }

    async deletePuzzle(puzzleid) {
        // deletes a puzzle from the database.
        const confirmation = await dbPuzzle.deleteOne({ id: puzzleid })
        console.log("deletePuzzle confirmed.")
        return confirmation.deletedCount
    }

    async getNextPuzzleId(id?: string) {
        // Function to return next puzzle's Id. IF no param present sent the first puzzle.
        return undefined
    }
}
