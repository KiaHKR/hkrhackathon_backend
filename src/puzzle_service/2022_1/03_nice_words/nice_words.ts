import { PuzzleModuleInterface } from "../../puzzleModuleInterface";
import { UserPuzzle } from "../../../models/userPuzzle";
import Constants from './constants';
import * as generators from './string_generators';

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
                generators.generateNiceString();
                nice_strings++;
            } else {
                generators.generateNiceString();
            }
        }

        return new UserPuzzle(this.puzzleId, strings.join('\n'), nice_strings.toString());
    }
}
