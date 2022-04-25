import {UserPuzzle} from "../models/userPuzzle";
import {PuzzleModuleInterface} from "./puzzleModuleInterface";
import AlphaPuzzle from "./alphaPuzzle";

export default class PuzzleHandler{
    private static puzzleClasses: {
        [puzzleId: string]: PuzzleModuleInterface
    } = {
        "alphaPuzzle" : new AlphaPuzzle()
    };

    static generatePuzzle(id: string): UserPuzzle {
        const puzzleClass = PuzzleHandler.puzzleClasses[id];
        return puzzleClass.generatePuzzle();
    }

    static checkAnswer(id: string, correctAnswer: string, guessAnswer: string) {
        const puzzleClass = PuzzleHandler.puzzleClasses[id];
        return puzzleClass.checkAnswer(correctAnswer, guessAnswer);
    }
}
