import { PuzzleModuleInterface } from "./puzzleModuleInterface";
import { UserPuzzle } from "../models/userPuzzle";

export default class ThirdTestPuzzle implements PuzzleModuleInterface {
    puzzleId: "thirdTestPuzzle";
    private maze_template = [
        ["x", 111, "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
        ["x", 111, 111, 111, 111, 111, 111, 111, 222, 222, "x", 222, "x", 222, 222, 222, 222, 222, "x", 222, "x"],
        ["x", 222, "x", 222, "x", "x", "x", 111, "x", "x", "x", 222, "x", "x", "x", 222, "x", 222, "x", 222, "x"],
        ["x", 222, "x", 222, "x", 222, 222, 111, "x", 222, 222, 222, 222, 222, "x", 222, "x", 222, 222, 222, "x"],
        ["x", "x", "x", "x", "x", "x", "x", 111, "x", 222, "x", "x", "x", "x", "x", 222, "x", 222, "x", "x", "x"],
        ["x", 222, 222, 222, 222, 222, "x", 111, 111, 111, 222, 222, "x", 222, 222, 222, "x", 222, 222, 222, "x"],
        ["x", "x", "x", 222, "x", "x", "x", "x", "x", 111, "x", "x", "x", "x", "x", "x", "x", 222, "x", "x", "x"],
        ["x", 222, 222, 222, 222, 222, 222, 222, "x", 111, 111, 111, 222, 222, "x", 222, 222, 222, 222, 222, "x"],
        ["x", "x", "x", "x", "x", "x", "x", 222, "x", "x", "x", 111, "x", 222, "x", 222, "x", "x", "x", "x", "x"],
        ["x", 222, 222, 222, 222, 222, "x", 222, "x", 111, 111, 111, "x", 222, 222, 222, 222, 222, 222, 222, "x"],
        ["x", 222, "x", "x", "x", 222, "x", 222, "x", 111, "x", "x", "x", "x", "x", 222, "x", "x", "x", "x", "x"],
        ["x", 222, 222, 222, "x", 222, 222, 222, "x", 111, 111, 111, "x", 222, "x", 222, "x", 222, "x", 222, "x"],
        ["x", "x", "x", 222, "x", 222, "x", "x", "x", 222, "x", 111, "x", 222, "x", 222, "x", 222, "x", 222, "x"],
        ["x", 222, 222, 222, "x", 222, 222, 222, 222, 222, "x", 111, 111, 111, "x", 222, "x", 222, 222, 222, "x"],
        ["x", 222, "x", "x", "x", "x", "x", 222, "x", "x", "x", "x", "x", 111, "x", "x", "x", 222, "x", "x", "x"],
        ["x", 222, 222, 222, "x", 222, 222, 222, "x", 222, "x", 222, 222, 111, 111, 111, 111, 111, 222, 222, "x"],
        ["x", "x", "x", "x", "x", 222, "x", "x", "x", 222, "x", "x", "x", "x", "x", "x", "x", 111, "x", "x", "x"],
        ["x", 222, 222, 222, "x", 222, 222, 222, 222, 222, 222, 222, "x", 222, 222, 222, "x", 111, 222, 222, "x"],
        ["x", 222, "x", 222, "x", "x", "x", 222, "x", 222, "x", "x", "x", 222, "x", "x", "x", 111, "x", "x", "x"],
        ["x", 222, "x", 222, 222, 222, 222, 222, "x", 222, 222, 222, 222, 222, 222, 222, "x", 111, 111, 111, "x"],
        ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", 111, "x"],
    ]

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer; information } {
        return (correctAnswer === guessAnswer) ? { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" }
    }

    generatePuzzle(): UserPuzzle {
        let sum = 0;
        const user_maze = [...this.maze_template];

        for (const [y, row] of user_maze.entries()) {
            for (const [x, value] of row.entries()) {
                if (value === "x") continue;

                const randNum = getRandomInt(100, 999);

                if (value === 111) sum += randNum;

                user_maze[y][x] = randNum;
            }
        }

        const answer = sum.toString();
        let userInput = '';
        user_maze.forEach(ele => {
            ele.forEach(e => {
                if (e === "x") userInput += '"x" '
                else userInput += `${e} `
            });
            userInput += `\n`
        });

        return new UserPuzzle(
            this.puzzleId,
            userInput,
            answer);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
