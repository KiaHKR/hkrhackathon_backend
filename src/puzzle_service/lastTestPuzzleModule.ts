import { PuzzleModuleInterface } from "./puzzleModuleInterface";
import { UserPuzzle } from "../models/userPuzzle";

export default class LastTestPuzzleModule implements PuzzleModuleInterface{
    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean; information: string } {
        return {answer: false, information: "This is the last puzzle, thanks for playing! "};
    }

    generatePuzzle(): UserPuzzle {
        return new UserPuzzle(
            "lastTestPuzzle",
            "You are quite persistent little tea pot",
            "418");
    }

}
