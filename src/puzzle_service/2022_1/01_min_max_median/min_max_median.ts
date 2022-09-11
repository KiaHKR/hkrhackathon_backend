import Randoms from "../utilities/randoms";
import { PuzzleModuleInterface } from "../../puzzleModuleInterface";
import { UserPuzzle } from "../../../models/userPuzzle";
import OutputFormatter from "../utilities/output_formatter";

export default class MinMaxMedianPuzzle implements PuzzleModuleInterface{

    puzzleId = "01_min_max_median"
    private numberOfEntries = 2000;
    private lowerLimitForNumber = 100;
    private upperLimitForNumbers = 100000;


    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean; information: string } {
        return (correctAnswer === guessAnswer) ?
            { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" };

    }

    generatePuzzle(): UserPuzzle {
        const random = new Randoms();

        const output: number[] = [];
        for (let i = 0; i < this.numberOfEntries; i++) {
            output.push(random.randomInt(this.lowerLimitForNumber, this.upperLimitForNumbers));
        }

        const answer = this.getAnswer(output);

        const formatter = new OutputFormatter();
        const formattedOutput: string = formatter.entriesInRows(output);

        return new UserPuzzle(this.puzzleId, formattedOutput, answer.toString());
    }

    private getAnswer(output: number[]) {
        const sorted = [...output].sort();

        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        const median = this.getMedian(sorted);

        return Math.floor((min * max) / median);
    }

    private getMedian(sorted: number[]) {
        const middle = Math.floor(sorted.length / 2);

        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }

        return sorted[middle];
    }
}
