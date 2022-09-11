import { UserPuzzle } from "../../../models/userPuzzle";
import { PuzzleModuleInterface } from "../../puzzleModuleInterface";
import * as generation from './maze_generation';
import solveMaze from './maze_solver';

class MazePuzzle implements PuzzleModuleInterface {
    puzzleId: string = "08_maze";

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean; information: string; } {
        return (correctAnswer === guessAnswer) ? { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" };
    }

    generatePuzzle(): UserPuzzle {
        const mazeArr = generation.generateMaze(Constants.MAZE_OPTIONS, Constants.START, Constants.END, Constants.WALL, Constants.field);
        const mazeString = generation.arrayToString(mazeArr);

        const resultPath = solveMaze(mazeArr, Constants.START, Constants.END, Constants.WALL);
        let resultNum = 0;

        for (const coordinate of resultPath) {
            resultNum += parseInt(mazeArr[coordinate[1]][coordinate[0]]);
        }

        return new UserPuzzle(this.puzzleId, mazeString, resultNum.toString());
    }

}