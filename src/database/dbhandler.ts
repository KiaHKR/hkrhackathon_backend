import { User } from "../models/user" // userObject
export class dbhandler {

    saveUserObject(user) {
        // saves a user to the database.
        console.log("saveUserObject confirm")
    }

    getUserObject(email) {
        // fetches a single user from the database and sends an object back.
        console.log("getUserObject confirm")
        return new User("joe", "joe@mama.se", "joehasnomama", 2022)
    }

    getAllUserObject() {
        // returns an array of all users in the database
        console.log("getAllUserObject confirm")
        return [new User("joe", "joe@mama.se", "joehasnomama", 2022), new User("john", "john@doe.se", "johndoebae", 2022)]
    }

    deleteUserObject(email) {
        // deletes user from the database, ADMIN ONLY
        console.log("deleteUserObject confirm")
    }

    updateUserObject(user) {
        // updates a user in the database.
        console.log("updateUserObject confirm")
    }

    // Puzzle related calls
    savePuzzle(puzzle) {
        // Saves a puzzle to the database.
        console.log("savePuzzle confirm")
    }

    getPuzzle(puzzleId) {
        // returns a puzzle from the database.
        console.log("getPuzzle confirm")
    }

    getAllPuzzles() {
        // returns an array of all users from the database.
        console.log("getAllPuzzles confirmed")
    }

    updatePuzzle(puzzle) {
        // updates a puzzle in the database.
        console.log("updatePuzzle confirmed")
    }

    deletePuzzle(id) {
        // deletes a puzzle from the database.
        console.log("detelePuzzle confirmed")
    }


}
