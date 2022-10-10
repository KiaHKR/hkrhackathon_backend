import {PuzzleModuleInterface} from "../../puzzleModuleInterface";
import {UserPuzzle} from "../../../models/userPuzzle";

export default class OutroPuzzle implements PuzzleModuleInterface {
    puzzleId = "outro";
    answer = ""

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean; information: string } {
        return { answer: false, information: "Incorrect" };
    }


    generatePuzzle(): UserPuzzle {
        return new UserPuzzle(this.puzzleId, this.answer, this.answer);
    }

}
