import { Puzzle } from "../models/puzzle";
import { dbPuzzle } from "./models/db_puzzles";

/** Class for handling all db interactions */
export class PuzzleHandlerDB {

    puzzleDeconstruct(puzzle) {
        return new dbPuzzle({ id: puzzle.id, title: puzzle.title, story: puzzle.story, examples: puzzle.examples })
    }

    puzzleReconstruct(dbpuzzle) {
<<<<<<< HEAD
        return new Puzzle(dbpuzzle.id, dbpuzzle.title, dbpuzzle.story, dbpuzzle.examples)
=======
        return new Puzzle(dbpuzzle.id, dbpuzzle.title, dbpuzzle.story, dbpuzzle.description)
>>>>>>> main
    }

    async savePuzzle(puzzle: Puzzle): Promise<Puzzle | { error: string; }> {
        // saves a puzzle to the database.
        const newPuzzle = this.puzzleDeconstruct(puzzle)
        await newPuzzle.save();
        return this.puzzleReconstruct(newPuzzle)
    }

    async getPuzzle(puzzleId: string): Promise<Puzzle | { error: string; }> {
        // returns a puzzle from the database.
        const puzzle = await dbPuzzle.findOne({ id: puzzleId })
        if (puzzle) {
            return this.puzzleReconstruct(puzzle)
        } else {
            return { error: 'Puzzle not found.' }
        }
    }

    async getAllPuzzles(): Promise<Puzzle[] | { error: string }> {
        // returns an array of all users from the database.
        const puzzles = await dbPuzzle.find();
        let puzzleList = [];
        if (puzzleList.length == 0) {
            
                return { error: "No puzzles in database." }
        } else{
        for (let i of puzzles) {
            puzzleList.push(this.puzzleReconstruct(i))
        return puzzleList
        
    }}}

    async getNextPuzzleId(id?: string): Promise<string | { error: string; }> {
        // if you get an argument, return right puzzle. Else, first puzzle.
        const puzzles = await dbPuzzle.find().sort({ "_id": 1 });
        if (puzzles.length!==0){
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
          
        }}else{  return { error: "Error while browsing Puzzles." }}

    }
}
