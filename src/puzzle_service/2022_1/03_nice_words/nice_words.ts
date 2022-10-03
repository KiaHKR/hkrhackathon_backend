import { PuzzleModuleInterface } from "../../puzzleModuleInterface";
import { UserPuzzle } from "../../../models/userPuzzle";
import Constants from './constants';
import * as generators from './string_generators';
import OutputFormatter, { Split } from "../utilities/output_formatter";

export default class NiceWordsPuzzle implements PuzzleModuleInterface {

    puzzleId = "03_nice_words";

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean; information: string; } {
        return (correctAnswer === guessAnswer) ? { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" };
    }

    generatePuzzle(): UserPuzzle {
        let strings = [];
        let nice_strings = 0;
        for (let count = 0; count < Constants.NUMBER_OF_STRINGS; count++) {
            if (Math.random() > 0.5) {
                strings.push(generators.generateNiceString());
                nice_strings++;
            } else {
                strings.push(generators.generateNiceString());
            }
        }

        const formatter: OutputFormatter = new OutputFormatter();
        const output: string = formatter.entriesSplitByCharacter(strings, Split.NEWLINE);

        return new UserPuzzle(this.puzzleId, output, nice_strings.toString());
    }
}
