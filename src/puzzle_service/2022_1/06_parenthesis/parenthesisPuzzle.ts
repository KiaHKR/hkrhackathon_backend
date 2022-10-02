import Randoms from "../utilities/randoms";
import { PuzzleModuleInterface } from "../../puzzleModuleInterface";
import { UserPuzzle } from "../../../models/userPuzzle";
import OutputFormatter, { Split } from "../utilities/output_formatter";

export default class ParenthesisPuzzle implements PuzzleModuleInterface {
    private openParenthesis = ['s', 'k', 'f', 'h'];
    private closingParenthesis = ['p', 'r', 'm', 'c'];
    private stringLength = 30;
    private numberOfEntries = 2000;

    puzzleId = "06_parenthesis";

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean; information: string } {
        return (correctAnswer === guessAnswer) ?
            { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" };
    }

    generatePuzzle(): UserPuzzle {
        const entryLength: number = this.stringLengthCheck(this.stringLength);
        const random = new Randoms();

        let numberOfValidEntries = 0;
        const output = [];

        for (let i = 0; i < this.numberOfEntries; i++) {
            if (random.coinFlip()) {
                output.push(this.getValidEntry(entryLength));
                numberOfValidEntries++;
            }
            else
                output.push(this.getInvalidEntry(entryLength))
        }

        const formatter = new OutputFormatter()
        const formattedOutput: string = formatter.entriesSplitByCharacter(output, Split.NEWLINE);

        return new UserPuzzle(this.puzzleId, formattedOutput, numberOfValidEntries.toString())
    }

    private stringLengthCheck(stringLength: number): number {
        if (stringLength < 6)
            return 6;

        if (stringLength % 2 != 0)
            return Math.floor(stringLength) + 1;

        return stringLength;
    }

    private getValidEntry(entryLength: number) {
        const stack: string[] = [];
        const entry: string[] = [];

        while (!this.reachedMaxLength(stack, entry, entryLength)) {

            do {
                const openParenthesis = this.getRandomOpenParenthesis();
                stack.push(openParenthesis);
                entry.push(openParenthesis)
            }
            while (!this.reachedMaxLength(stack, entry, entryLength) && this.anotherCharacter());

            while (stack.length != 0) {
                const parenthesis: string = stack.pop();
                entry.push(this.getOppositeClosingParenthesis(parenthesis));
            }
        }

        return entry;
    }

    private reachedMaxLength(stack: string[], entry: string[], wantedLength: number) {
        return stack.length + entry.length == wantedLength;
    }

    private getRandomOpenParenthesis() {
        const random = new Randoms()
        const index = random.randomInt(0, this.openParenthesis.length)

        return this.openParenthesis[index];
    }

    private getRandomClosingParenthesis() {
        const random = new Randoms()
        const index = random.randomInt(0, this.openParenthesis.length)

        return this.closingParenthesis[index];
    }

    private anotherCharacter() {
        return new Randoms().coinFlip();
    }

    private getOppositeClosingParenthesis(parenthesis: string) {
        const index = this.openParenthesis.indexOf(parenthesis);

        return this.closingParenthesis[index];
    }

    private getInvalidEntry(entryLength: number) {
        const methods: any[] = [
            this.extraClosing(entryLength),
            this.extraOpening(entryLength),
            this.wrongClosure(entryLength)]

        return methods[Math.floor(Math.random() * methods.length)];
    }

    private extraClosing(entryLength: number) {
        const entry = this.getValidEntry(entryLength - 2);
        entry.push(this.getRandomClosingParenthesis());
        entry.push(this.getRandomClosingParenthesis());

        return entry;
    }

    private extraOpening(entryLength: number) {
        const entry = this.getValidEntry(entryLength - 2);
        entry.unshift(this.getRandomOpenParenthesis());
        entry.unshift(this.getRandomOpenParenthesis());

        return entry;
    }

    private wrongClosure(entryLength: number) {
        const random = new Randoms();

        const first = random.randomInt(0, this.openParenthesis.length);
        let second: number;

        do {
            second = random.randomInt(0, this.openParenthesis.length);
        }
        while (first == second)

        const entry = this.getValidEntry(entryLength);
        const index = Math.floor(entryLength / 2);

        entry[index] = this.openParenthesis[first];
        entry[index + 1] = this.closingParenthesis[second];

        return entry
    }
}
