import {PuzzleModuleInterface} from "../../puzzleModuleInterface";
import {UserPuzzle} from "../../../models/userPuzzle";

export default class IntroPuzzle implements PuzzleModuleInterface {
    puzzleId = "intro";
    answer = "d0_u_3v3n_c0d3?"

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean; information: string } {
        return (correctAnswer === guessAnswer) ?
            { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" };
    }


    generatePuzzle(): UserPuzzle {
        return new UserPuzzle(this.puzzleId, this.answer, this.answer);
    }

}
