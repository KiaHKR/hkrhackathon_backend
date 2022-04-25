import {UserPuzzle} from "../models/userPuzzle";

export interface PuzzleModuleInterface {
    checkAnswer(correctAnswer: string, guessAnswer: string): { answer, information };
    generatePuzzle(): UserPuzzle;
}
