import { PuzzleModuleInterface } from "./puzzleModuleInterface";
import { UserPuzzle } from "../models/userPuzzle";

export default class ThirdTestPuzzle implements PuzzleModuleInterface {
    puzzleId: "thirdTestPuzzle";

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer; information } {
        return (correctAnswer === guessAnswer) ? { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" }
    }

    generatePuzzle(): UserPuzzle {
        const userInput = "-";
        const answer = "-";

        return new UserPuzzle(
            this.puzzleId,
            userInput,
            answer);
    }
}
