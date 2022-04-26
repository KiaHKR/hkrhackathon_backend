import { PuzzleModuleInterface } from "./puzzleModuleInterface";
import { UserPuzzle } from "../models/userPuzzle";

export default class BravoPuzzle implements PuzzleModuleInterface {
    puzzleId: "bravoPuzzle";

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer; information } {
        return {answer: undefined, information: undefined};
    }

    generatePuzzle(): UserPuzzle {
        return undefined;
    }

}
