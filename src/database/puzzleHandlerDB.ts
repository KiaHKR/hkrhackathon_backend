import { Puzzle } from "../models/puzzle";
import { dbPuzzle } from "./models/db_puzzles";

/** Class for handling all db interactions */
export class PuzzleHandlerDB {
    // Upon creating the class, the boot method connects to the db.


    puzzleDeconstruct(puzzle) {
        return new dbPuzzle({ id: puzzle._id, title: puzzle._title, story: puzzle._story, examples: puzzle._examples })
    }

    puzzleReconstruct(dbpuzzle) {
        return new Puzzle(dbpuzzle.id, dbpuzzle.title, dbpuzzle.story, dbpuzzle.examples)
    }

    // Puzzle related calls
    async savePuzzle(puzzle) {
        // Saves a puzzle to the database.
        const newPuzzle = this.puzzleDeconstruct(puzzle)
        await newPuzzle.save();
        return this.puzzleReconstruct(newPuzzle)
    }

    async getPuzzle(puzzleId) {
        // returns a puzzle from the database.
        const puzzle = await dbPuzzle.findOne({ id: puzzleId })
        if (puzzle) {
            return this.puzzleReconstruct(puzzle)
        } else {
            return { error: 'Puzzle not found.' }
        }
    }


    async getAllPuzzles() {
        // returns an array of all users from the database.
        const puzzles = await dbPuzzle.find();
        let puzzleList = [];
        for (let i of puzzles) {
            puzzleList.push(this.puzzleReconstruct(i))
        }
        return puzzleList
    }


    async getNextPuzzleId(id?: string) { // if you get an argument, return right puzzle. Else, first puzzle.
        const puzzles = await dbPuzzle.find();
        if (id == undefined) {
            return puzzles[0].id
        } else {
            let next = false;
            for (let i of puzzles) {
                if (next) {
                    return i.id
                }
                if (i.id == id) {
                    next = true;
                }
            }
            return undefined;
        }

    }
}
