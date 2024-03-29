import { UserPuzzle } from "../../../models/userPuzzle";
import { PuzzleModuleInterface } from "../../puzzleModuleInterface";
import Constants from './constants';
import { Command, getRandomCommand } from "./command_manager";
import operations from './operations';
import OutputFormatter, { Split } from "../utilities/output_formatter";

export default class StringManipulationPuzzle implements PuzzleModuleInterface {
    puzzleId = "seating_arrangements";

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean; information: string; } {
        return (correctAnswer === guessAnswer) ? { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" };
    }

    generatePuzzle(): UserPuzzle {
        let command_list = [];
        let s = Constants.START_STRING;
        for (let i = 0; i < Constants.JUMBLES; i++) {
            const command = getRandomCommand();
            const result: { s: string, op_string: string } = this.performCommandAndGetResult(s, command);
            s = result.s;
            command_list.push(result.op_string);
        }

        const formatter: OutputFormatter = new OutputFormatter();
        const output: string = formatter.entriesSplitByCharacter(command_list, Split.COMMA);

        return new UserPuzzle(this.puzzleId, output, s);
    }

    private performCommandAndGetResult(s: string, command_type: Command): { s: string, op_string: string } {
        switch (command_type) {
            case Command.ROTATE:
                const rotate_count = Math.floor(Math.random() * 9);
                return operations.perform_rotate(s, rotate_count);
            case Command.SWAP:
                const index_a = Math.floor(Math.random() * s.length);
                const index_b = Math.floor(Math.random() * s.length);
                return operations.perform_swap(s, index_a, index_b);
            case Command.EXCHANGE:
                const exchange_item_a = s[Math.floor(Math.random() * s.length)];
                const exchange_item_b = s[Math.floor(Math.random() * s.length)];
                return operations.perform_exchange(s, exchange_item_a, exchange_item_b);
            case Command.SHIFT:
                const shift_item_a = s[Math.floor(Math.random() * s.length)];
                return operations.perform_shift(s, shift_item_a);
            case Command.MIRROR:
                return operations.perform_mirror(s);
        }
    }
}
