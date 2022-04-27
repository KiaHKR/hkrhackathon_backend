import {UserPuzzle} from "../models/userPuzzle";
import {PuzzleModuleInterface} from "./puzzleModuleInterface";
import FirstTestPuzzle from "./firstTestPuzzle";
import SecondTestPuzzle from "./secondTestPuzzle";
import ThirdTestPuzzle from "./thirdTestPuzzle";

export default class PuzzleHandler{
    private static puzzleClasses: {
        [puzzleId: string]: PuzzleModuleInterface
    } = {
        "firstTestPuzzle" : new FirstTestPuzzle(),
        "secondTestPuzzle" : new SecondTestPuzzle(),
        "thirdTestPuzzle" : new ThirdTestPuzzle()
    };

    static generatePuzzle(id: string): UserPuzzle {
        if (!this.idFound(id)) throw new Error("ID does not match to any puzzle modules");
        const puzzleClass = PuzzleHandler.puzzleClasses[id];
        return puzzleClass.generatePuzzle();
    }

    static checkAnswer(id: string, correctAnswer: string, guessAnswer: string) {
        if (!this.idFound(id)) throw new Error("ID does not match to any puzzle modules");
        const puzzleClass = PuzzleHandler.puzzleClasses[id];
        return puzzleClass.checkAnswer(correctAnswer, guessAnswer);
    }

    static idFound(id: string) {
        return (id in this.puzzleClasses);
    }
}
