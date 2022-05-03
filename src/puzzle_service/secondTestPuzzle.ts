import { PuzzleModuleInterface } from "./puzzleModuleInterface";
import { UserPuzzle } from "../models/userPuzzle";

export default class SecondTestPuzzle implements PuzzleModuleInterface {

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean, information: string } {
        return (correctAnswer === guessAnswer) ? { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" }
    }

    generatePuzzle(): UserPuzzle {
        // GET MEAN OF THE USER INPUT AS AN ANSWER.

        const numbersList = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100000));
        const sum = numbersList.reduce((a, b) => a + b, 0);
        const result = Math.floor(sum / 1000);

        const userInput = numbersList.join(`<br/>`);
        const answer = result.toString();

        return new UserPuzzle(
            "secondTestPuzzle",
            userInput,
            answer);
    }
}
