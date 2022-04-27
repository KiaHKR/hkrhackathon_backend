
import { dbPuzzle } from "./models/db_puzzles";

/** Class for handling all db interactions */
export class PuzzleHandlerDB {
    // Upon creating the class, the boot method connects to the db.


    puzzleDeconstruct(puzzle) {
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
        const res = await dbPuzzle.findOneAndUpdate({ id: puzzleData.id }, { title: puzzleData.title, story: puzzleData.story, examples: puzzleData.examples, template: puzzleData.template, answer: puzzleData.answer });
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
