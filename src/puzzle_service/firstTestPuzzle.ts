import { PuzzleModuleInterface } from "./puzzleModuleInterface";
import { UserPuzzle } from "../models/userPuzzle";

export default class FirstTestPuzzle implements PuzzleModuleInterface {

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean, information: string } {
        return (correctAnswer === guessAnswer) ? { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" }
    }

    generatePuzzle(): UserPuzzle {
        const userInput = "1 2 3";
        const answer = "2";
        const puzzleID = "firstTestPuzzle"

        return new UserPuzzle(
            puzzleID,
            userInput,
            answer);
    }
}
