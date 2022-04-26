import { PuzzleModuleInterface } from "./puzzleModuleInterface";
import { UserPuzzle } from "../models/userPuzzle";

export default class CharliePuzzle implements PuzzleModuleInterface {
    puzzleId: "charliePuzzle";

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer; information } {
        return {answer: undefined, information: undefined};
    }

    generatePuzzle(): UserPuzzle {
        return undefined;
    }

}
