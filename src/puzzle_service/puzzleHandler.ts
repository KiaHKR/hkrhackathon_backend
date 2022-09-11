import { UserPuzzle } from "../models/userPuzzle";
import { PuzzleModuleInterface } from "./puzzleModuleInterface";
import MinMaxMedian from "./2022_1/01_min_max_median/min_max_median";

export default class PuzzleHandler {
    private static puzzleClasses: {
        [puzzleId: string]: PuzzleModuleInterface
    } = {
        "01_min_max_median" : new MinMaxMedian()
    };

    static generatePuzzle(id: string): UserPuzzle {
        if (!this.idFound(id)) throw new Error("ID does not match to any puzzle modules");
        const puzzleClass = PuzzleHandler.puzzleClasses[id];
        return puzzleClass.generatePuzzle();
    }

    static checkAnswer(id: string, correctAnswer: string, guessAnswer: string): { answer: boolean, information: string } {
        if (!this.idFound(id)) throw new Error("ID does not match to any puzzle modules");
        const puzzleClass = PuzzleHandler.puzzleClasses[id];
        return puzzleClass.checkAnswer(correctAnswer, guessAnswer);
    }

    static idFound(id: string) {
        return (id in this.puzzleClasses);
    }
}
