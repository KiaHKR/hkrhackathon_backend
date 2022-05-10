import { Puzzle } from "../models/puzzle";
import db from "../startup/db";
import { dbPuzzle } from "./models/db_puzzles";
import { dbpuzzleStorage } from "./models/db_puzzleStorage"
import { dbUser } from "./models/db_users";

/** Class for handling all db interactions */
export class PuzzleHandlerDB {

    puzzleDeconstruct(puzzle) {
        return new dbPuzzle({ id: puzzle.id, title: puzzle.title, story: puzzle.story, examples: puzzle.examples, timesCompleted: puzzle.timesCompleted, wrongSubmissions: puzzle.wrongSubmissions, firstSolved: { name: puzzle.nameFirstSolved, timeStamp: puzzle.timeFirstSolved } })
    }

    puzzleReconstruct(dbpuzzle) {
        const puzz = new Puzzle(dbpuzzle.id, dbpuzzle.title, dbpuzzle.story, dbpuzzle.examples)
        puzz.timeFirstSolved = dbpuzzle.timesCompleted
        puzz.wrongSubmissions = dbpuzzle.wrongSubmissions
        if (dbpuzzle.firstSolved) {
            puzz.nameFirstSolved = dbpuzzle.firstSolved.name
            puzz.timeFirstSolved = dbpuzzle.firstSolved.timeStamp
        }
        return puzz
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

    async getAllVisiblePuzzles(): Promise<Puzzle[] | { error: string }> {
        const puzzles = await this.getVisibleOrderArray()
        const returnList = []
        const puzzleDbList = await dbPuzzle.find()
        if (!Array.isArray(puzzles)) return { error: "Error when getting visible puzzles." }
        for (const oAPuzzle of puzzles) {
            for (const dbpuzzle of puzzleDbList) {
                if (oAPuzzle == dbpuzzle.id) {
                    returnList.push(this.puzzleReconstruct(dbpuzzle))
                }
            }
        }
        return returnList
    }

    async getNextPuzzleId(id?: string): Promise<string | { error: string; }> {
        // if you get an argument, return right puzzle. Else, first puzzle.
        const orderArray = await dbpuzzleStorage.find();
        const returnPuzzle = []
        if (orderArray.length == 0) return { error: "orderArray missing." }
        for (const puzzle of orderArray[0].storage) {
            if (puzzle.visibility) {
                returnPuzzle.push(puzzle.puzzleid)
            }
        }
        if (returnPuzzle.length == 0) { return { error: "Error while browsing Puzzles." } }
        if (id == undefined) { return returnPuzzle[0] }
        let next = false;
        for (let i of returnPuzzle) {
            if (next) { return i }
            if (i == id) {
                next = true;
            }
        }
    }

    async getOrderArray(): Promise<any[] | { error: string; }> {
        // gets puzzle storage array
        const returnArray = []
        const orderArray = await dbpuzzleStorage.find();
        if (orderArray.length == 0) { return { error: "OrderArray not found" } }
        for (let i of orderArray[0].storage) {
            returnArray.push({ puzzleid: i.puzzleid, visibility: i.visibility })
        } return returnArray
    }

    async getVisibleOrderArray(): Promise<any[] | { error: string; }> {
        // gets visible puzzle storage array
        const returnArray = []
        const orderArray = await dbpuzzleStorage.find();
        if (orderArray.length == 0) { return { error: "OrderArray not found" } }
        for (let i of orderArray[0].storage) {
            if (i.visibility == true) returnArray.push(i.puzzleid)
        } return returnArray
    }

    //: { storage: [{ puzzleid: string, visibility: boolean }] }
    async saveOrderArray(orderArray): Promise<any[]> {
        // updates puzzle storage array
        const puzzleList = []
        const res = await dbpuzzleStorage.deleteMany()
        const storedPuzzle = await new dbpuzzleStorage({ storage: orderArray }).save()
        for (let i of storedPuzzle.storage) {
            puzzleList.push({ puzzleid: i.puzzleid, visibility: i.visibility })
        } return puzzleList
    }


    async checkUsersOnPuzzle(puzzleid): Promise<boolean> {
        const users = await dbUser.find({ currentPuzzleId: puzzleid })
        if (users.length == 0) { return true }
        return false
    }

    async submissionFail(puzzleid): Promise<Puzzle | { error: string }> {
        const puzzle = await dbPuzzle.findOne({ id: puzzleid })
        if (!puzzle) return { error: "Puzzle not found" }
        const updateReturn = await dbPuzzle.updateOne({ id: puzzleid }, { wrongSubmissions: puzzle.wrongSubmissions + 1 })
        return this.puzzleReconstruct(updateReturn)
    }

    async submissionSuccess(puzzleid, userName): Promise<Puzzle | { error: string }> {
        const puzzle = await dbPuzzle.findOne({ id: puzzleid })
        if (!puzzle) return { error: "Puzzle not found" }
        if (puzzle.timesCompleted == 0) {
            const updateReturn = await dbPuzzle.updateOne({ id: puzzleid }, { timesCompleted: puzzle.timesCompleted + 1, firstSolved: { name: userName, timeStamp: Date.now() } })
            return this.puzzleReconstruct(updateReturn)
        }
        const updateReturn = await dbPuzzle.updateOne({ id: puzzleid }, { timesCompleted: puzzle.timesCompleted + 1 })
        return this.puzzleReconstruct(updateReturn)
    }

    async firstFinished(puzzleid): Promise<{ name: string, timeStamp: Date } | { error: string }> {
        const puzzle = await dbPuzzle.findOne({ id: puzzleid })
        if (!puzzle) return { error: "Puzzle not found" }
        return puzzle.firstSolved
    }

    async getLeaderboard(): Promise<any[] | { error: string }> {
        const leaderBoard = []
        const puzzle = await this.getAllVisiblePuzzles()

        if (!Array.isArray(puzzle)) return { error: "No puzzles found" }
        for (const p of puzzle) {
            let puzzR = await this.puzzleDeconstruct(p)
            leaderBoard.push({ puzzleId: puzzR.id, wrongSubmissions: puzzR.wrongSubmissions, timesCompleted: puzzR.timesCompleted, firstToFinish: puzzR.firstSolved.name, timeFinished: puzzR.firstSolved.timeStamp })
        }
        return leaderBoard
    }

}

/* async changePuzzleVisibility(id: string, visiblity: boolean): Promise<string | { error: string; }> {
     const puzzle = await dbpuzzleStorage.findOne({ puzzleid: id });
     if (puzzle) {
         puzzle.public = visiblity;
         return puzzle.puzzleid
     } else { return { error: "No such puzzle found." } }
    }
*/



/*async delPuzzleFromStorage(id: string): Promise<string | { error: string; }> {
    const puzzle = await dbpuzzleStorage.findOne({ id: id });
    if (puzzle) {
        const puzzleRet = await puzzle.deleteOne({ id: id })
        if (puzzleRet === 1) {
            return puzzle.id
        } else { return { error: "Error while deleting." } }
    } else {
        return { error: "Puzzle not found." }

    }
<<<<<<< HEAD
    */

