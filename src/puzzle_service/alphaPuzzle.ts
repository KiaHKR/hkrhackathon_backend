import { PuzzleModuleInterface } from "./puzzleModuleInterface";
import { UserPuzzle } from "../models/userPuzzle";

export default class AlphaPuzzle implements PuzzleModuleInterface {
    puzzleId: "alphaPuzzle";

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer; information } {
        return (correctAnswer === guessAnswer) ? { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" }
    }

    generatePuzzle(): UserPuzzle {
        const userInput = "1 2 3";
        const answer = "2";

        return new UserPuzzle(
            this.puzzleId,
            userInput,
            answer);
    }


}
