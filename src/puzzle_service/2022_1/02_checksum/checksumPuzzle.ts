import Randoms from "../utilities/randoms";
import { PuzzleModuleInterface } from "../../puzzleModuleInterface";
import { UserPuzzle } from "../../../models/userPuzzle";
import OutputFormatter from "../utilities/output_formatter";

export default class ChecksumPuzzle implements PuzzleModuleInterface{
    puzzleId = "02_checksum";
    private numberOfEntries = 2000;

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean; information: string } {
        return (correctAnswer === guessAnswer) ?
            { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" };
    }

    generatePuzzle(): UserPuzzle {
        let totalChecksum = 0;
        const output: number[] = [];

        for (let i = 0; i < this.numberOfEntries; i++) {
            const number = this.getRandomNumberWithTwoToSevenDigits();
            const remainder: number = number % number.toString().length;

            const firstDigit: number = this.getFirstDigit(number);
            const lastDigit: number = this.getLastDigit(number);

            output.push(number);
            totalChecksum += this.calculateRowChecksum(firstDigit, lastDigit, remainder);
        }

        const formatter = new OutputFormatter();
        const formattedOutput: string = formatter.entriesInRows(output);

        return new UserPuzzle(this.puzzleId, formattedOutput, totalChecksum.toString());
    }

    private calculateRowChecksum(firstDigit: number, lastDigit: number, remainder: number) {
        return (firstDigit + lastDigit) + remainder;
    }

    private getRandomNumberWithTwoToSevenDigits() {
        const randoms = new Randoms();

        return randoms.randomInt(10, 10000000);
    }

    private getFirstDigit(number: number) {
        return +number.toString()[0];
    }

    private getLastDigit(number: number) {
        return +number.toString()[number.toString().length - 1];
    }
}
