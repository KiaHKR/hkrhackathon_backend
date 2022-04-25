import { PuzzleModuleInterface } from "./puzzleModuleInterface";
import { UserPuzzle } from "../models/userPuzzle";

export default class AlphaPuzzle implements PuzzleModuleInterface {
    checkAnswer(): { answer; information } {
        return {answer: undefined, information: undefined};
    }

    generatePuzzle(): UserPuzzle {
        return undefined;
    }

}
