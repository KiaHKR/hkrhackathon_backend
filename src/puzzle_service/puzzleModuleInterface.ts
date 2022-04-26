import {UserPuzzle} from "../models/userPuzzle";

export interface PuzzleModuleInterface {
    puzzleId: string;
    checkAnswer(correctAnswer: string, guessAnswer: string): { answer, information };
    generatePuzzle(): UserPuzzle;
}
