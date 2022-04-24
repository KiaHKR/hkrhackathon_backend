import { UserPuzzle } from "../models/userPuzzle";

export default class PuzzleHandler{

    checkAnswer(id:string, correctAnswer: string, guessAnswer: string) {
        if (guessAnswer == correctAnswer) return { answer: true, information: "Correct" };
        return { answer: false, information: "Incorrect" };
    }

    generatePuzzle(newCurrentPuzzleId: any): UserPuzzle {
        return undefined
    }
}
