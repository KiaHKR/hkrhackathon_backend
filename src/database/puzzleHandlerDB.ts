
import { dbPuzzle } from "./models/db_puzzles";

/** Class for handling all db interactions */
export class PuzzleHandlerDB {
    // Upon creating the class, the boot method connects to the db.


    puzzleDeconstruct(puzzle) {
        return { id: puzzle._id, title: puzzle._title, story: puzzle._story, examples: puzzle._examples, template: puzzle._template, answer: puzzle._answer }
    }

    puzzleReconstruct(dbpuzzle) { // do same for user
        return { id: puzzle._id, title: puzzle._title, story: puzzle._story, examples: puzzle._examples, template: puzzle._template, answer: puzzle._answer }
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
        const puzzle = await dbPuzzle.findOne({ id: puzzleId })
        if (puzzle) {
            console.log("getPuzzle confirm.")
            return puzzle
        } else {
            console.log("getPuzzle confirm.")
            return { error: 'Puzzle not found.' }
        }
    }


    async getAllPuzzles() {
        // returns an array of all users from the database.
        const puzzles = await dbPuzzle.find();
        console.log("getAllPuzzles confirm.");
        return puzzles
    }


    async getNextPuzzleId(id?: string) { // if you get an argument, return right puzzle. Else, first puzzle.
        const puzzles = await dbPuzzle.find();
        var next = false;
        for (var i of puzzles) {
            if (next) {
                return i
            }
            if (i.id == id) {
                next = true;
            }
        }
        return undefined;
    }
}
