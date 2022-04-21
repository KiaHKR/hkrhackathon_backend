import { User } from "../models/user" // userObject
export class dbhandler {

    async saveUserObject(user) {
        // saves a user to the database.
        console.log("saveUserObject confirm")
    }

    async getUserObject(email) {
        // fetches a single user from the database and sends an object back.
        console.log("getUserObject confirm")
        return new User("joe", "joe@mama.se", "joehasnomama", 2022)
    }

    async getAllUserObject() {
        // returns an array of all users in the database
        console.log("getAllUserObject confirm")
        return [new User("joe", "joe@mama.se", "joehasnomama", 2022), new User("john", "john@doe.se", "johndoebae", 2022)]
    }

    async deleteUserObject(email) {
        // deletes user from the database, ADMIN ONLY
        console.log("deleteUserObject confirm")
    }

    async updateUserObject(user) {
        // updates a user in the database.
        console.log("updateUserObject confirm")
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


}
